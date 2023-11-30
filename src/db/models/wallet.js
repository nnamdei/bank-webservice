'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Wallet.init(
    {
      balance: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Wallet',
    },
  );
  return Wallet;
};
