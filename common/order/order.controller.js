const { Sequelize, sequelize } = require('../../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const moment = require('moment')
const { generateInvoice, createInvoice } = require('../../middleware/createInvoice')
const { order, room, room_type, order_details } = require('../../models')
const helper = require('../../helpers')

module.exports = {


     async addTransaction(orderData, selectedRoomTypeId, selectedRoomIds, roomCount) {
          try {
               const checkIn = new Date(orderData.checkin_date)
               const checkOut = new Date(orderData.checkout_date)
               const diff = Math.abs(checkOut - checkIn)
               const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24))
               const selectedRoomType = await room_type.findByPk(selectedRoomTypeId)
               // const selectedRoomType = await room_type.findAll({
               //      where: { id: { [Op.in]: selectedRoomTypeId } }
               // })

               let price = selectedRoomType.price * selectedRoomIds.length 
               const totalPrice = price * diffDay

               // for (let i = 0; i < selectedRoomType.length; i++) {
               //      totalPrice += diffDay * selectedRoomType[i].price
               // }


               //create order
               const orderNumber = helper.generateOrderNumber()
               const newOrder = await order.create({
                    ...orderData,
                    id: v4(),
                    room_count: roomCount,
                    order_number: orderNumber,
                    order_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    order_status: "NEW",
                    id_room_type: selectedRoomTypeId,
               })

               const orderDetail = await order_details.create({
                    id_order: newOrder.id,
                    id_room: selectedRoomIds,
                    access_date: orderData.checkin_date,
                    price: totalPrice
               })

               const invoice = newOrder
               const invoiceDetail = orderDetail
               createInvoice(invoice, invoiceDetail)

               return {
                    order: newOrder,
                    order_details: orderDetail,
                    // order_invoice: invoice
               }
          } catch (error) {
               throw error
          }
     }
}

