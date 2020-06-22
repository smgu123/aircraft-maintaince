// const express = require('express');
// require('dotenv').config();
const mongo = require('mongoose');
// const router = new express.Router();
// const md5 = require('md5');
const multer = require('multer');
// const storage = multer.memoryStorage();


// const bodyParser = require("body-parser");
const control = require('./controller/user');
// const request = require('request');
// const jwt = require('jsonwebtoken');
// const gov = require('../controller/government');
// const sp = require('../controller/serviceprovider')
// const def = require('../config/default');

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host:"ipfs.infura.io", port: 5001, protocol: 'https' });
const truffleContract = require('truffle-contract');
const Web3 = require('web3');
const aircraft = require('../abis/Aircraft.json')




module.exports = (app) => {
    let upload  = multer({ storage: multer.memoryStorage() });
    app.post('/ipfs_upload',upload.single('file'),async (req, res)=>{
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));


        const contract = truffleContract(aircraft);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();
   maintainer_address =req.body.maintainer_address
   
    
        // let file = req.file.buffer;
        console.log("hii"+maintainer_address)

        try {
            let ipf_res = await ipfs.files.add(req.file.buffer);
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
                res.send(ipf_res[0].hash)
                // let cipherString=CryptoJS.AES.encrypt(ipf_res[0].hash, secret).toString()
                // // const cipherString = CryptoJS.enc.Hex.stringify(appIde.ciphertext);
                // console.log(cipherString);
                // console.log(typeof(cipherString))
              
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
       res.send(req.file.filename);
    });

app.post("/api/store",async(req,res)=>{

        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));


        const contract = truffleContract(aircraft);
    contract.setProvider(web3.currentProvider);
    let hashId=req.body.hashId
    const instance = await contract.deployed();
   let maintainer_address =req.body.maintainer_address
   const store =  await instance.addFile(hashId,{from:maintainer_address}) 

   if(store)
   res.send("successfully stored in blockchain")
   else
   res.send("no hash")

    })
    

app.post('/api/registration',async (req, res) => {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    let accounts= await web3.eth.getAccounts();
    if(req.body.password){
        // eslint-disable-next-line no-unused-vars
        const info = await control.register(req.body.maintainer_address,req.body.username, req.body.password,req.body.role).catch((error) => {
            res.send({
                response: "The records have not been added, some errors have occurred",
                error: error
            });
        });
        if (info){
            var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

                const contract = truffleContract(aircraft);
                contract.setProvider(web3.currentProvider);
            const instance = await contract.deployed();
            let maintainer_address =req.body.maintainer_address;
            let admin_address = req.body.admin_address;
            if(req.body.role="Maintainer"){
            const register= await instance.maintainersignup(req.body.username,req.body.age,{from:maintainer_address})
            res.send({"response":{"Statuscode":200,"name":"Success","message":"Ok","code":"Maintainer has Registered"}});

            }if(req.body.role="Admin"){
                const registeration= await instance.Adminsignup(req.body.username,{from:admin_address})
                res.send({"response":{"Statuscode":200,"name":"Success","message":"Ok","code":"Admin has registered"}});

                }

        }
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


app.post('/api/ipfs_file', async (req, res)=>{
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    const contract = truffleContract(aircraft);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();
   let maintainer_address =req.body.maintainer_address
   let hash = req.body.hash
   
    console.log("maintainer_address"+maintainer_address)
    console.log("hashes"+hash)
    const ipf_res = await ipfs.files.get(hash);

    try {
        if(ipf_res && ipf_res[0]) {
            // console.log(ipf_res[0].path)
            // console.log(ipf_res[0].content.toString('utf8'));
            const content = ipf_res[0].content;
  
            // console.log(dec.toString('utf8'))

            res.send(content)    
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

app.post("/api/grantAccessToAdmin",async (req, res)=>{
    let maintainer_address =req.body.maintainer_address;
    let admin_address =req.body.admin_address;
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    const contract = truffleContract(aircraft);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();

    const access=await instance.grantAccessToAdmin(admin_address,{from:maintainer_address})

    if(access){
        req.send("access granted")
    }

    else{
        res.send("access denied")
    }

})

app.post('/files_info',  async (req, res)=>{
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    let admin_address = admin_address;
    const contract = truffleContract(aircraft);
    contract.setProvider(web3.currentProvider);
    const instance = await contract.deployed();
    // const { role , maintainer_address } = res.locals.decoded;
    let { role, file_list , maintainer_address } = req.body;
    console.log("maintainer_address"+file_list)


    //const { patient_address, address, file_list, role } = req.body;
    let fetchFileInfo;
    if(role == "Admin") {
        fetchFileInfo = file_list.map(async (fileHash) => {
            // let accounts= await web3.eth.getAccounts()
            console.log(fileHash+"   ss   "+getIpfsHashFromBytes32(fileHash)  );
            return await instance.getmaintainerInfoForAdmin(maintainer_address,{from:admin_address})
        });
        Promise.all(fetchFileInfo).then((result) => {
            res.send(result);
        });
    }
    else if(role == "Maintainer"){
        // console.log("file list"+file_list)
        fetchFileInfo = file_list.map(async (fileHash) => {
            console.log("filehas"+fileHash)
           return await instance.getFileInfomaintainer(maintainer_address,fileHash,{from:maintainer_address})
        });
        
        Promise.all(fetchFileInfo).then((result) => {
            // console.log(result);
            res.send(result);
        }).catch((err) => {
            console.log("error.....");
            console.log(err);
        });
    }
    else
    res.send([]);
});

}


