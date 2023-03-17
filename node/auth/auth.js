const { user, token } = require('../models')
const express = require('express');
// const session = require('express-session')
// const app = express();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = "AMOGUSSSSS"

module.exports = {
     // login: async (req, res) => {
     //      let data = {
     //           email: req.body.email,
     //           password: req.body.password
     //      };
     //      if (!data.email || !data.password) {
     //           return res.status(402).json({
     //                status_code: 402,
     //                message: "Field required"
     //           });
     //      }
     //      const foundUser = await user.findOne({
     //           where: { email: req.body.email }
     //      });
     //      if (foundUser) {
     //           try {
     //                const match = await bcrypt.compare(data.password, foundUser.password);
     //                if (match) {    
     //                     const jsonwebtoken = jwt.sign({ id: foundUser.id }, secret, {
     //                          expiresIn: "2h"
     //                     });

     //                     // Save the new jsonwebtoken to the database
     //                     await token.create({ userId: foundUser.id, value: jsonwebtoken });

     //                     return res.status(200).json({
     //                          status_code: 200,
     //                          message: "Login success",
     //                          data: {
     //                               email: data.email,
     //                               password: await bcrypt.hash(data.password,),
     //                               userData: foundUser
     //                          }
     //                     });
     //                } else {
     //                     return res.status(401).json({
     //                          status_code: 401,
     //                          message: "Incorrect email or password"
     //                     });
     //                }
     //           } catch (error) {
     //                return res.status(500).json({
     //                     status_code: 500,
     //                     message: error.message
     //                });
     //           }
     //      } else {
     //           return res.status(400).json({
     //                status_code: 400,
     //                message: "No credential found"
     //           });
     //      }
     // },
     
     // logout: async (req, res) => {
     //      req.session.destroy();
     //      res.clearCookie("session");
     //      res.redirect("/login");
     // }
     login: async (req, res) => {
          let data = {
               email: req.body.email,
               password: req.body.password
          };
          if (!data.email || !data.password) {
               return res.status(402).json({
                    status_code: 402,
                    message: "Field required"
               });
          }
          const foundUser = await user.findOne({
               where: { email: req.body.email }
          });
          if (foundUser) {
               try {
                    const match = await bcrypt.compare(data.password, foundUser.password);
                    if (match) {
                         const token = jwt.sign({ id: user.id }, secret, {
                              expiresIn: "2h"
                         });
                         return res.status(200).json({
                              status_code: 200,
                              message: "Login success",
                              token: token,
                              data: {
                                   email: data.email,
                                   // password: await bcrypt.hash(data.password, 10),
                                   userData: foundUser
                              }
                         });
                    } else {
                         return res.status(401).json({
                              status_code: 401,
                              message: "Incorrect email or password"
                         });
                    }
               } catch (error) {
                    return res.status(500).json({
                         status_code: 500,
                         message: "Server error"
                    });
               }
          } else {
               return res.status(400).json({
                    status_code: 400,
                    message: "No credential found"
               });
          }
     }
}