//import react
import React from 'react';
import { Link, useLocation } from "react-router-dom";

//import react-bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//import custom stylesheet
import './style.css';

//import the logo
import ntunationLogo from '../../Images/ntunation-icon.png';

function TopNav() {
    const location = useLocation();

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
                    <Nav.Link target="_blank" href="https://play.google.com/store/apps">Get the app</Nav.Link>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <Nav.Link href="#">Contact us</Nav.Link>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <Nav.Link href="#">Shout-outs!</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNav;