import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import './User.css';

import {
  // Button,
  Col,
  // Container,
  // Form,
  Row,
  Card,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

function User() {
  const auth = useAuth();
  // const [userId, setUserId] = useState([]);
  // const [userUsername, setUserUsername] = useState([]);
  // const [userEmail, setUserEmail] = useState([]);

  function userInfo() {
    fetch(`${process.env.REACT_APP_DOMAIN}/profile`, { headers: auth.headers() })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  useEffect(() => { userInfo(); }, []);

  return (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      <Row>
        <Col>
          <h1 className="text-center">Profile Page</h1>
          <Card className="user-card" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title><h4>Personal Information</h4></Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>User ID:</ListGroupItem>
              {/* <p>{userId}</p> */}
              <ListGroupItem>Email:</ListGroupItem>
              <ListGroupItem>Username: </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">...</Card.Link>
              <Card.Link href="#">...</Card.Link>
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
