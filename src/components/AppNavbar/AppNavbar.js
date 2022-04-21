import React from 'react';
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
    navigate('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a className="brand-name" href="/">Event Planner</a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="nav-links" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="nav-links" as={Link} to="/search">Search</Nav.Link>
            <Nav.Link className="nav-links" as={Link} to="/favorites/{user_id}">Favorites</Nav.Link>
            <Nav.Link className="nav-links" as={Link} to="/user/{user_id}">
              Profile
            </Nav.Link>
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
