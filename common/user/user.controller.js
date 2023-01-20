const { user } = require('../../models')
const bcrypt = require('bcrypt');
const helper = require('../../helpers');

module.exports = {
     async getAll(req, res) {
          try {
               const users = await user.findAll();
               res.json(users);
          } catch (error) {
               res.status(500).json({ message: error.message });
          }
     },
     async getUserById(req, res) {
          try {
               const data = await user.findByPk(req.params.id)
               if (!data) {
                    return res.status(404).json({
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
               const { name, email, password } = req.body;
               if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).json({
                         message: 'No files were uploaded.'
                    });
               }
               const id = await helper.generateUserID()
               while (await helper.checkExistedID(id)) {
                    id = generateUserID()
               }
               const photo = req.files.photo;
               photo.mv(`public/images/profile/${photo.name}`, async (err) => {
                    if (err) {
                         return res.status(500).json({
                              message: err.message
                         });
                    }
                    // const hashedPassword = await bcrypt.hash(password, 10);
                    const data = user.create({
                         id,
                         name,
                         email,
                         photo: photo.name,
                         password: await helper.hashPassword(password),
                         role: 'RECEPTIONIST',
                    });
                    res.status(201).json({
                         status_code: 201,
                         message: 'Success created user',
                         data: await data
                    });
               });
          } catch (error) {
               res.status(500).json({
                    status_code: 500,
                    message: error.message
               });
          }
     },

     async deleteUser(req, res) {
          try {
               const id = req.params.id
               const del = await user.destroy({
                    where: { id: id }
               })
               if (del) {
                    res.status(200).json({
                         status_code: 200,
                         message: `Success deleted user with ID : ${id}`
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

     async editUser(req, res) {
          try {
               const id = req.params.id
               const { name, email, role, password } = req.body
               const photo = req.files.photo

               photo.mv(`public/images/profile/${photo.name}`, async (err) => {
                    const userUpdate = await user.findByPk(id)
                    if (!userUpdate) {
                         return res.status(404).json({
                              status_code: 404,
                              message: "User not found"
                         })
                    }
                    const updatedUser = await user.update({
                         name,
                         email,
                         password: await helper.hashPassword(password),
                         photo: photo.name,
                         role
                    }, {
                         where: { id: id }
                    });
                    res.status(200).json({
                         status_code: 200,
                         message: `Success update record for id ${id}`,
                         new_data: await userUpdate
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








