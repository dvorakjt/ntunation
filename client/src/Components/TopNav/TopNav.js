//import react
import React, { useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

//import react-bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

//import API Util
import API from '../../Utils/API';

//import custom stylesheet
import './style.css';

//import the logo
import ntunationLogo from '../../Images/ntunation-icon.png';

//require axios!
const axios = require('axios');

function TopNav(props) {
    const location = useLocation();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onClick = e => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        //make sure the inputs are not empty
        if (email && password) {
            axios.post('/login', { email, password })
                .then((result) => {
                    localStorage.setItem('jwtToken', result.data.token);
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
                    axios.get(`/api/user/${email}`)
                        .then(res => {
                            console.log(res);
                            /*here we should get the user's info and set the global state equal to it. then redirect
                    the user to the dashboard page, which always takes the global user state as props.
                    alternatively, the page could be reloaded. The '/' route could use a switch statement to redirect the
                    user to the homepage or their dashboard depending on the login state.
                    */
                        })
                        .catch((error) => {
                            if (error.response.status === 401) {
                                console.log(error);
                            }
                        });
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        this.setState({ message: 'Login failed. Username or password not match' });
                    }
                });
        }
    }

    return (
        <Navbar className="color-nav" variant="dark" expand="lg">
            <Navbar.Brand href="#" id="brand">
                <img src={ntunationLogo} width="65px" height="65px" />
                <span>NTunation</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <li className="nav-item">
                        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Home
                        </Link>
                    </li>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <NavDropdown title="Sample Exercises" id="exercises-dropdown">
                        <Link to="/sampleexercises/introduction" className="dropdown-item">Introduction
                        </Link>
                        <Link to="/sampleexercises/unisons" className="dropdown-item">Unisons
                        </Link>
                        <Link to="/sampleexercises/octaves" className="dropdown-item">Octaves
                        </Link>
                        <Link to="/sampleexercises/intervals" className="dropdown-item">Intervals
                        </Link>
                        <Link to="/sampleexercises/scales" className="dropdown-item">Scales
                        </Link>
                        <Link to="/sampleexercises/chords" className="dropdown-item">Chords
                        </Link>
                        <Link to="/sampleexercises/melody" className="dropdown-item">Melody
                        </Link>
                    </NavDropdown>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <Nav.Link href="#">Contact us</Nav.Link>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <Nav.Link href="#">Shout-outs!</Nav.Link>
                    <Form inline>
                        <FormControl ref={emailRef} type="email" placeholder="musician@ntunation.com" className="mr-sm-2" />
                        <FormControl ref={passwordRef} type="password" placeholder="password123" className="mr-sm-2" />
                        <Button variant="outline-light" onClick={onClick}>Login</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNav;