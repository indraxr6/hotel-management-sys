'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    order_number: DataTypes.STRING,
    order_name: DataTypes.STRING,
    order_email: DataTypes.STRING,
    order_date: DataTypes.DATE,
    checkout_date: DataTypes.DATE,
    checkin_date: DataTypes.DATE,
    guest_name: DataTypes.STRING,
    room_count: DataTypes.INTEGER,
    id_room_type: DataTypes.INTEGER,
    order_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['NEW', 'CHECK-IN', 'CHECK-OUT']
    },
    id_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};