const express = require('express')
const conn = require('./db')
const db = require('./models')

const a = process.env.JWT_SECRET
console.log(a);



const app = express()
const port = process.env.NODE_PORT || 5000

const authRouter = require('./auth/router.auth')
const userRouter = require('./common/user/user.router')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", authRouter)
app.use("/user", userRouter)

db.sequelize.sync().then((req) => {
     app.listen(port, () => {
          console.log(`Server running in port ${port}`);
     })
})