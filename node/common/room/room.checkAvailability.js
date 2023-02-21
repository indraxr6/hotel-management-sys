const { Op } = require('sequelize')
const { sequelize } = require('../../models')
const { room, room_type, order_details } = require('../../models')

module.exports = {

     async getAvailableRoom(checkin_date, checkout_date, room_type_name) {
          const query = `
            SELECT rooms.id, room_types.id AS type_id, room_types.room_type_name, rooms.room_number
            FROM rooms
            LEFT JOIN room_types ON rooms.id_room_type = room_types.id
            LEFT JOIN order_details ON order_details.id_room = rooms.id AND order_details.access_date BETWEEN ? AND ?
            WHERE order_details.access_date IS NULL
            AND room_types.room_type_name = ?
          `;

          const replacements = [checkin_date, checkout_date, room_type_name];

          const availableRooms = await sequelize.query(query, {
               replacements,
               type: sequelize.QueryTypes.SELECT,
          });

          return availableRooms;
     },
        

     async getRemainingRoom(checkin_date, checkout_date) {
          const remainingRooms = sequelize.query("SELECT room_types.*, count(rooms.id) as room_remaining FROM rooms LEFT JOIN room_types ON rooms.id_room_type = room_types.id LEFT JOIN order_details ON order_details.id_room = rooms.id AND order_details.access_date BETWEEN ? AND ? WHERE order_details.access_date IS NULL GROUP BY room_types.id;",
               { replacements: [checkin_date, checkout_date], type: sequelize.QueryTypes.SELECT })
          return remainingRooms
     }

     // async getRemainingRoom(checkin_date, checkout_date) {

     //      const availableRooms = await room.findAll({
     //           attributes: ['id', 'room_number'],
     //           include: [{
     //                model: room_type,
     //                as: 'room_types',
     //                attributes: ['id as type_id', 'room_type_name'],
     //           },
     //           {
     //                model: order_details,
     //                as: 'rooms',
     //                required: false,
     //                where: {
     //                     access_date: {
     //                          [Op.between]: [`${checkin_date} 00:00:00`, `${checkout_date} 23:59:59`]
     //                     }    
     //                }
     //           }],
     //           where: {
     //                '$order_details.id$': {
     //                     [Op.is]: null
     //                }
     //           }
     //      });
     //      console.log(availableRooms);
     //      return availableRooms
     // },
     // async getRemainingRoom(checkinDate, checkoutDate) {
     //      try {
     //           const query = await room_type.findAll({
     //                attributes: ['id', 'name', 'description', 'price', 'capacity'],
     //                include: [
     //                     {
     //                          model: room,
     //                          attributes: [
     //                               [sequelize.fn('COUNT', sequelize.col('rooms.id')), 'room_remaining']
     //                          ],
     //                          where: {
     //                               id: {
     //                                    [Op.notIn]: sequelize.literal(`
     //                     SELECT DISTINCT rooms.id
     //                     FROM rooms
     //                     JOIN order_details ON order_details.id_room = rooms.id
     //                     AND order_details.access_date BETWEEN '${checkinDate} 00:00:00' AND '${checkoutDate} 23:59:59'
     //                     GROUP BY room.id
     //                   `)
     //                               }
     //                          },
     //                          required: false
     //                     }
     //                ],
     //                group: ['room_type.id']
     //           });
     //           return result;
     //      } catch (error) {
     //           console.log(error);
     //           throw new Error('Failed to get available room types.');
     //      }
     // },


}

