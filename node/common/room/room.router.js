const express = require('express')
const router = express.Router()
const controller = require ('./room.controller')
const { getAvailableRoom, getRemainingRoom } = require('./room.checkAvailability')


router.get('/', controller.getAll)
router.get('/:id', controller.getByID)
router.post('/add', controller.addRoom)
router.delete('/delete/:id', controller.deleteRoom)
router.put('/edit/:id', controller.editRoom)

// router.get('/check-available', getAvailableRoom)

router.post('/find/check-availability', async (req, res) => {
     try {
          const checkin_date = req.body.checkin_date.slice(0, 10)
          const checkout_date = req.body.checkout_date.slice(0, 10)
          const roomType = req.body.room_type_name
          const availableRooms = await getAvailableRoom(checkin_date, checkout_date, roomType)
          res.status(200).json({
               message: "Fetched available room from specified date.",
               data: availableRooms,
          })
     } catch (error) {
          res.status(500).json({
               message: error.message,
          })
          console.log(error);
     }
})

router.post('/find/check-remaining', async (req, res) => {
     try {
          const checkin_date = req.body.checkin_date
          const checkout_date = req.body.checkout_date
          const remainingRooms = await getRemainingRoom(checkin_date, checkout_date)
          res.status(200).json({
               message: "Fetched available room from specified date.",
               data: remainingRooms,
          })
     } catch (error) {
          res.status(500).json({
               message: error.message,
          })
          console.log(error);
     }
})


module.exports = router