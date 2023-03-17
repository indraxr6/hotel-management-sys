const { sequelize } = require('../../../models')
const { order, order_details } = require('../../../models')
const { Op } = require('sequelize')
const moment = require('moment')

module.exports = {

     // async getAll (req, res) {
     //      try {
     //        const { page = 1, limit = 10, sortField = 'order_date', sortOrder = 'DESC', filter } = req.query;

     //        let transactionData;
     //        const offset = (page - 1) * limit;

     //        // Check if filter is provided
     //        if (filter) {
     //          const { duration, start_date, end_date } = filter;

     //          // If duration filter is provided
     //          if (duration) {
     //            const today = new Date();
     //            const daysAgo = new Date(today.getTime() - (duration * 24 * 60 * 60 * 1000));
     //            transactionData = await order.findAll({
     //              include: [{
     //                model: order_details,
     //                as: 'order_details',
     //                required: true,
     //                on: {
     //                  id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order')),
     //                },
     //              }],
     //              where: {
     //                createdAt: {
     //                  [Op.gte]: daysAgo,
     //                },
     //              },
     //              limit,
     //              offset,
     //              order: [[sortField, sortOrder]],
     //            });
     //          } else if (start_date && end_date) {
     //            const startDateObj = new Date(start_date);
     //            const endDateObj = new Date(end_date);
     //            const duration = (endDateObj - startDateObj) / (24 * 60 * 60 * 1000);
     //            transactionData = await order.findAll({
     //              include: [{
     //                model: order_details,
     //                as: 'order_details',
     //                required: true,
     //                on: {
     //                  id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order')),
     //                },
     //              }],
     //              where: {
     //                createdAt: {
     //                  [Op.between]: [startDateObj, endDateObj],
     //                },
     //              },
     //              limit,
     //              offset,
     //              order: [[sortField, sortOrder]],
     //            });
     //          }
     //        } else {
     //          transactionData = await order.findAll({
     //            include: [{
     //              model: order_details,
     //              as: 'order_details',
     //              required: true,
     //              on: {
     //                id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order')),
     //              },
     //            }],
     //            limit,
     //            offset,
     //            order: [[sortField, sortOrder]],
     //          });
     //        }

     //        res.status(200).json({
     //          status_code: 200,
     //          message: `Fetched transaction data with ${page} page limit.`,
     //          transactionData,
     //        });
     //      } catch (error) {
     //        console.log(error);
     //        res.status(500).json({
     //          message: 'Error fetching transactions',
     //          error,
     //        });
     //      }
     //    }



     async getAll(req, res) {
          const page = req.query.page || 1
          // const sort = req.query.sort
          const orderBy = req.query.order || ""
          const start_date = req.query.start_date ? moment(req.query.start_date).startOf('day').format('YYYY-MM-DD HH:mm:ss') : null;
          const end_date = req.query.end_date ? moment(req.query.end_date).endOf('day').format('YYYY-MM-DD HH:mm:ss') : null;
          const limit = parseInt(req.query.limit) || null
          const offset = (page - 1) * limit

          try {
               let whereClause = {};
               if (start_date && end_date) {
                    whereClause = {
                         [Op.and]: [
                              { checkin_date: { [Op.gte]: start_date } },
                              { checkout_date: { [Op.lte]: end_date } },
                         ],
                    };
               }
               let transactionData = await order.findAll({
                    include: [{
                         model: order_details,
                         as: 'order_details',
                         required: true,
                         on: {
                              id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
                         }
                    }],
                    where: whereClause,
                    offset,
                    order: [['order_date', 'DESC']]
               });

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

     // async getAll(req, res) {
     //      const page = req.query.page || 1
     //      const sort = req.query.sort
     //      const orderBy = req.query.orderBy
     //      const start_date = req.query.start_date || moment().format('YYYY-MM-DD HH:mm:ss')
     //      const end_date = req.query.end_date
     //      const limit = 10
     //      const offset = (page - 1) * limit

     //      try {
     //           let transactionData = await order.findAll({
     //                include: [{
     //                     model: order_details,
     //                     as: 'order_details',
     //                     required: true,
     //                     on: {
     //                          id: sequelize.where(sequelize.col('order.id'), '=', sequelize.col('order_details.id_order'))
     //                     }
     //                }],
     //                limit,
     //                offset,
     //           });

     //           // if (sort) {
     //           //      transactionData = transactionData.sort((a, b) => a[sort] > b[sort]);
     //           // }
     //           // if (start_date && end_date) {
     //           //      transactionData = transactionData.filter(data => {
     //           //           return data.order_date >= start_date && data.order_date <= end_date
     //           //      });
     //           // }
     //           if (!transactionData.length) {
     //                return res.status(404).json({
     //                     status_code: 404,
     //                     message: "No data found with specified filter"
     //                });
     //           }

     //           res.status(200).json({
     //                status_code: 200,
     //                message: `Fetched transaction data with ${page} page limit.`,
     //                transactionData: transactionData
     //           });
     //      } catch (error) {
     //           console.log(error);
     //           res.status(500).json({
     //                message: "Error fetching transactions",
     //                error
     //           });
     //      }
     // },
}