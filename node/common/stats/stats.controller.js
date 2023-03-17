const { Op } = require('sequelize');
const moment = require('moment');
const { sequelize } = require('../../models')
const { order, order_details, room } = require('../../models');

module.exports = {
     async getDashboardStats(req, res) {
          try {
               const firstDayOfMonth = moment().startOf('month').toDate();
               const lastDayOfMonth = moment().endOf('month').toDate();

               // Get total revenue for current month
               const revenue = await order_details.sum('price', {
                    where: {
                         createdAt: {
                              [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                         }
                    }
               });

               // Get transaction count for current month
               const transactionCount = await order.count({
                    where: {
                         createdAt: {
                              [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                         }
                    }
               });

               // Get available rooms for today
               const today = moment().startOf('day').format('YYYY-MM-DD');
               const rooms = await sequelize.query(
                    `SELECT room_types.*, COUNT(rooms.id) - COUNT(order_details.id) AS room_remaining
                     FROM rooms 
                     LEFT JOIN room_types ON rooms.id_room_type = room_types.id 
                     LEFT JOIN order_details ON order_details.id_room = rooms.id AND order_details.access_date = ?
                     GROUP BY room_types.id`,
                    {
                      replacements: [today],
                      type: sequelize.QueryTypes.SELECT
                    }
                  );

               const roomRemaining = rooms.reduce((sum, room) => sum + room.room_remaining, 0);
               
                

               // Return results as JSON response
               return res.status(200).json({
                    revenue,
                    transactionCount,
                    roomRemaining,
                    today
               });
          } catch (error) {
               console.error(error);
               res.status(500).json({
                    message: 'Error getting dashboard stats',
                    error
               });
          }
     }
}
