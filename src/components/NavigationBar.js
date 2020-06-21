import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { Admin } from './Admin';
import { Maintainer } from './Maintainer';
import { BrowserRouter as  Route, Link,Switch } from 'react-router-dom';
// import './bootstrap/dist/css/bootstrap.min.css';


const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 55%;
  }
`;
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">AIRCRAFT MAINTAINCE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
     
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/Maintainer">Maintainer</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/Admin">Admin</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Login">LOgin</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  </Styles>
)