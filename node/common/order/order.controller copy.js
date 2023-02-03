const { Sequelize, sequelize } = require('../../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const { order, room, room_type, order_details } = require('../../models')
const helper = require('../../helpers')
const { generateInvoice } = require('../../middleware/createInvoice')

module.exports = {

     async addTransaction(orderData, roomTypeId, roomIds) {
          const checkIn = new Date(orderData.checkin_date)
          const checkOut = new Date(orderData.checkout_date)
          const diff = Math.abs(checkOut - checkIn)
          const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24))
          const roomType = await room_type.findByPk(3)
          const price = diffDay * roomType.price
          let order_id = v4()

          const transaction = await sequelize.transaction()
          try {
               const orderNumber = helper.generateOrderNumber()

               // new transaction
               const rooms = await room.findAll({
                    where: {
                         id: { [Op.in]: roomIds }
                    }

               }, { transaction })
               const roomTypeId = await rooms[0].id_room_type

               //new order
               const orders = await order.create({
                    ...orderData,
                    id: order_id,
                    id_room_type: roomTypeId,
                    order_number: orderNumber,
                    order_status: "NEW"
               }, { transaction })

               //add to order_details
               const orderDetails = await Promise.all(roomIds.map(async (roomId) => {
                    return order_details.create({
                         id_order: order.id,
                         id_room: roomId,
                         access_date: orderData.checkin_date,
                         price: price
                    }, { transaction })
               }))
               await transaction.commit()
               await generateInvoice(orders)
               return orders
          } catch (error) {
               await transaction.rollback()
               throw error
          }
     }
}

