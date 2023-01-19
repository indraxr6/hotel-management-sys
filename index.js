const express = require('express')
const conn = require('./db')
const db = require('./models')

const port = process.env.NODE_PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", require('./auth/router.auth'))
app.use("/user", require('./common/user/user.router'))

db.sequelize.sync().then((req) => {
     app.listen(port, () => {
          console.log(`Server running in port ${port}`);
     })
})