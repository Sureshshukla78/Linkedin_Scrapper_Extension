const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connection is stablished with MongoDb Atlas.");
}).catch((e)=>{
    console.log(`Error in connecting due to :${e}`)
});