import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import  Maintainer from './components/Maintainer';
import Admin from './components/Admin';
import Login from './components/Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';



const routing = (
    <Router>
      <div>
        <Route exact path="/"  component={App} />
        <Route exact path="/Maintainer" component={Maintainer} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/Login" component={Login} />
        {/* <NavRoute exactly component={Maintainer} pattern="/Maintainer" /> */}
      </div>
    </Router>
    
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



serviceWorker.unregister();