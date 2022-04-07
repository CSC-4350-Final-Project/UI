import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppNavbar.css';

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            {/* I think this will be removed once we have actual events,
            now it's there just for testing */}
            <Nav.Link as={Link} to="/event/1">Event</Nav.Link>
            <div className="logout-button">
              <Button className="ml-auto" variant="outline-danger">Logout</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {};

AppNavbar.defaultProps = {};

export default AppNavbar;
