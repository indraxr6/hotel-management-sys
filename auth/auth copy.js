const sign = require('jsonwebtoken')
const { user } = require('../models')
const secret = process.env.NODE_SECRET_KEY
const { v4 } = require('uuid')

module.exports = {
     async login(req, res) {
          let credentials = {
               email: req.body.email,
               password: req.body.password,
          }
          if (!credentials.email || !credentials.password) {
               return res.send("Email / password cannot be empty!")
          }
          let foundUser = await user.findOne({
               where: { email : credentials.email, password : credentials.password }
          })

          if (!foundUser) {
               return res.send({
                    message: "Username / password is incorrect"
               })
          }

          return res.send({
               message: "Login success",   
               token : v4(),
               data: credentials,
          })
     }
}