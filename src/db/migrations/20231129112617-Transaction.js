'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      transactionReference: {
        type: Sequelize.STRING,
        unique: true,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      type: {
        type: Sequelize.ENUM('CREDIT', 'DEBIT'),
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'NGN',
      },
      narration: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'SUCCESSFUL', 'FAILED'),
        defaultValue: 'PENDING',
      },
      balanceBefore: {
        type: Sequelize.DECIMAL,
      },
      balanceAfter: {
        type: Sequelize.DECIMAL,
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
  down: async (queryInterface /*Sequelize*/) => {
    await queryInterface.dropTable('Transactions');
  },
};
