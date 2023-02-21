const { room } = require('../../models')
const helper = require('../../helpers')

module.exports = {
     async getAll(req, res) {
          try {
               const rooms = await room.findAll()
               res.status(200).json({
                    status_code: 200,
                    message: "Success fetch all data",
                    data: rooms
               })
          } catch (err) {
               return res.status(404).json({
                    status_code: 404,
                    message: err.message
               })
          }
     },
     async getByID(req, res) {
          try {
               const findRoom = await room.findByPk(req.params.id)
               res.status(200).json({
                    status_code: 200,
                    data: findRoom
               })
               if (!findRoom) {
                    res.status(404).json({
                         status_code: 404,
                         message: "No room type found",
                    })
               }
          } catch (err) {
               return res.status(404).json({
                    status_code: 404,
                    message: err.message
               })
          }
     },
     async addRoom(req, res) {
          try {
               const { room_number, id_room_type } = req.body;
               const data = await room.create({
                    room_number,
                    id_room_type
               });
               res.status(201).json({
                    status_code: 201,
                    message: 'Success add data',
                    data: data
               });
               if (!room_number || !id_room_type) {
                    res.status(401).json({
                         message : "fill all required fields"
                    })
               }
          } catch (err) {
               res.status(404).json({
                    status_code: 404,
                    message: err.message
               })
          }
     },
     async deleteRoom(req, res) {
          const id = req.params.id
          const del = await room.destroy({
               where: { id: id }
          })
          res.status(201).json({
               status_code: 201,
               message: `Success delete record with ID ${id}`,
               deleted_record: del
          })
          if (!del) {
               return res.status(404).json({
                    status_code: 201,
                    message: `Record with ID ${id} is not found`,
               })
          }

     },
     async editRoom(req, res) {
          try {
               const id = req.params.id
               const { room_number, id_room_type } = req.body

               const roomUpdate = await room.findByPk(id)
               if (!roomUpdate) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "Room details not found"
                    })
               }
               const updateRoom = await room.update({
                    room_number, 
                    id_room_type
               }, {
                    where: { id: id }
               });
               res.status(200).json({
                    status_code: 200,
                    message: `Success update record for id ${id}`,
                    new_data: await roomUpdate
               })
          } catch (error) {
               res.status(500).json({
                    status_code: 500,
                    message: error.message
               })
          }
     }

}