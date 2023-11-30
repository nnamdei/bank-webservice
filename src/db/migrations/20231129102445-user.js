'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      uid: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verifyToken: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      transactionPin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastlogin: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'PENDING'),
        defaultValue: 'INACTIVE',
      },
      tokenExpiration: {
        type: Sequelize.DATE,
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isPinSet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface /*Sequeliz*/) => {
    await queryInterface.dropTable('Users');
  },
};
