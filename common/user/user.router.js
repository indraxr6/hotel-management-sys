const express = require('express')
const fileupload = require('express-fileupload')
const controller = require('./user.controller')
const path = require('path')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getUserById)
router.post('/register', fileupload({createParentPath : true}), controller.register)
router.delete('/delete/:id', controller.deleteUser)
router.put('/edit/:id',fileupload({createParentPath : true}), controller.editUser)

router.get('images/:filename', (req, res) => {
     const file = path.join(__dirname, '..', 'public', 'images', 'profile', req.params.filename)
     res.sendFile(file)
})

module.exports = router



//how to call user by id (axios)
// http://localhost:3000/users/{userId}

//api to get img
// axios.get(`http://localhost:3000/images/${filename}`)
//   .then(response => {
//     // do something with the image data
//   })
//   .catch(error => {
//     console.log(error);
//   });
