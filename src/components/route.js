const express = require('express');
const mongo = require('mongoose');
// const router = new express.Router();
// const md5 = require('md5');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require("body-parser");
const control = require('./controller/user');
// const request = require('request');
// const jwt = require('jsonwebtoken');
// const gov = require('../controller/government');
// const sp = require('../controller/serviceprovider')
// const def = require('../config/default');
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: process.env.IPFS_HOST, port: process.env.IPFS_PORT, protocol: 'https' });
const truffleContract = require('truffle-contract');
const Web3 = require('web3');
const healthRecord = require('../src/abis/HealthCare.json')


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

app.post('/ipfs_upload', upload.single('file'),async (req, res)=>{
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    let accounts = await web3.eth.getAccounts;
    client_address = accounts[0]
    let { secret } = req.headers;
    let file = req.file.buffer;
    console.log("hii"+req.file)
    let cipher = crypto.createCipher('aes-256-ctr',secret)
    let crypted = Buffer.concat([cipher.update(req.file.buffer),cipher.final()]);

    try {
        let ipf_res = await ipfs.files.add(crypted);
        console.log("as")
        // Upload buffer to IPFS
        // console.log("encrypt "+secret);
        if(ipf_res && ipf_res[0]) {
            console.log("jash"+typeof(ipf_res[0].hash))
            let url = `https://ipfs.io/ipfs/${ipf_res[0].hash}`
            console.log(`Url --> ${url}`);
            // let appIde = await cryptography.encrypt({
            //     key: ipf_res[0].hash ,
            //     data: secret
            // })
            // let cipherString=CryptoJS.AES.encrypt(ipf_res[0].hash, secret).toString()
            // // const cipherString = CryptoJS.enc.Hex.stringify(appIde.ciphertext);
            // console.log(cipherString);
            // console.log(typeof(cipherString))
            res.send(ipf_res[0].hash)

            //QmdSbx8C2zAQm6N3cSUoQdF7AhHaBE6eVHA4UrbUvF1mjD
        }
    // let testFile = fs.readFileSync('/home/vishnuskrishnan/demo.text' );
    //Creating buffer for ipfs function to add file to the system
    // let testBuffer = new Buffer(testFile);

    else {
            console.log("ipf upload error.....");
            res.send("");
        }
        //res.send('QmdSbx8C2zAQm6N3cSUoQdF7AhHaBE6eVHA4UrbUvF1mjD');
    }
    catch(error) {
        console.log(error);
        res.send("");
    }
   //res.send(req.file.filename);
});

app.get('/ipfs_file', verify_token, async (req, res)=>{
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    const contract = truffleContract(healthRecord);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();
    const { role , client_address } = res.locals.decoded;
    const { file_name, hash, patient_address } = req.query;
    console.log("client_address"+client_address)
    console.log("hashes"+hash)
    const ipf_res = await ipfs.files.get(hash);

    try {
        if(ipf_res && ipf_res[0]) {
            // console.log(ipf_res[0].path)
            // console.log(ipf_res[0].content.toString('utf8'));
            const content = ipf_res[0].content;
            const secret = await instance.getFileSecret(hash, role, client_address, patient_address);
            //const secret = await getWeb3Obj().getHealthCare().getFileSecret.sendTransaction(hash, role, client_address, patient_address,{"from":getWeb3Obj().getWeb3().eth.accounts[0]});
            // console.log("decrypt "+secret);
            const decipher = crypto.createDecipher('aes-256-ctr',secret);
            const dec = Buffer.concat([decipher.update(content) , decipher.final()]);
            console.log(dec.toString('utf8'))

            res.send(dec.toString('utf8'))
            
        }
        else {
            console.log("ipf fetch error.....");
            res.send("error");
        }
    }
    catch(error) {
        console.log(error);
        res.send("error");
    }
});

app.post('/files_info', verify_token, async (req, res)=>{
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    const contract = truffleContract(healthRecord);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();
    // const { role , client_address } = res.locals.decoded;
    let { role, file_list , client_address,patient_address } = req.body;
    console.log("client_address"+file_list)


    //const { patient_address, address, file_list, role } = req.body;
    let fetchFileInfo;
    if(role == "doctor") {
        fetchFileInfo = file_list.map(async (fileHash) => {
            let accounts= await web3.eth.getAccounts()
            console.log(fileHash+"   ss   "+getIpfsHashFromBytes32(fileHash)  );
            return await instance.getFileInfoDoctor(client_address,patient_address,fileHash,{from:accounts[0]})
        });
        Promise.all(fetchFileInfo).then((result) => {
            res.send(result);
        });
    }
    else if(role == "patient"){
        // console.log("file list"+file_list)
        fetchFileInfo = file_list.map(async (fileHash) => {
            console.log("filehas"+fileHash)
           return await instance.getFileInfoPatient(client_address,fileHash,{from:client_address})
        });
        
        Promise.all(fetchFileInfo).then((result) => {
            // console.log(result);
            res.send(result);
        }).catch((err) => {
            console.log("errrrrror.....");
            console.log(err);
        });
    }
    else
    res.send([]);
});

}



