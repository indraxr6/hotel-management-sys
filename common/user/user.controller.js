const { user } = require('../../models')
const bcrypt = require('bcrypt');
const helper = require('../../middleware/fileUpload');
const checkExistedID = require('../../helpers/checkExistedID');
const { generateUserID } = require('../../helpers/generateUserID');

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
               res.json(data)
               if (!user) {
                    return res.status(404).json({
                         message: "User not found!"
                    })
               }
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
               const id = await generateUserID()
               while (await checkExistedID(id)) {
                    id = generateUserID()
               }
               const photo = req.files.photo;
               photo.mv(`public/images/profile/${photo.name}`, async (err) => {
                    if (err) {
                         return res.status(500).json({
                              message: err.message
                         });
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const data = user.create({
                         id,
                         name,
                         email,
                         photo: photo.name,
                         password: hashedPassword,
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
     }

}