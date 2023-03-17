const express = require('express')
const controller = require('./stats.controller')
const router = express.Router()

router.get('/', controller.getDashboardStats)


module.exports = router