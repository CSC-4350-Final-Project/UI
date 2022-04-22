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
      <Row className="mt-3 bg-light rounded p-2 shadow-sm">
        <Col xs={12} className="mt-3 text-center">
          <h5>What is this?</h5>
        </Col>
        <Col xs={12} className="text-center mx-auto" style={{ maxWidth: '600px' }}>
          This app is called Event Planner!
          It allows users to search for and share upcoming events around them!
        </Col>
        <Col xs={12} className="mt-3 text-center">
          <h5>Why?</h5>
        </Col>
        <Col xs={12} className="text-center mx-auto" style={{ maxWidth: '600px' }}>
          This app was built as a final group project for CSC4350 at Georgia State University!
          This app implements many of the techniques that we learned in this class including
          Python servers, React/JavaScript front-ends, Code style, linting, and many more!
          Event Planner took a lot of effort from our team,
          and we are very proud of how it turned out!
        </Col>
        <Col xs={12} className="mt-3 text-center">
          <h5>How?</h5>
        </Col>
        <Col xs={12} className="text-center mx-auto" style={{ maxWidth: '600px' }}>
          Event planner uses a React front-end and a Flask server as a backend.
          It is running on Heroku.
        </Col>
        <Col xs={12} className="mt-3 text-center">
          <h5>Who built it?</h5>
        </Col>
        <Col xs={12} className="text-center mx-auto" style={{ maxWidth: '600px' }}>
          This app was built by four team members:
          <div className="mt-2">Facundo Figueroa</div>
          <div>Chris Mai</div>
          <div>Bingyi Xie</div>
          <div>Mattios Elias</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-3 text-center">
          <h3>Look at some upcoming events below!</h3>
        </Col>
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
