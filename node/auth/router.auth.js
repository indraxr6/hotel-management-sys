const express = require('express')
const controller = require('./auth')
const router = express.Router()

router.post('/login', controller.login)


module.exports = router
