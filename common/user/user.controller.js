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
               if(!user) {
                    return res.status(404).json({
                         message: "User not found!"
                    })
               }
          } catch(error) {
               res.status(500).json({
                    message: error.message
               })
          }
     },
     async register(req, res) {
          try {
               const { name, email, password } = req.body
               const salt = await bcrypt.genSalt(10)
               const hashedPassword = await bcrypt.hash(password, salt)
               const photo = req.file.path

               const data = user.Create({
                    name,
                    email,
                    photo, 
                    password: hashedPassword,
                    role: 'RECEPTIONIST'
               })
               res.status(201).json({
                    message : "Success created user"
               })
          } catch(error) {
               res.status(500).json({
                    message: error.message
               })
          }
     },

}