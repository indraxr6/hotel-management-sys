'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('RECEPTIONIST', 'ADMIN', 'SUPERADMIN', 'CUSTOMER'),
      allowNull: false,
      defaultValue: 'RECEPTIONIST',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('USER', 'ADMIN', 'SUPERADMIN', 'CUSTOMER'),
      allowNull: false,
      defaultValue: 'USER',
    });
  }
};
