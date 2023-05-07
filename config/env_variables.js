const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  // port
  PORT: process.env.PORT,

  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  NODE_ENV: process.env.NODE_ENV,

  JWT_USER_SECRET: process.env.JWT_USER_SECRET,
  CLIENT_URL: process.env.CLIENT_URL
};
