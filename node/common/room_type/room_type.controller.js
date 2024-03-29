const { room_type } = require('../../models')
const helper = require('../../helpers')
const path = require('path')

module.exports = {
     async getAll(req, res) {
          try {
               const roomTypes = await room_type.findAll()
               
               res.status(200).json({
                    status_code: 200,
                    message: "Success fetch all data",
                    data: roomTypes
               })
          } catch (err) {
               return res.status(404).json({
                    status_code: 404,
                    message: err.message
               })
          }
     },

     // async getAll(req, res) {
     //      try {
     //           const roomTypes = await room_type.findAll()
     //           const result = roomTypes.map(roomTypes => {
     //                return {
     //                     ...roomTypes.toJSON(),
     //                     photoUrl: `http://localhost:5000/public/images/room/${roomTypes.photo}`
     //                }
     //           })
     //           res.status(200).json({
     //                status_code: 200,
     //                message: "Success fetch all data",
     //                data: result
     //           })
     //      } catch (error) {
     //           console.log(error);
     //           return res.send({
     //                message: error.message
     //           })
     //      }

     // },
     async getByID(req, res) {
          try {
               const findType = await room_type.findByPk(req.params.id)
               res.status(200).json({
                    status_code: 200,
                    data: findType,
                    facilities: findType.facilities.split(',')
               })
               if (!findType) {
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
     async addRoomType(req, res) {
          try {
               const { room_type_name, price, description, facilities } = req.body;
               if (!room_type_name || !price || !description || !facilities) {
                    return res.status(400).json({
                         message: "Please fill in all fields."
                    })
               }
               if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).json({
                         message: 'No files were uploaded.'
                    });
               }
               const photo = req.files.photo;
               photo.mv(`public/images/room/${photo.name}`, async (err) => {
                    if (err) {
                         return res.status(500).json({
                              message: err.message
                         });
                    }
                    const data = await room_type.create({
                         room_type_name,
                         price,
                         description,
                         facilities,
                         photo: photo.name
                    });
                    res.status(201).json({
                         status_code: 201,
                         message: 'Success add data',
                         data: data
                    });
               });
          } catch (err) {
               res.status(404).json({
                    status_code: 404,
                    message: err.message
               })
          }
     },
     async deleteRoomType(req, res) {
          const id = req.params.id
          const del = await room_type.destroy({
               where: { id: id }
          })
          res.status(201).json({
               status_code: 201,
               message: `Success deleted room Type`,
          })
          if (!del) {
               return res.status(404).json({
                    status_code: 201,
                    message: `Record with ID ${id} is not found`,
               })
          }

     },
     async editRoomType(req, res) {
          try {
               const id = req.params.id
               const { room_type_name, price, description, facilities } = req.body
               if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).json({
                         message: 'No files were uploaded.'
                    });
               }
               const photo = req.files.photo

               photo.mv(`public/images/room/${photo.name}`, async (err) => {
                    const roomUpdate = await room_type.findByPk(id)
                    if (!roomUpdate) {
                         return res.status(404).json({
                              status_code: 404,
                              message: "Room details not found"
                         })
                    }
                    const updateRoom = await room_type.update({
                         room_type_name,
                         price,
                         description,
                         facilities,
                         photo: photo.name
                    }, {
                         where: { id: id }
                    });
                    res.status(200).json({
                         status_code: 200,
                         message: `Success update record for id ${id}`,
                         new_data: await roomUpdate
                    })
               });
          } catch (error) {
               res.status(500).json({
                    status_code: 500,
                    message: error.message
               })
          }
     }

}