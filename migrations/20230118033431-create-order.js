'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_number: {
        type: Sequelize.INTEGER
      },
      order_name: {
        type: Sequelize.STRING
      },
      order_email: {
        type: Sequelize.STRING
      },
      order_date: {
        type: Sequelize.DATE,
      },
      checkout_date: {
        type: Sequelize.DATE
      },
      checkin_date: {
        type: Sequelize.DATE
      },
      guest_name: {
        type: Sequelize.STRING
      },
      room_count: {
        type: Sequelize.INTEGER
      },
      id_room_type: {
        type: Sequelize.INTEGER,
        references: {
          model: "room_types",
          key: "id"
        }
      },
      order_status: {
        type: Sequelize.ENUM('NEW', 'CHECK-IN', 'CHECK-OUT'),
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};