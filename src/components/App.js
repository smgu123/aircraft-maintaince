import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import { Maintainer } from './Maintainer';
// import { Admin } from './Admin';


import Web3 from 'web3';
// import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch,HashRouter } from "react-router-dom";
import { NavigationBar } from './NavigationBar';
import Aircraft from '../abis/Aircraft.json'
import Form from './Form.js'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


const Maintainer = React.lazy(() => import('./Maintainer'));
const Admin = React.lazy(() => import('./Admin'));

class App extends Component {


state = {
  web3 : "",
  aircraftContract : "" 
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
      if(networkDataAircraft){
        console.log(networkId)
        let aircraft=web3.eth.Contract(Aircraft.abi,networkDataAircraft.address)
        console.log(networkDataAircraft.address)
        this.setState({aircraftContract : aircraft})
      }
    }

    async registermaintainer(type) {
      let { healthRecord, web3 } = this.state;
      let accounts= await web3.eth.getAccounts()
      console.log("account"+accounts[0])
      
      if(this.state.doctorName){
          let txn = await healthRecord.methods.doctorSignUp(this.state.doctorName).send({"from":accounts[0]});
          
          if(txn)
              window.alert("registered successfully as maintainer");
          else
            window.alert("registered unsuccessfull");
      }
  }

  render() {
    
    return (
      <div className="App">
         
         
         <React.Fragment>
          <Router>
           <NavigationBar />
          </Router>
          </React.Fragment>
         
         
    <Form web3 = {this.state.web3} contract = {this.state.aircraftContract}/>
    {/* <Login web3 = {this.state.web3} contract = {this.state.aircraftContract}/> */}
    
      </div>
    );
  }
}

export default App;
