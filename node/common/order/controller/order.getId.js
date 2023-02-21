const { sequelize } = require('../../../models')
const { order, order_details, room_type } = require('../../../models')

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
                                   id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
                              }
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
               const id_rooms = orderDetailsData.map(orderDetail => orderDetail.id_room);
               const price = orderDetailsData.reduce((totalPrice, orderDetail) => totalPrice + orderDetail.price, 0);

               res.status(200).json({
                    status_code: 200,
                    message: `Fetched order data with id ${id}.`,
                    orderData,
                    order_summary: {
                         id,
                         id_rooms,
                         price
                    }
               });
          } catch (error) {
               console.log(error);
               res.status(500).json({
                    message: "Error fetching order data",
                    error
               });
          }
     },
     
     async getByOrderNumber(req, res) {
          const id = req.params.id;
          if (!id) {
               return res.status(404).json({
                    message : "Order Number Cannot be Empty."
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

            if (orderData.order_status == 'CANCEL') {
               return res.status(404).json({
                    message: "This transaction is canceled."
               })
            }
        
            const orderDetailsData = orderData.order_details;
            const id_rooms = orderDetailsData.map(orderDetail => orderDetail.id_room);
            const price = orderDetailsData.reduce((totalPrice, orderDetail) => totalPrice + orderDetail.price, 0);
        
            res.status(200).json({
              status_code: 200,
              message: `Fetched order data with order number ${id}.`,
              orderData,
              order_summary: {
                id: orderData.id,
                id_rooms,
                price
              }
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Error fetching order data",
              error
            });
          }
        }
        
      
}