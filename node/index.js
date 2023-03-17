const express = require('express')
const db = require('./models')
const path = require('path')
// const multer = require('multer')

require('./db')

const port = process.env.SERVER_PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "..", "build")))

app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
     next()
})

app.use(express.static('public', {
     setHeaders: (res, path, stat) => {
          if (path.endsWith('.js')) {
               res.set('Content-Type', 'application/javascript');
          }
     },
}));

// const storage = multer.diskStorage({
//      destination: function (req, file, cb) {
//           cb(null, '../public/images')
//      },
//      filename: function (req, file, cb) {
//           cb(null, file.originalname)
//      }
// })

// const fileFilter = (req, file, cb) => {
//      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
//           cb(null, true)
//      } else {
//           cb(null, false)
//      }
// }

// app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'))

app.use("/", require('./routes/home'))
app.use("/auth", require('./auth/router.auth'))
app.use("/user", require('./common/user/user.router'))
app.use("/room", require('./common/room/room.router'))
app.use("/room-type", require('./common/room_type/room_type.router'))
app.use("/order", require('./common/order/order.router'))
app.use("/get-stats", require('./common/stats/stats.router'))

app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "client", "index.html"));
});


db.sequelize.sync().then(() => {
     app.listen(port, () => {
          console.log(`Server running in port ${port}`);
     })
})