const { v4 } = require('uuid')
const moment = require('moment')
const { createInvoice } = require('../../../middleware/createInvoice')
const { order, room_type, room, order_details } = require('../../../models')
const helper = require('../../../helpers')

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

               const invoicePrice = orderDetailsArray.reduce((total, { price }) => total + price, 0)

               const invoice = newOrder
               const invoiceDetail = invoicePrice
               const typeName = selectedRoomType.room_type_name
               createInvoice(invoice, invoiceDetail, typeName, diffDay)

               return {
                    order: newOrder,
                    order_details: orderDetails,
               }
          } catch (error) {
               return error
          }
     }
}