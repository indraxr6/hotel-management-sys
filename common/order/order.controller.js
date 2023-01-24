const { Sequelize, sequelize } = require('../../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const moment = require('moment')
const { generateInvoice } = require('../../middleware/createInvoice')
const { order, room, room_type, order_details } = require('../../models')
const helper = require('../../helpers')

module.exports = {


     async addTransaction(orderData, selectedRoomTypeId, selectedRoomIds) {
          try {
               const checkIn = new Date(orderData.checkin_date)
               const checkOut = new Date(orderData.checkout_date)
               const diff = Math.abs(checkOut - checkIn)
               const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24))
               // const selectedRoomType = await room_type.findByPk(selectedRoomTypeId)
               const selectedRoomType = await room_type.findAll({
                    where: { id: { [Op.in]: selectedRoomTypeId } }
               })

               const totalPrice = diffDay * selectedRoomType.price


               //create order
               const orderNumber = helper.generateOrderNumber()
               const newOrder = await order.create({
                    ...orderData,
                    id: v4(),
                    order_number: orderNumber,
                    order_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    order_status: "NEW",
                    id_room_type: selectedRoomTypeId
               })
               // const orderDetails = await Promise.all(
               //      selectedRoomIds.map(async (roomId) => {
               //           return order_details.create({
               //                id_order: newOrder.id,
               //                id_room: roomId,
               //                access_date: orderData.checkin_date,
               //                price: totalPrice
               //           })
               //      })
               // )
               let orderDetails = []
               for (let i = 0; i < selectedRoomIds.length; i++) {
                    const orderDetail = await order_details.create({
                         id_order: newOrder.id,
                         id_room: roomId,
                         access_date: orderData.checkin_date,
                         price: totalPrice
                    })
                    orderDetails.push(orderDetail)
               }
               const invoice = await generateInvoice(newOrder, orderDetails)
               return {
                    order: newOrder,
                    order_details: orderDetails,
                    order_invoice: invoice
               }
          } catch (error) {
               throw error
          }
     }
}

