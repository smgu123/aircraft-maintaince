import React, { Component } from 'react'
import './CSS/todo.css'
import {NavBar} from 'react-bootstrap';
import ReactBootstrap from 'react-bootstrap';



class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            gender: "",


        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    genderhandler = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.firstName} ${this.state.lastName}  Registered Successfully !!!!`)
        console.log(this.state);
        this.setState({
            firstName: "",
            lastName: "",
            password: '',
            gender: "",
        })
     event.preventDefault()
        
    }
    


    render() {
        return (
            <div>
                 

                <form onSubmit={this.handleSubmit}>
                    <h1>LOGIN</h1>
                   
                    <label>Username :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="Username" /><br />
                    <label>Password :</label> <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password..." /><br />
                    
                    <input type="submit" value="Submit" />
                </form>

            </div>
            
        )
    }
}

export default Login