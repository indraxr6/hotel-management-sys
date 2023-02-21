const { getAll } = require('./order.getAll');
const { getById, getByOrderNumber } = require('./order.getId');
const { addTransaction } = require('./order.addTrans');
const { deleteOrder } = require('./order.delete');
const { updateOrderStatus, updateOrderData } = require('./order.update');

const controller = { getAll, getById, getByOrderNumber, addTransaction, deleteOrder, updateOrderStatus, updateOrderData }

module.exports = controller   