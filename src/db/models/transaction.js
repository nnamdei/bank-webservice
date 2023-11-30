'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Transaction.init(
    {
      amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  );
  return Transaction;
};
