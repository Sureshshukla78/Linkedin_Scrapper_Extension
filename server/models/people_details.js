const mongoose = require("mongoose");

const peopleDetailsSchema = new mongoose.Schema({
    email : {
        type: String,
    },
    number : {
        type: Number,
    },
    position :{
        type: String,
    },
    website_link :{
        type:String,
    },
    experience : {
        type: Number,
    },
    people_id :{
        type: String,
        required: true
    },
});

const peopleDet = new mongoose.model("peopleDetails", peopleDetailsSchema);

module.exports = peopleDet;