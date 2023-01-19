const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('ukk_hotel', 'root', '', {
     host: 'localhost',
     dialect: 'mysql'
})

sequelize.authenticate().then(() => {
     console.log("Connected to DB");
}).catch((error) => {
     console.log("DB Connection Failed \n", error );
})
