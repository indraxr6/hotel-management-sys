'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order,{
        foreignKey: "id",
        as: 'order'
      })
      // this.hasMany(models.token, {
      //   foreignKey: "userId",
      //   as: "userId"
      // })
    }
  }
  user.init({
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['ADMIN', 'RECEPTIONIST', 'SUPERADMIN', 'CUSTOMER']
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};