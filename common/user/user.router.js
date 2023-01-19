const express = require('express')
const controller = require('./user.controller')
const upload = require('../../middleware/fileUpload')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getUserById)
router.post('/register', controller.register)
router.post('/', upload.single('photo'), controller.register);

module.exports = router



//how to call user by id (axios)
// http://localhost:3000/users/{userId}
