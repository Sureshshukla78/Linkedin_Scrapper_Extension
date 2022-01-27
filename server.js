require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

console.log(`${__dirname + "./config"}`)


// connecting DB
const sequelize = require("./server/database/connection");

sequelize.sync().then(()=>{
    console.log("DB is Ready");
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//adding middlewares
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// load routers
app.use('/', require('./server/routes/router'));
// listening port
app.listen(port, ()=>{
    console.log(`server is runnning at ${port}`);
})