const express = require('express')
const router = express.Router()
const controller = require('./order.controller')
const app = express()

router.get('/')
// router.post('/add-transaction', controller.addTransaction)

router.post('/add-transaction', async (req, res) => {
     try {
          const orderData = req.body
          const selectedRoomTypeId = req.body.id_room_type
          const selectedRoomIds = req.body.id_room
          const roomCount = selectedRoomIds.length
          const newOrder = await controller.addTransaction(orderData, selectedRoomTypeId, selectedRoomIds, roomCount)
          res.status(200).json({
               message: "Success create order",
               order_data: newOrder
          })
     } catch (error) {
          res.status(500).json({
               message: error.message,
          })
          console.log(error);
     }
})


module.exports = router