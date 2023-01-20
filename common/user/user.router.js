const express = require('express')
const controller = require('./user.controller')
const router = express.Router()
const fileupload = require('express-fileupload')

router.get('/', controller.getAll)
router.get('/:id', controller.getUserById)
router.post('/register', fileupload({createParentPath : true}),controller.register)


module.exports = router



//how to call user by id (axios)
// http://localhost:3000/users/{userId}
