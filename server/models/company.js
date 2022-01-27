const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("company", {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER(11),
    },
    url : {
        type: Sequelize.STRING(20),
        unique: true
    },
    name : {
        type: Sequelize.STRING(50),
    },
    status:{
        type: Sequelize.ENUM("not_scraped", "scraped", "processing"),
        defaultValue: "not_scraped"
    },
    people_status:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},{
    timestamps:false
});