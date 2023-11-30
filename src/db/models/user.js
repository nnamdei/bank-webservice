'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/*models*/) {
      // define association here
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      transactionPin: DataTypes.STRING,
      uid: DataTypes.STRING,
      verifyToken: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      prototype: (User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        delete values.password;
        delete values.transactionPin;
        return values;
      }),
    },
  );
  return User;
};
