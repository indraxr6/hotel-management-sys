'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order_details, {
        foreignKey: "id_room",
        as: "room"
      })
      this.belongsTo(models.room_type, {
        foreignKey: "id_room_type"
      })
    }
  }
  room.init({
    room_number: DataTypes.INTEGER,
    id_room_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};