const { order } = require('../../../models')

module.exports = {
  async updateOrderStatus(req, res) {
    const orderNumber = req.params.orderNumber;
    const { status } = req.body;
    try {
      const orderData = await order.findOne({ where: { order_number: orderNumber } });
      if (!orderData) {
        return res.status(404).json({
          status_code: 404,
          message: `Order with order number ${orderNumber} not found.`
        });
      }

      if (status === 'CHECK-IN' || status === 'CHECK-OUT' || status === 'CANCEL') {
        await order.update({ order_status: status }, { where: { order_number: orderNumber } });
        return res.status(200).json({
          status_code: 200,
          message: `Order with order number ${orderNumber} has been successfully updated to ${status}.`,
          orderData
        });
      } else {
        return res.status(400).json({
          status_code: 400,
          message: "Invalid status input, status should be 'CHECK-IN', 'CHECK-OUT' or 'CANCEL' "
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error updating order status",
        error
      });
    }
  },

  async updateOrderData(req, res) {
    try {
      const { id } = req.params
      const { order_name, order_email, guest_name, id_user } = req.body

      const orderToEdit = await order.findByPk(id)
      if (!orderToEdit) return res.status(404).send({ error: 'Order not found' })

      const updatedOrder = await orderToEdit.update({
        order_name,
        order_email,
        guest_name,
        id_user
      })

      res.status(200).send({
        message: 'Order information updated successfully',
        data: updatedOrder,
      })
    } catch (error) {
      res.status(500).send({
        message: 'Something went wrong',
        error,
      })
    }
  }

}