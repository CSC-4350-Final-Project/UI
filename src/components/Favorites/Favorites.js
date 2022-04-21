import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

function Favorites() {
  const auth = useAuth();

  function getFavorites() {
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites`, {
      method: 'GET',
      headers: auth.headers(),
      header: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
      .then(() => {});
  }
  useEffect(() => { getFavorites(); }, []);

  function removeFavorite() {
    // this function removes the event from the Favorite page/database
  }

  function shareEvent() {
    // this function lets the user share event in favorited events
  }

  return (
    <div>
      <h3 className="text-center">Favorite List</h3>
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map(() => (
          <Col>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Event Title</Card.Title>
                <Card.Text>
                  Some text
                </Card.Text>
              </Card.Body>
              <button onClick={() => removeFavorite()} className="button-align" type="button">Remove</button>
              <button onClick={() => shareEvent()} className="button-align" type="button">Share</button>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
}

Favorites.propTypes = {};
Favorites.defaultProps = {};

export default Favorites;
