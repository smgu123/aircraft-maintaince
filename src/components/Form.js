import React, { Component } from 'react'
import './CSS/todo.css'
import {NavBar} from 'react-bootstrap';
import ReactBootstrap from 'react-bootstrap';
import Maintainer from './Maintainer';
import './CSS/form.css'
import axios from 'axios';
import Web3 from 'web3';


class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // web3 : "",
            aircraftContract : "" ,
            Accountaddress: "",
            Username: "",
            password: "",
            role: ""

        }
        this.handleSubmit=this.handleSubmit.bind(this)
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
        console.log("account1");
        let aircraftContract = this.props.contract;
        console.log("account2");
        let Accountaddress = this.state.Accountaddress;
        console.log("account3");
        let Username = this.state.Username;
        let password = this.state.password;
       let web3 = new Web3(window.web3.currentProvider);
      let accounts= await web3.eth.getAccounts() ;
     
      console.log("account"+this.state.role+typeof(this.state.role))
      
      if(this.state.role == "Maintainer"){
          console.log("m1");
          let txn = await aircraftContract.methods.maintainersignup(this.state.Accountaddress,this.state.Username).send({"from":accounts[0]});
          
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
                let txn = await aircraftContract.methods.Adminsignup(this.state.Accountaddress,this.state.Username).send({"from":accounts[0]});
                
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