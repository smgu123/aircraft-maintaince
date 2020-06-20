const user = require('../mongo/model');
const mongo = require('mongoose');

const register = async (accountaddress,username, password)=> {
    console.log("first");
    return new Promise((resolve, reject) => {
        console.log("second");
        const db = "mongodb://https:localhost:27017/Maintainer";
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(async ()=>{
            console.log("Database Connected!!");
            const newuser =  new user({
                accountaddress: accountaddress,
                username: username,
                password: password,
        
            });
            newuser.save().then(item => resolve(item)).catch(err => reject(err));
        })
        .catch((error)=>{reject(error)});
    });
}

const login = (username, password) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise( async (resolve,reject) => {
       const db = "mongodb://https:localhost:27017/Maintainer";
       mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
       .then(async ()=>{
           console.log("Database Connected!!")
           const info = await user.findOne({username: username,password:password}).catch((error) => { reject(error) });
           if(!info)
              reject({response: "There is no member with such credentials!!!"});
          else{
                resolve({response:true});
          }
        })
    })

}

module.exports = { register: register, login: login }