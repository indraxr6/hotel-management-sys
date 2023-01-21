const { user } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = "AMOGUSSSSS"

module.exports = {
     login: async (req, res) => {
          let data = {
               email: req.body.email,
               password: req.body.password
          }
          if (!data.email || !data.password) {
               res.status(402).json({
                    status_code: 402,
                    message: "Field required"
               })
          }
          const foundUser = await user.findOne({
               where: { email: req.body.email }
          })
          if (foundUser) {
               const match = bcrypt.compare(data.password, foundUser.password)
               if (match) {
                    const token = jwt.sign({ id: user.id }, secret, {
                         expiresIn : "5h"
                    })
                    return res.status(200).json({
                         status_code: 200,
                         message: "Login success",
                         token: token,
                         data: {
                              email: data.email,
                              password: await bcrypt.hash(data.password, 10)
                         }
                    })
               }
          } else if (!foundUser) {
               return res.status(401).json({
                    status_code: 401,
                    message: "No credential found"
               })
          } else {
               return res.status(401).json({
                    status_code: 401,
                    message: "Incorrect email or password"
               })
          }
     }
}