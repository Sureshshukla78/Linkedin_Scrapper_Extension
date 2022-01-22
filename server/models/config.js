const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    company_letter :{
        type: String,
    },
    page:{
        type: Number,
    }
});

const config = new mongoose.model("config_table", configSchema);



module.exports = config;