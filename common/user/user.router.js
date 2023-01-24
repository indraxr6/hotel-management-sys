const express = require('express')
const fileupload = require('express-fileupload')
const controller = require('./user.controller')
const router = express.Router()
const { verifyRole } = require('../../middleware/verifyRole')
const { checkToken } = require('../../middleware/checkToken')

const fileUpload = require('../../middleware/fileUpload')


router.post('/register', fileUpload.single('photo'), controller.register)



router.get('/', controller.getAll)
router.get('/:id', controller.getUserById)
// router.post('/register', fileupload({createParentPath : true}), controller.register)
router.put('/edit/:id', fileupload({createParentPath : true}), controller.editUser)
router.delete('/delete/:id', checkToken, verifyRole, controller.deleteUser)





// const path = require('path')

// router.post('/register', fileupload({createParentPath : true}), controller.register)
// router.get('images/:filename', (req, res) => {
//      const file = path.join(__dirname, '..', 'public', 'images', 'profile', req.params.filename)
//      res.sendFile(file)
// })

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
