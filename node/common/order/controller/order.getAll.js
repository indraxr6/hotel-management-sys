const { sequelize } = require('../../../models')
const { order, order_details } = require('../../../models')

module.exports = {
     async getAll(req, res) {
          const page = req.query.page || 1
          const sort = req.query.sort
          const orderBy = req.query.orderBy
          // const start_date = req.query.start_date || moment().format('YYYY-MM-DD HH:mm:ss')
          const end_date = req.query.end_date
          const limit = 10
          const offset = (page - 1) * limit

          try {
               let transactionData = await order.findAll({
                    include: [{
                         model: order_details,
                         as: 'order_details',
                         required: true,
                         on: {
                              id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
                         }
                    }],
                    limit,
                    offset,
               });

               // if (sort) {
               //      transactionData = transactionData.sort((a, b) => a[sort] > b[sort]);
               // }
               // if (start_date && end_date) {
               //      transactionData = transactionData.filter(data => {
               //           return data.order_date >= start_date && data.order_date <= end_date
               //      });
               // }
               if (!transactionData.length) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "No data found with specified filter"
                    });
               }

               res.status(200).json({
                    status_code: 200,
                    message: `Fetched transaction data with ${page} page limit.`,
                    transactionData: transactionData
               });
          } catch (error) {
               console.log(error);
               res.status(500).json({
                    message: "Error fetching transactions",
                    error
               });
          }
     },
}