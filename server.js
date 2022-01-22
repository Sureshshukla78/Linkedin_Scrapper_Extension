const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();
// connecting mongoDB
require("./server/database/conn");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// load routers
app.use('/', require('./server/routes/router'));
// listening port
app.listen(port, ()=>{
    console.log(`server is runnning at ${port}`);
})