const express = require('express')
const router = express.Router()
const controller = require ('./room.controller')


router.get('/', controller.getAll)
router.get('/:id', controller.getByID)
router.post('/add', controller.addRoom)
router.delete('/delete/:id', controller.deleteRoom)
router.put('/edit/:id', controller.editRoom)

module.exports = router