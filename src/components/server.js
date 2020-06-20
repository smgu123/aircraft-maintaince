const express = require('express');
const bodyParser = require("body-parser");


const userrouter = require('./route');

const port = process.env.PORT || 4200

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./route')(app);


app.listen(port, () => {
    console.log("Server running on port " + port);
});

