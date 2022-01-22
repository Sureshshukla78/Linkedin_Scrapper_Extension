const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    url :{
        type: String,
        unique: true,
    },
    name:{
        type: String,
    },
    status : {
        type: String,
        enum:["not_scraped", "scraped", "processing",],
        default: "not_scraped",
    },
    people_status : {
        type : Number,
        default: 0
    }
});

const company = new mongoose.model("company", companySchema);

module.exports = company;