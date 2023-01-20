const { user } = require('../models')

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

module.exports = { checkExistedID }