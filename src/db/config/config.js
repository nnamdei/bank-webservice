const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });


const PROD_DB_USER = process.env.PROD_DB_USER;
const PROD_DB_NAME = process.env.PROD_DB_NAME;
const PROD_DB_PASSWORD = process.env.PROD_DB_PASSWORD;
const PROD_DB_HOST = process.env.PROD_DB_HOST;
const PROD_DB_PORT = process.env.PROD_DB_PORT;

const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD;
const DEV_DB_NAME = process.env.DEV_DB_NAME;
const DEV_DB_USER = process.env.DEV_DB_USER;

const dbConfig = {
  development: {
    username: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
    },
  },
  test: {
    username: 'root',
    password: '123@XYZ.com?',
    database: 'fastadb',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 8889,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
  production: {
    username: PROD_DB_USER,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    dialect: 'postgres',
    port: parseInt(PROD_DB_PORT),
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
};

module.exports = dbConfig;
