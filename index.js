const express = require('express')
const db = require('./models')
require('./db')

const port = process.env.NODE_PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", require('./routes/home'))
app.use("/auth", require('./auth/router.auth'))
app.use("/user", require('./common/user/user.router'))
app.use("/room", require('./common/room/room.router'))
app.use("/room-type", require('./common/room_type/room_type.router'))
app.use("/order", require('./common/order/order.router'))




db.sequelize.sync().then(() => {
     app.listen(port, () => {
          console.log(`Server running in port ${port}`);
     })
})