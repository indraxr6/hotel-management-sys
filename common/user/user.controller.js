const { user } = require('../../models')
const bcrypt = require('bcrypt')


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
        
            // Check if photo field is present in the request
            if (!req.files || Object.keys(req.files).length === 0) {
              return res.status(400).json({
                message: 'No files were uploaded.'
              });
            }
        
            const photo = req.files.photo;
            photo.mv(`../public/images/profile/${photo.name}`, async (err) => {
              if (err) {
                return res.status(500).json({
                  message: err.message
                });
              }
        
              // Hash the password using bcrypt
              const hashedPassword = await bcrypt.hash(password, 10);
        
              // Create the new user
              const data = user.create({
                name,
                email,
                photo: photo.name,
                password: hashedPassword,
                role: 'RECEPTIONIST'
              });
        
              // Return a success message
              res.status(201).json({
                message: 'Success created user',
                data
              });
            });
          } catch (error) {
            res.status(500).json({
              message: error.message
            });
          }
        }

}