const { checkExistedID, checkExistedOrder } = require('./checkExistedID');
const { generateUserID } = require('./generateUserID');
const { hashPassword } = require('./hashPassword');
const { generateOrderNumber } = require('./generateOrderNumber');

const helper = { checkExistedID, generateUserID, hashPassword, generateOrderNumber, checkExistedOrder}

module.exports = helper