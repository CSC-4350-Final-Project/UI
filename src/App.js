import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Card,
} from 'react-bootstrap';
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
    <div>
      <h2 className="wrapper">
        Welcome to Event Planner

      </h2>

      <Card className="wrapper">
        <Card.Title>Functionalities</Card.Title>
        <Card.Body>
          <Card.Header>Organize/Search/Comment/Favorite/Save/Share Events</Card.Header>
          <Card.Text>
            This app allows you to organize events based on the upcoming events
            in the Atlanta area.
            It also lets you search for a particular event by keywords and zipcode.
            Each event in this app has an Event Detail button
            that shows the event location,
            its date/time and type.
            Inside the details, it allows you to comment your thoughts
            and see other user thoughts for the event.
            Additionally, there are 2 buttons for you to save a particular event to Favorites
            and Share the event with anybody using an email address.
            Especially, having these functionality requires you to have an account with the app.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="wrapper">
        <Card.Title>Why it matters?</Card.Title>
        <Card.Body>
          <Card.Header>Organized/Convenient</Card.Header>
          <Card.Text>
            This app is very user-friendly that almost anybody knows how to use. It organizes
            everything of an event at one place that has corresponding details to
            decide going to the
            or not by looking at past people comments about it, then invite
            friends to come with you by email sharing.
            In the future, we will have a phone-sharing feature for inviting on the go.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="wrapper">
        <Card.Title>Developers</Card.Title>

        <Card.Body>
          <Card.Header>Chris Mai</Card.Header>
          <Card.Header>Facundo Figueroa</Card.Header>
          <Card.Header>Mattios Elias</Card.Header>
          <Card.Header>Bingyi Xie</Card.Header>

        </Card.Body>
      </Card>

      <Container>
        <Row>
          <Col className="mt-3 text-center">
            <h3 className="text-center">Upcoming events</h3>
          </Col>
        </Row>
        <Row>
          (
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
          )
        </Row>

      </Container>
    </div>
  );
}

export default App;
