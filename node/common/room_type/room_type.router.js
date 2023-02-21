const express = require('express')
const fileupload = require('express-fileupload')
const router = express.Router()
const controller = require ('./room_type.controller')
const path = require('path')
const fileUpload = require('../../middleware/fileUpload')


router.get('/', controller.getAll)
router.get('/:id', controller.getByID)
router.post('/add', fileupload({createParentPath : true}), controller.addRoomType)
router.delete('/delete/:id', controller.deleteRoomType)
router.put('/edit/:id', fileupload({createParentPath : true}), controller.editRoomType)

module.exports = router