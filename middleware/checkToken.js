const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function checkToken(req, res, next) {
     const token = req.headers.authorization
     if (!token) {
          return res.status(401).json({
               status_code: 401,
               message: "No access token provided"
          })
     }
     jwt.verify(token, secret, (err, decoded) => {
          if (err) {
               return res.status(401).json({
                    status_code: 401,
                    message: "Invalid access token",
                    token: token
               })
          }
          req.user = decoded
          next()
     })
}

module.exports = { checkToken }