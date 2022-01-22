const mongoose = require("mongoose");

const companyDetailsSchema = new mongoose.Schema({
    description : {
        type: String,
    },
    website : {
        type: String,
    },
    domain :{
        type: String,
    },
    employeeSize:{
        type:Number,
    },
    followers : {
        type: Number,
    },
    company_id :{
        type: String,
        required: true
    },
    headquarter:{
        type:String,
    },
});

const companyDet = new mongoose.model("companyDetails", companyDetailsSchema);

module.exports = companyDet;