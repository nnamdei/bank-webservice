import * as dotenv from 'dotenv';
dotenv.config();

const {
  PROD_DB_USER,
  DEV_DB_USER,
  PROD_DB_NAME,
  DEV_DB_NAME,
  PROD_DB_PASSWORD,
  DEV_DB_PASSWORD,
  PROD_DB_HOST,
  DEV_DB_HOST,
  PROD_DB_PORT,
  DEV_DB_PORT,
  NODE_ENV,
  API_PORT,
  API_VERSION,
} = process.env;

const config = {
  env: NODE_ENV || 'development',
  isProduction: NODE_ENV === 'production',
};

const dataBaseConfig = {
  username: config.isProduction ? PROD_DB_USER : DEV_DB_USER,
  password: config.isProduction ? PROD_DB_PASSWORD : DEV_DB_PASSWORD,
  database: config.isProduction ? PROD_DB_NAME : DEV_DB_NAME,
  host: config.isProduction ? PROD_DB_HOST : DEV_DB_HOST,
  dialect: 'postgres',
  logging: false,
  port: config.isProduction ? PROD_DB_PORT : DEV_DB_PORT,
  dialectOptions: {
    decimalNumbers: true,
  },
};

const apiConfig = {
  apiPort: API_PORT || 3000,
  apiVersion: API_VERSION,
};

export { config, dataBaseConfig, apiConfig };
