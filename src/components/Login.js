import React, { Component } from 'react'
import './CSS/todo.css'
import {NavBar} from 'react-bootstrap';
import ReactBootstrap from 'react-bootstrap';
import NavigationBar from './NavigationBar';


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Username: "",
            password: "",
            web3 : "",
            aircraftContract : "" 

        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

   
    Usernamehandler = (event) => {
        this.setState({
            Username: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleSubmit = async (event) => {
        let web3 = this.props.web3;
        let aircraftContract = this.props.contract;
      let accounts= await web3.eth.getAccounts()
      console.log("account"+accounts[0])
      
      if(this.state.role == "Maintainer"){
          let txn = await aircraftContract.methods.maintainersignup(this.state.Username,this.state.password).send({"from":accounts[0]});
          
          if(txn)
              window.alert("registered successfully as maintainer");
          else
            window.alert("registered unsuccessfull");
      }
    }
    
    render() {
        return (
            <center><div>
              

                <form onSubmit={this.handleSubmit}>
                    <h1>LOGIN</h1>
                   
                    <label>Username :</label> <input type="text" value={this.state.Username} onChange={this.Usernamehandler} placeholder="Username" /><br />
                    <label>Password :</label> <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password..." /><br />
                    
                    <input type="submit" value="Submit" />
                </form>

            </div>
            
            </center>
           
        )
    }
}

export default Login