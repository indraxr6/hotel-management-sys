const { checkExistedID } = require('./checkExistedID');
const { generateUserID } = require('./generateUserID');
const { hashPassword } = require('./hashPassword');

const helper = { checkExistedID, generateUserID, hashPassword }

module.exports = helper