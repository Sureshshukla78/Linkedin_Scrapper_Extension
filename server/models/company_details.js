const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("company_details", {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER(11),
    },
    description : {
        type: Sequelize.STRING(2000),
    },
    domain : {
        type: Sequelize.STRING(100),
    },
    website : {
        type: Sequelize.STRING(50),
    },
    employeeSize : {
        type: Sequelize.INTEGER(10),
    },
    followers : {
        type: Sequelize.INTEGER(10),
    },
    headquarter : {
        type: Sequelize.STRING(50),
    },
    company_id :{
        type: Sequelize.INTEGER(11),
    }
},{
    timestamps:false
});