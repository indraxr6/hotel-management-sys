'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order, {
        foreignKey: "id_room_type"
      })
      this.hasMany(models.room, {
        foreignKey: "id_room_type"
      })
    }
  }
  room_type.init({
    room_type_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    facilities: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'room_type',
  });
  return room_type;
};