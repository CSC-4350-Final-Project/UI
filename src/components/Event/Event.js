import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Event.css';
import EventActions from './EventActions/EventActions';
import EventComments from './EventComments/EventComments';
import EventInfo from './EventInfo/EventInfo';

function Event() {
  const params = useParams();
  const auth = useAuth();
  const [event, setEvent] = useState();
  const [comments, setComments] = useState();

    function goingChanged() {
    // console.info(`Updating going status to: ${change}`);
    }

    function shareEvent() {
    // console.info('Sharing an event!');
    // share event fetch call goes here
    }

    function favoriteEvent() {
    // console.info('Hit favorite on an event!');
    // favorite event fetch call goes here
    }

  async function getEvent() {
    const eventId = params.id;
    const fetchedEvent = await (await fetch(`${process.env.REACT_APP_DOMAIN}/event_detail/${eventId}`)).json();
    setEvent(fetchedEvent);
  }

  async function getComments() {
    const eventId = params.id;
    const fetchedComments = await (await fetch(`${process.env.REACT_APP_DOMAIN}/event/${eventId}/comment`)).json();
    setComments(fetchedComments);
  }

  async function submitComment(comment) {
    const eventId = params.id;
    await (await fetch(`${process.env.REACT_APP_DOMAIN}/event/${eventId}/comment`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    })).json();

    await getComments();
  }

  useEffect(() => {
    getEvent();
    getComments();
  }, []);

  return (
    <Container>
      <EventInfo event={event} />
      <EventActions
        event={event}
        shareEvent={() => shareEvent()}
        favoriteEvent={() => favoriteEvent()}
        goingChanged={() => goingChanged()}
      />
      <EventComments
        event={event}
        comments={comments}
        submitComment={(comment) => submitComment(comment)}
        showLeaveComment={auth.authed}
      />

        </Container>
    );
}

export default Event;
