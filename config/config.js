require('dotenv').config();
module.exports = {
  development: {
    username: "root",
    password:null,
    database: "Linkedin_Scrapper",
    host: '127.0.0.1',
    dialect: "mysql"
  },
  test: {
    username: "root",
    password:null,
    database: "Linkedin_Scrapper",
    host: '127.0.0.1',
    dialect: "mysql"
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASS,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: "mysql"
  }
}
