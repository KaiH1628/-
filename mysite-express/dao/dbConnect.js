//连接数据库
const { Sequelize } = require("sequelize");
// const { sqlLogger } = require("../logger");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    //   logging: (msg) => {
    //     sqlLogger.debug(msg);
    //   },
    logging: false,
  }
);

module.exports = sequelize;

// (async function () {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();
