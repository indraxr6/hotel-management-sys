'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.order, {
        foreignKey: "id",
        as: 'order'

      })
      this.belongsTo(models.room, {
        foreignKey: "id_room",
        as: "rooms"
      })
    }
  }
  order_details.init({
    id_order: DataTypes.STRING,
    id_room: DataTypes.INTEGER,
    access_date: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_details',
  });
  return order_details;
};
