const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
     res.status(200).json({
          status_code: 200,
          message : "Home, hotel mng sys"
     })
})

module.exports = router
