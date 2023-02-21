const express = require('express')
const router = express.Router()
const controller = require('./controller')
const app = express()

router.get('/find', controller.getAll)
router.get('/find/:sort', controller.getAll)
router.get('/find/:start_date/:end_date', controller.getAll)
router.get('/find/:sort/:order', controller.getAll)          


router.get('/find-id/:id', controller.getById)
router.get('/find-ordernumber/:id?', controller.getByOrderNumber)
router.delete('/delete/:id', controller.deleteOrder)

router.put('/change-status/:orderNumber', controller.updateOrderStatus)
router.put('/edit/:id', controller.updateOrderData)


router.post('/add-transaction', async (req, res) => {
     try {
          const orderData = req.body
          const selectedRoomTypeId = req.body.id_room_type
          const selectedRoomIds = req.body.id_room
          const roomCount = selectedRoomIds.length
          const newOrder = await controller.addTransaction(orderData, selectedRoomTypeId, selectedRoomIds, roomCount)
          if (selectedRoomIds.length > 10) {
               throw new Error("Exceeded 10 room count limit.")
          }
          res.status(200).json({
               message: "Success create order",
               order_data: newOrder,
          })
     } catch (error) {
          res.status(500).json({
               message: error.message,
          })
          console.log(error);
     }
})


module.exports = router