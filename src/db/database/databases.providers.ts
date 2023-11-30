import { Sequelize } from 'sequelize-typescript';
import { dataBaseConfig } from '../../common/utils/config';
import { User } from 'src/user/data/user.entity';
import { Wallet } from 'src/user/data/wallet.entity';
import { Transaction } from 'src/transaction/data/transaction.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        dataBaseConfig.database,
        dataBaseConfig.username,
        dataBaseConfig.password,
        {
          port: +dataBaseConfig.port,
          host: dataBaseConfig.host,
          dialect: 'postgres', //dataBaseConfig.dialect as Dialect,
          logging: dataBaseConfig.logging,
          dialectOptions: {
            decimalNumbers: true,
            // ssl: {
            //   require: true,
            //   rejectUnauthorized: false,
            // },
          },
        },
      );
      sequelize.addModels([User, Wallet, Transaction]);
      await sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch((err) => {
          console.error('Unable to connect to the database:', err);
        });
      return sequelize;
    },
  },
  // Sequelize
];
