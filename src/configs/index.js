const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  VERSION: 1,
  BUILD: 1,
  URL: "http://127.0.0.1",
  API_PATH: "/api",
  PORT: process.env.PORT ? +process.env.PORT : 3000,
  saltRounds: parseInt(process.env.SALTROUNDS) || 12,
  SECRET: process.env.SECRET,
  DB_URL: process.env.DATABASE_URL,
};
