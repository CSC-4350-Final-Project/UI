import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import EventCard from '../EventCard/EventCard';

function Favorites() {
  const auth = useAuth();
  const [events, setEvents] = useState([]);

  async function getFavorites() {
    const fetchedFavorites = await (await fetch(`${process.env.REACT_APP_DOMAIN}/favorites`, {
      headers: auth.headers(),
    })).json();

    setEvents(fetchedFavorites);
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-3 text-center">
          <h2>Favorited Events</h2>
        </Col>
      </Row>
      <Row>
        <Col style={{ gap: '25px' }} className="d-flex flex-row flex-wrap">
          {events.length === 0 && (
            <div className="mx-auto">
              You have not favorited any events!
            </div>
          )}
          {events.map((event, index) => (
            <EventCard
              key={index}
              id={event.id}
              image={event.images[0].url}
              name={event.name}
              date={event.dates.start.dateTime}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

Favorites.propTypes = {};
Favorites.defaultProps = {};

export default Favorites;
