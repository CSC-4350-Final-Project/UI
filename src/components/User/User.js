import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './User.css';
import {
  Col,
  Row,
  Card,
  Button,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function User() {
  const auth = useAuth();
  const [id, setId] = useState([]);
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);

  function userInfo() {
    fetch(`${process.env.REACT_APP_DOMAIN}/profile`, { headers: auth.headers() })
      .then((response) => response.json())
      .then((data) => {
        setId(data.user_id); setUsername(data.username); setEmail(data.email);
      });
  }
  useEffect(() => { userInfo(); }, []);

  return (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      <Row>
        <Col>
          <h2 className="text-center">Profile Page</h2>
          <Card className="user-card" style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title><h3>Personal Information</h3></Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>User ID:&nbsp;</b>
                {id}
              </ListGroupItem>
              <ListGroupItem>
                <b>Email:&nbsp;</b>
                {email}
              </ListGroupItem>
              <ListGroupItem>
                <b>Username:&nbsp;</b>
                {username}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button as={Link} to="/">Close</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

User.propTypes = {};
User.defaultProps = {};

export default User;
