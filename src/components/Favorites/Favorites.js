import React from 'react';
import { Card } from 'react-bootstrap';

function Favorites() {
  return (
    <div>
      <h2 className="text-center">Favorite List</h2>
      <Card style={{ width: '18rem', height: '100%' }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title className="text-align">Name</Card.Title>
          <Card.Text className="text-align">Date</Card.Text>
          <button className="button-align" type="button">
            <a href="/favorite/{user_id}">Event Details</a>
          </button>
          <button className="button-align" type="button">Remove</button>
        </Card.Body>
      </Card>
    </div>
  );
}

Favorites.propTypes = {};
Favorites.defaultProps = {};

export default Favorites;
