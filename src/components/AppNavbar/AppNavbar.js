import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './AppNavbar.css';
import useAuth from '../../hooks/useAuth';

function AppNavbar() {
  const auth = useAuth();
  const navigate = useNavigate();

  function logout() {
    auth.logout();
    navigate('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            <Nav.Link as={Link} to="/event/1">Event</Nav.Link>
            <div className="logout-button">
              {auth.authed
                ? <Button onClick={() => logout()} className="ml-auto" variant="outline-danger">Logout</Button>
                : <Button as={Link} to="/login" className="ml-auto" variant="outline-success">Login</Button>}
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
