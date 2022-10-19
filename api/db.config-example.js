// please rename this file to db.config.js

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "pleasechangeme",
  DB: "freeprix",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};