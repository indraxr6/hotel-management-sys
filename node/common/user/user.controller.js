const { user } = require('../../models')
const helper = require('../../helpers');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
     async getAll(req, res) {
          try {
               const users = await user.findAll();
               res.status(200).json({
                    status_code: 200,
                    message: "Success fetch all user",
                    data: users
               })
          } catch (error) {
               res.status(500).json({ message: error.message });
          }
     },
     async getUserById(req, res) {
          try {
               const data = await user.findByPk(req.params.id)
               if (!data) {
                    return res.status(404).json({
                         status_code: 404,
                         message: "User not found!"
                    })
               }
               res.json(data)
          } catch (error) {
               res.status(500).json({
                    message: error.message
               })
          }
     },
     async register(req, res) {
          try {
               const { name, email, password, photo } = req.body;

               const id = await helper.generateUserID()
               while (await helper.checkExistedID(id)) {
                    id = generateUserID()
               }

               const data = user.create({
                    id,
                    name,
                    email,
                    photo,
                    password: await helper.hashPassword(password),
                    role: 'RECEPTIONIST',
               });
               res.status(201).json({
                    status_code: 201,
                    message: 'Success created user',
                    data: await data
               });


          } catch (error) {
               res.status(500).json({
                    status_code: 500,
                    message: error.message
               });
          }
     },
     // async register(req, res) {
     //      try {
     //           const { name, email, password } = req.body;
     //           if (!req.files || Object.keys(req.files).length === 0) {
     //                return res.status(400).json({
     //                     message: 'No files were uploaded.'
     //                });
     //           }
     //           const id = await helper.generateUserID()
     //           while (await helper.checkExistedID(id)) {
     //                id = generateUserID()
     //           }
     //           const photo = req.files.photo;
     //           photo.mv(`public/images/profile/${photo.name}`, async (err) => {
     //                if (err) {
     //                     return res.status(500).json({
     //                          message: err.message
     //                     });
     //                }
     //                const data = user.create({
     //                     id,
     //                     name,
     //                     email,
     //                     photo: photo.name,
     //                     password: await helper.hashPassword(password),
     //                     role: 'RECEPTIONIST',
     //                });
     //                res.status(201).json({
     //                     status_code: 201,
     //                     message: 'Success created user',
     //                     data: await data
     //                });
     //           });
     //      } catch (error) {
     //           res.status(500).json({
     //                status_code: 500,
     //                message: error.message
     //           });
     //      }
     // },
     async deleteUser(req, res) {
          try {
               const id = req.params.id
               const del = await user.destroy({
                    where: { id: id }
               })
               if (del) {
                    res.status(200).json({
                         status_code: 200,
                         message: `Success deleted user with ID : ${id}`,
                         deleted_record: del
                    })
               } else if (!del) {
                    res.status(400).json({
                         status_code: 400,
                         message: `User with ID ${id} is not found.`
                    })
               }
          } catch (error) {
               res.status(500).json({
                    status_code: 500,
                    message: error.message
               })
          }
     },

     // async editUser(req, res) {
     //      try {
     //           const id = req.params.id
     //           const { name, email, role, password } = req.body
     //           const photo = req.files.photo

     //           photo.mv(`public/images/profile/${photo.name}`, async (err) => {
     //                const userUpdate = await user.findByPk(id)
     //                if (!userUpdate) {
     //                     return res.status(404).json({
     //                          status_code: 404,
     //                          message: "User not found."
     //                     })
     //                }
     //                const updatedUser = await user.update({
     //                     name ,
     //                     email,
     //                     password: await helper.hashPassword(password),
     //                     photo: photo.name,
     //                     role
     //                }, {
     //                     where: { id: id }
     //                });
     //                res.status(200).json({
     //                     status_code: 200,
     //                     message: `Success update record for id ${id}`,
     //                     new_data: await userUpdate
     //                })
     //           });
     //      } catch (error) {
     //           res.status(500).json({
     //                status_code: 500,
     //                message: error.message
     //           })
     //      }
     // },

     async changeRole(req, res) {
          try {
               const id = req.params.id
               const role = req.body.role

               const updateRole = await user.update({
                    role: role
               }, {
                    where: { id: id }
               })
               if (!updateRole) {
                    return res.status(404).json({
                         message: "No user found"
                    })
               }
               res.status(200).json({
                    status_code: 200,
                    message: `Success update role for user ID ${id}`,
               })

          } catch (err) {
               res.status(500).json({
                    status_code: 500,
                    message: err.message
               })

          }

     },

     async changeProfilePhoto(req, res) {
          try {
               const id = req.params.id
               const photo = req.files.photo

               photo.mv(`public/images/profile/${photo.name}`, async (err) => {
                    const updatePhoto = await user.findByPk(id)
                    if (!updatePhoto) {
                         return res.status(404).json({
                              status_code: 404,
                              message: "User not found."
                         })
                    }
                    const updatedPhoto = await user.update({
                         photo: photo.name
                    }, {
                         where: { id: id }
                    })
                    res.status(200).json({
                         status_code: 200,
                         message: `Success update photo for user id ${id}`,
                         newPhoto: await photo.name
                    })
               })
          } catch (err) {
               res.status(500).json({
                    status_code: 500,
                    message: err.message
               })

          }

     },

     async changePassword(req, res) {
          const id = req.params.id
          const { oldPassword, newPassword } = req.body;
          try {
               const findUser = await user.findByPk(id);

               const isMatch = await bcrypt.compare(oldPassword, findUser.password);
               if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid old password' });
               }

               const salt = await bcrypt.genSalt(10);
               const hashedPassword = await bcrypt.hash(newPassword, salt);

               await user.update({ password: hashedPassword }, { where: { id } });

               res.json({ message: 'Password updated successfully! 👍' });
          } catch (error) {
               console.error(error);
               res.status(500).json({ message: error.message });
          }
     },

     async changeName(req, res) {
          try {
               const id = req.params.id
               const name = req.body.name

               const updateName = await user.update({
                    name: name
               }, {
                    where: { id: id }
               })
               if (!updateName) {
                    return res.status(404).json({
                         message: "No user found"
                    })
               }
               res.status(200).json({
                    status_code: 200,
                    message: `Success update name for user ID ${id}`,
                    new_name: name
               })

          } catch (err) {
               res.status(500).json({
                    status_code: 500,
                    message: err.message
               })

          }

     },

}








