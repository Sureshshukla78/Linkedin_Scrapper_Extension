const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    url :{
        type: String,
        unique: true,
    },
    name:{
        type: String
    },
    company_id : {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum:["not_scraped", "scraped", "processing",],
        default: "not_scraped",
    }
});

const people = new mongoose.model("people", peopleSchema);

module.exports = people;