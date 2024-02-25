import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="md" className="custom-nav-bg fixed-top">
        <Navbar.Brand expand="lg" href="#home">
          <Link to="/home">
            <img
              className="custom-nav-logo"
              src="logohero.png"
              alt="StatHero Logo"
              width="105px"
              height="50px"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="collapse navbar-collapse mr-auto justify-content-end">
          <Nav.Link className="custom-nav-text" href="#about">
            <Link to="/about">ABOUT</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="#stats">
            <Link to="/stats">STATS</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="#faqs">
            <Link to="/faq">FAQS</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="#contact">
            <Link to="/contact">CONTACT</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="#signup">
            <Button className="custom-nav-button">SIGN UP</Button>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="#login">
            LOGIN
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
