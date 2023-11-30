'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
        allowNull: true,
      },
      escrowBalance: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
        allowNull: true,
      },
      ledgerBalance: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
        allowNull: true,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      uid: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Wallets');
  },
};
