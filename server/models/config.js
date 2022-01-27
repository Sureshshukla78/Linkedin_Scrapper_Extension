const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("config", {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER(11),
    },
    company_letter: {
        type: Sequelize.CHAR,
        required:true,
    },
    page_no:{
        type: Sequelize.INTEGER,
    }
},{
    timestamps:false
});