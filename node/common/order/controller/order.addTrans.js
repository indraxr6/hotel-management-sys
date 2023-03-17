const { v4 } = require('uuid')
const moment = require('moment')
const { createInvoice } = require('../../../middleware/createInvoice')
const { order, room_type, order_details, sequelize } = require('../../../models')

const helper = require('../../../helpers')



module.exports = {


     async addTransaction(req, res) {
          try {
               const orderData = req.body;
               const selectedRoomTypeId = req.body.id_room_type;
               const selectedRoomIds = req.body.id_room;
               const roomCount = selectedRoomIds.length;

               const checkIn = new Date(orderData.checkin_date);
               const checkOut = new Date(orderData.checkout_date);
               const diff = Math.abs(checkOut - checkIn);
               const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
               const selectedRoomType = await room_type.findByPk(selectedRoomTypeId);
               let price = selectedRoomType.price * selectedRoomIds.length;
               const totalPrice = price * diffDay;

               // create order
               const orderNumber = helper.generateOrderNumber();
               while (await helper.checkExistedOrder(orderNumber)) {
                    orderNumber = helper.generateOrderNumber();
               }
               const newOrder = await order.create({
                    ...orderData,
                    id: v4(),
                    room_count: roomCount,
                    order_number: orderNumber,
                    order_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    order_status: "NEW",
                    id_room_type: selectedRoomTypeId,
                    room_type_name: selectedRoomTypeId.room_type_name,
               });

               // loop from check-in date to check-out date
               let orderDetailsArray = [];
               for (let date = checkIn; date < checkOut; date.setDate(date.getDate() + 1)) {
                    for (const roomId of selectedRoomIds) {
                         orderDetailsArray.push({
                              id_order: newOrder.id,
                              id_room: roomId,
                              access_date: moment(date).format("YYYY-MM-DD"),
                              price: selectedRoomType.price,
                         });
                    }
               }

               const orderDetails = await order_details.bulkCreate(orderDetailsArray);

               const invoicePrice = orderDetailsArray.reduce((total, { price }) => total + price, 0);

               const invoice = newOrder;
               const invoiceDetail = invoicePrice;
               const typeName = selectedRoomType.room_type_name;
               createInvoice(invoice, invoiceDetail, typeName, diffDay);

               if (!orderDetails.length) {
                    try {
                         const retry = await order_details.bulkCreate(orderDetailsArray);
                         console.log(retry)
                         res.status(200).json({
                              status_code: 200,
                              message: "Order details error",
                              order_data: newOrder,
                              order_details: orderDetails
                         })
                    } catch (err) {
                         console.log(err)
                         return res.status(500).json({
                              message: err.message
                         })
                    }
               } else {
                    res.status(200).json({
                         status_code: 200,
                         message: "Success create order",
                         order_data: newOrder,
                         order_details: orderDetails
                    })
               }
          } catch (error) {
               console.log(error)
               res.status(500).json({
                    message: error.message,
               })
          }
     }

     // async addTransaction(orderData, selectedRoomTypeId, selectedRoomIds, roomCount) {
     //      try {
     //           const checkIn = new Date(orderData.checkin_date)
     //           const checkOut = new Date(orderData.checkout_date)
     //           const diff = Math.abs(checkOut - checkIn)
     //           const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24))
     //           const selectedRoomType = await room_type.findByPk(selectedRoomTypeId)
     //           let price = selectedRoomType.price * selectedRoomIds.length
     //           const totalPrice = price * diffDay

     //           // create order
     //           const orderNumber = helper.generateOrderNumber()
     //           while (await helper.checkExistedOrder(orderNumber)) {
     //                orderNumber = helper.generateOrderNumber()
     //           }
     //           const newOrder = await order.create({
     //                ...orderData,
     //                id: v4(),
     //                room_count: roomCount,
     //                order_number: orderNumber,
     //                order_date: moment().format('YYYY-MM-DD HH:mm:ss'),
     //                order_status: "NEW",
     //                id_room_type: selectedRoomTypeId,
     //           })

     //           // loop from check-in date to check-out date
     //           let orderDetailsArray = []
     //           for (let date = checkIn; date < checkOut; date.setDate(date.getDate() + 1)) {
     //                for (const roomId of selectedRoomIds) {
     //                     orderDetailsArray.push({
     //                          id_order: newOrder.id,
     //                          id_room: roomId,
     //                          access_date: moment(date).format('YYYY-MM-DD'),
     //                          price: totalPrice / selectedRoomIds.length,
     //                     })
     //                }
     //           }

     //           const orderDetails = await order_details.bulkCreate(orderDetailsArray)

     //           const invoicePrice = orderDetailsArray.reduce((total, { price }) => total + price, 0)

     //           const invoice = newOrder
     //           const invoiceDetail = invoicePrice
     //           const typeName = selectedRoomType.room_type_name
     //           createInvoice(invoice, invoiceDetail, typeName, diffDay)

     //           return {
     //                order: newOrder,
     //                order_details: orderDetails,
     //           }
     //      } catch (error) {
     //           return error
     //      }
     // }
}