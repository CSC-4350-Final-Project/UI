import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import EventCard from './components/EventCard/EventCard';

function App() {
  const [events, setEvents] = useState([]);
  async function getHomePageEvents() {
    setEvents([]);
    const res = await (await fetch(`${process.env.REACT_APP_DOMAIN}/homepage`)).json();
    setEvents(res._embedded.events);
  }

  useEffect(() => {
    getHomePageEvents();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-3 text-center">
          <h2>Upcoming Events</h2>
        </Col>
      </Row>
      <Row>
        <Col style={{ gap: '25px' }} className="d-flex flex-row flex-wrap">
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

export default App;
