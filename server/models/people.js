const sequelize = require("../database/connection");
const Sequelize = require("sequelize");
module.exports = sequelize.define("people", {
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER(11),
    },
    url : {
        type: Sequelize.STRING,
        unique: true
    },
    name : {
        type: Sequelize.STRING,
    },
    status:{
        type: Sequelize.ENUM("not_scraped", "scraped", "processing"),
        defaultValue: "not_scraped"
    },
    company_id: {
        type: Sequelize.INTEGER(11)
    }
},{
    timestamps:false
});