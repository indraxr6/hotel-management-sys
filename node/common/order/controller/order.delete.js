
const { order, order_details } = require('../../../models')

module.exports = {
     async deleteOrder(req, res) {
          const orderId = req.params.id || req.params.order_number;
          const orderIdField = req.params.id ? 'id' : 'order_number';
          try {
               const orderData = await order.findOne({
                    where: { [orderIdField]: orderId }
               });
               if (!orderData) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order data not found"
                    });
               }
     
               const deletedOrderDetails = await order_details.destroy({
                    where: { id_order: orderData.id }
               });
     
               if (deletedOrderDetails === 0) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order details data not found"
                    });
               }
     
               const deletedOrder = await order.destroy({
                    where: { [orderIdField]: orderId }
               });
     
               if (deletedOrder === 0) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Order data not found"
                    });
               }
     
               res.status(200).json({
                    status_code: 200,
                    message: `Order data with ${orderIdField} ${orderId} and its details have been deleted.`
               });
          } catch (error) {
               console.log(error);
               res.status(500).json({
                    message: "Error deleting order data",
                    error
               });
          }
     }     
}