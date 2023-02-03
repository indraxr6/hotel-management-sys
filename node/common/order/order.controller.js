const { sequelize } = require('../../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const moment = require('moment')
const { createInvoice } = require('../../middleware/createInvoice')
const { order, room_type, room, order_details } = require('../../models')
const helper = require('../../helpers')

module.exports = {
     async addTransaction(orderData, selectedRoomTypeId, selectedRoomIds, roomCount) {
          try {
               const checkIn = new Date(orderData.checkin_date)
               const checkOut = new Date(orderData.checkout_date)
               const diff = Math.abs(checkOut - checkIn)
               const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24))
               const selectedRoomType = await room_type.findByPk(selectedRoomTypeId)
               let price = selectedRoomType.price * selectedRoomIds.length
               const totalPrice = price * diffDay

               // create order
               const orderNumber = helper.generateOrderNumber()
               while (await helper.checkExistedOrder(orderNumber)) {
                    orderNumber = helper.generateOrderNumber()
               }
               const newOrder = await order.create({
                    ...orderData,
                    id: v4(),
                    room_count: roomCount,
                    order_number: orderNumber,
                    order_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    order_status: "NEW",
                    id_room_type: selectedRoomTypeId,
               })

               // loop from check-in date to check-out date
               let orderDetailsArray = []
               for (let date = checkIn; date < checkOut; date.setDate(date.getDate() + 1)) {
                    for (const roomId of selectedRoomIds) {
                         orderDetailsArray.push({
                              id_order: newOrder.id,
                              id_room: roomId,
                              access_date: moment(date).format('YYYY-MM-DD'),
                              price: totalPrice / selectedRoomIds.length,
                         })
                    }
               }

               const orderDetails = await order_details.bulkCreate(orderDetailsArray)

               const invoice = newOrder
               const invoiceDetail = orderDetailsArray
               const typeName = selectedRoomType.room_type_name
               createInvoice(invoice, invoiceDetail, typeName, diffDay)

               return {
                    order: newOrder,
                    order_details: orderDetails,
               }
          } catch (error) {
               return error
          }
     },
     ///////////////////////////

     async getAll(req, res) {
          const page = req.query.page || 1
          const sort = req.query.sort
          const orderBy = req.query.orderBy
          const start_date = req.query.start_date || moment().format('YYYY-MM-DD HH:mm:ss')
          const end_date = req.query.end_date
          const limit = 10
          const offset = (page - 1) * limit

          try {
               let transactionData = await order.findAll({
                    include: [{
                         model: order_details,
                         as: 'order_details',
                         required: true,
                         on: {
                              id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
                         }
                    }],
                    limit,
                    offset,
               });

               if (sort) {
                    transactionData = transactionData.sort((a, b) => a[sort] > b[sort]);
               }
               if (start_date && end_date) {
                    transactionData = transactionData.filter(data => {
                         return data.order_date >= start_date && data.order_date <= end_date
                    });
               }
               if (!transactionData.length) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "No data found with specified filter"
                    });
               }

               res.status(200).json({
                    status_code: 200,
                    message: `Fetched transaction data with ${page} page limit.`,
                    transactionData: transactionData
               });
          } catch (error) {
               console.log(error);
               res.status(500).json({
                    message: "Error fetching transactions",
                    error
               });
          }
     },

     ////////////////////////////////////////////////////////////////////////

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

     ////////////////////////////

     async deleteOrder(req, res) {
          const id = req.params.id;
          try {
               const orderData = await order.findOne({
                    where: { id }
               });
               if (!orderData) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order data not found"
                    });
               }

               const deletedOrderDetails = await order_details.destroy({
                    where: { id_order: id }
               });

               if (deletedOrderDetails === 0) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order details data not found"
                    });
               }

               const deletedOrder = await order.destroy({
                    where: { id }
               });

               if (deletedOrder === 0) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order data not found"
                    });
               }

               res.status(200).json({
                    status_code: 200,
                    message: `Order data with id ${id} and its details have been deleted.`
               });
          } catch (error) {
               console.log(error);
               res.status(500).json({
                    message: "Error deleting order data",
                    error
               });
          }
     }
}


