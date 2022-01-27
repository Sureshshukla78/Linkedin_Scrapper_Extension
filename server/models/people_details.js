const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("people_details", {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER(11),
    },
    email : {
        type: Sequelize.STRING(300),
    },
    position : {
        type: Sequelize.STRING(50),
    },
    website_link : {
        type: Sequelize.STRING(50),
    },
    number : {
        type: Sequelize.INTEGER(10),
    },
    experience : {
        type: Sequelize.INTEGER(10),
    },
    people_id :{
        type: Sequelize.INTEGER(11),
    }
},{
    timestamps:false
});