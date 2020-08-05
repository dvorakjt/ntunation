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

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

//import custom stylesheet
import './style.css';

//import the logo
import ntunationLogo from '../../Images/ntunation-icon.png';

//require axios!
const axios = require('axios');

function TopNav(props) {
    //hook into global user store
    const [state, dispatch] = useUserStoreContext();

    const location = useLocation();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onLogout = e => {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('lsUser');
        dispatch({
            type: "LOGOUT"
        });
    }

    const onLogin = e => {
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
                            console.log(res.data);
                            const user = res.data;
                            //convert the user data to a string & save to local storage so that it persists upon refresh
                            const lsUser = JSON.stringify(user);
                            localStorage.setItem('lsUser', lsUser);
                            dispatch({
                                type: "LOGIN",
                                user: user
                            });
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
                    console.log(error);
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
                    {(() => {
                        if (!state.loggedIn) {
                            return (
                                <>
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
                                </>
                            )
                        }
                    })()}
                    {(() => {
                        if (!state.loggedIn) {
                            return (
                                <Form inline>
                                    <FormControl ref={emailRef} type="email" placeholder="musician@ntunation.com" className="mr-sm-2" />
                                    <FormControl ref={passwordRef} type="password" placeholder="password123" className="mr-sm-2" />
                                    <Button variant="outline-light" onClick={onLogin}>Login</Button>
                                </Form>
                            )
                        } else {
                            return (
                                <>
                                    <Navbar.Text>{`Welcome, ${state.user.nickname}`}</Navbar.Text>
                                    <Button variant="outline-light" onClick={onLogout}>Logout</Button>
                                </>
                            )
                        }
                    })()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNav;