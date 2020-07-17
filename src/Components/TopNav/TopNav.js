//import react
import React from 'react';

//import react-bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//import custom stylesheet
import './style.css';

//import the logo
import ntunationLogo from '../../Images/ntunation-icon.png';

function TopNav() {
    return (
        <Navbar className="color-nav" variant="dark" expand="lg">
            <Navbar.Brand href="#" id="brand">
                <img src={ntunationLogo} width="65px" height="65px" />
                <span>NTunation</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Navbar.Text className="hideMe">/</Navbar.Text>
                    <NavDropdown title="Sample Exercises" id="exercises-dropdown">
                        <NavDropdown.Item className="ddItem" href="#">Introduction</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Unisons</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Octaves</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Intervals</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Scales</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Chords</NavDropdown.Item>
                        <NavDropdown.Item className="ddItem" href="#">Melody</NavDropdown.Item>
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