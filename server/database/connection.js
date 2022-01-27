const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USER_NAME, process.env.PASS, { 
    host: process.env.HOST, 
    dialect: 'mysql', 
    operatorAliases: false 
});
module.exports = sequelize;
