import React, { Component } from 'react'
import './CSS/todo.css'
import {NavBar} from 'react-bootstrap';
import ReactBootstrap from 'react-bootstrap';
import Maintainer from './Maintainer';
import './CSS/form.css'
import axios from 'axios';
import Web3 from 'web3';
import Aircraft from '../abis/Aircraft.json'


class Form extends Component {
    constructor(props) {
        super(props)
        this.Aircraft=''
        this.handleSubmit=this.handleSubmit.bind(this)

    }

        state = {
            // web3 : "",
            aircraftContract : "" ,
            Accountaddress: "",
            Username: "",
            password: "",
            role: ""

        }
   

    async componentWillMount(){
        await this.loadweb3()
        await this.loadBlockchainData()
       
       }
    
      async loadweb3(){
    
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
       
              // Request account access if needed
              await window.ethereum.enable();
         
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          // Acccounts always exposed
          this.setState({web3:window.web3})
      }
    
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      }
    
      async loadBlockchainData(){
        let web3= window.web3;
    
        let accounts= await web3.eth.getAccounts()
        console.log(accounts)
          this.setState({
            account1:accounts[0],
            account2:accounts[1]
          })
     
          let networkId= await web3.eth.net.getId()
          console.log("network id"+networkId)
          let networkDataAircraft=Aircraft.networks[networkId]
          console.log(networkDataAircraft)
          if(networkDataAircraft){
            console.log(Aircraft.abi)
            let aircraft=web3.eth.Contract(Aircraft.abi,networkDataAircraft.address)
    
    
            this.Aircraft=aircraft
            console.log("ASsas"+this.Aircraft)
          }
        }
    
    Accountaddresshandler = (event) => {
        console.log("accountaddresshandler");
        this.setState({
            Accountaddress: event.target.value
        })
    }
    Usernamehandler = (event) => {
        console.log("usernamehandler");
        this.setState({
            Username: event.target.value
        })
    }
    passwordhandler = (event) => {
        console.log("passwordhandler");
        this.setState({
            password: event.target.value
        })
    }

    rolehandler = (event) => {
        console.log("handlerrole");
        this.setState({
           role: event.target.value
        })
    }

    handleSubmit = async (event) => {
        // let web3 = this.props.web3;
        let web3= window.web3;
    
        let accounts= await web3.eth.getAccounts()
        console.log(accounts)
          this.setState({
            account1:accounts[0],
            account2:accounts[1]
          })
     
          let networkId= await web3.eth.net.getId()
          console.log("network id"+networkId)
          let networkDataAircraft=Aircraft.networks[networkId]
          console.log(networkDataAircraft)
          let aircraft;
          if(networkDataAircraft){
            console.log(Aircraft.abi)
            aircraft=web3.eth.Contract(Aircraft.abi,networkDataAircraft.address)
          }
       
        let Accountaddress = this.state.Accountaddress;
        console.log("account3");
        let Username = this.state.Username;
        let password = this.state.password;
       
     
      console.log("Sdasd"+this.Aircraft)
      
      if(this.state.role == "Maintainer"){
       

          let txn = await aircraft.methods.maintainersignup(this.state.Accountaddress,this.state.Username).send({"from":accounts[0]});
          
          if(txn){
              window.alert("registered successfully as maintainer");
              let body = {Accountaddress,Username,password};     
              axios.post('http:localhost:4200/api/registration',body) .then((response) => {
                  if (response){
                      window.alert("data is stored in database")
                  } 
                  else{
                     window.alert("data is not stored in database")
                  }
          })
          }
          else
            window.alert("registered unsuccessfull");

            if(this.state.role == "Admin"){
                let txn = await aircraft.methods.Adminsignup(this.state.Accountaddress,this.state.Username).send({"from":accounts[0]});
                
                if(txn)
                    window.alert("registered successfully as maintainer");
                else
                  window.alert("registered unsuccessfull");
      }
    }
}


    render() {
        return (
            <div className ="register">
                 

                <form onSubmit={this.handleSubmit}>
                    <h1>User Registration</h1>
                    <label>Account Address :</label> <input type="text" value={this.state.Accountaddress} onChange={this.Accountaddresshandler} placeholder="Account Address..." /><br />
                    <label>Username :</label> <input type="text" value={this.state.Username} onChange={this.Usernamehandler} placeholder="Username" /><br />
                    <label>Password :</label> <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password..." /><br />
                    <label>Role :</label> <input type="text" value={this.state.role} onChange={this.rolehandler} placeholder="Role" /><br />

                    <input type="submit" value="Submit" />
                </form>

            </div>
            
        )
    }
}

export default Form
