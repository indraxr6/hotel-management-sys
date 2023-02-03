const { user, order } = require('../models')

async function checkExistedID(generatedUserID) {
     const existedID = await user.findOne({
          where: { id: generatedUserID }
     })
     if (existedID) {
          return true
     } else {
          return false
     }
}

async function checkExistedOrder(generatedOrderNumber) {
     const existedID = await order.findOne({
          where: { order_number: generatedOrderNumber }
     })
     if (existedID) {
          return true
     } else {
          return false
     }
}

module.exports = { checkExistedID, checkExistedOrder }