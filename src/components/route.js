const express = require('express');
const mongo = require('mongoose');
// const router = new express.Router();
// const md5 = require('md5');
const bodyParser = require("body-parser");
const control = require('./controller/user');
// const request = require('request');
// const jwt = require('jsonwebtoken');
// const gov = require('../controller/government');
// const sp = require('../controller/serviceprovider')
// const def = require('../config/default');

module.exports = (app) => {

app.post('/api/registration',async (req, res) => {
    if(req.body.password){
        // eslint-disable-next-line no-unused-vars
        const info = await control.register(req.body.accountaddress,req.body.username, req.body.password).catch((error) => {
            res.send({
                response: "The records have not been added, some errors have occurred",
                error: error
            });
        });
        res.send({"response":{"Statuscode":200,"name":"Success","message":"Ok","code":"records have been added successfully"}});
    }
    else{
        res.send({"error":{"Statuscode":401,"name":"error","message":"Unauthorized","code":"The Password don't match"}});
    }
    mongo.connection.close();
});

app.post('/api/login', async (req, res) => {
    const token = await control.login(req.body.username, req.body.password).catch((error)=>{res.json(error);})
    // res.send({token: token});
    if(token){
        res.send({"response":{"Statuscode":200,"name":"Success","message":"Ok","code":"records have been added successfully"}})
    }
    else{
        res.send({"error":{"Statuscode":401,"name":"error","message":"Unauthorized","code":"The Password don't match"}})
    }
    
    mongo.connection.close();
});
}

