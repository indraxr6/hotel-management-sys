const multer = require('multer')


const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, '../public/images/profile')
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname)
     }
})

const fileFilter = (req, file, cb) => {
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
          cb(null, true)
     } else {
          cb(null, false)
     }
}

const fileUpload = multer({
     storage: storage,
     fileFilter: fileFilter,
     limits: {
          fileSize: 1024 * 1024 * 5
     }
})

module.exports = fileUpload