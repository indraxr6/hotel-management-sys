const { sequelize } = require('../../../models')
const { order, order_details, room_type, room } = require('../../../models')

module.exports = {
     async getById(req, res) {
          const id = req.params.id;
          try {
               const orderData = await order.findOne({
                    where: { id },
                    include: [
                         {
                              model: order_details,
                              as: 'order_details',
                              required: true,
                              on: {
                                   id: sequelize.where(
                                        sequelize.col('order.id'),
                                        '=',
                                        sequelize.col('order_details.id_order')
                                   )
                              },
                              include: {
                                   model: room,
                                   as: 'rooms',
                                   required: true
                              },
                         }
                    ]
               });

               if (!orderData) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order data not found"
                    });
               }

               const orderDetailsData = orderData.order_details;
               const orderSummary = {
                    id: orderData.id,
                    price: orderDetailsData.reduce((totalPrice, orderDetail) => totalPrice + orderDetail.price, 0),
                    room_numbers: [...new Set(orderDetailsData.map(orderDetail => orderDetail.rooms.room_number))]
               };


               res.status(200).json({
                    status_code: 200,
                    message: `Fetched order data with order number ${id}.`,
                    orderData,
                    order_summary: orderSummary
               });
          } catch (error) {
               console.log(error);
               res.status(404).json({
                    status_code: 404,
                    message: "Error fetching order data",
                    error
               });
          }
     },

     async getByOrderNumber(req, res) {
          const id = req.params.id;
          if (!id) {
               return res.status(404).json({
                    message: "Order Number Cannot be Empty."
               })
          }

          try {
               const orderData = await order.findOne({
                    where: { order_number: id },
                    include: [
                         {
                              model: order_details,
                              as: 'order_details',
                              required: true,
                              on: {
                                   id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
                              }
                         },

                    ]
               });

               if (!orderData) {
                    return res.status(404).json({
                         message: "Order data not found.",
                         status_code: 404,
                    });
               }

               const orderDetailsData = await order_details.findAll({
                    where: { id_order: orderData.id },
                    include: {
                         model: room,
                         as: 'rooms',
                         required: true
                    }
               });

               if (orderData.order_status == 'CANCEL') {
                    return res.status(404).json({
                         message: "This transaction is canceled."
                    })
               }

               const orderSummary = {
                    id_order: orderData.id,
                    order_number: orderData.order_number,
                    price: orderDetailsData.reduce((totalPrice, orderDetail) => totalPrice + orderDetail.price, 0),
                    room_numbers: [...new Set(orderDetailsData.map(orderDetail => orderDetail.rooms.room_number))]
               };


               res.status(200).json({
                    status_code: 200,
                    message: `Fetched order data with order number ${id}.`,
                    orderData,
                    orderSummary
               });
          } catch (error) {
               console.log(error);
               res.status(404).json({
                    message: error.message,
                    error
               });
          }
     }


}



