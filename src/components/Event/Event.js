import React from 'react';
import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import event from './dummy-event';
import './Event.css';
import EventActions from './EventActions/EventActions';
import EventComments from './EventComments/EventComments';
import EventInfo from './EventInfo/EventInfo';

const dummyComments = [
  {
    username: 'facundof13',
    comment: 'This is the comment that the user left on the event',
    user_id: 1,
    date: new Date(),
  },
  {
    username: 'facundof13',
    comment: 'This is the comment that the user left on the event',
    user_id: 1,
    date: new Date(),
  },

  {
    username: 'facundof13',
    comment: 'This is the comment that the user left on the event',
    user_id: 1,
    date: new Date(),
  },
  {
    username: 'facundof13',
    comment: 'This is the comment that the user left on the event',
    user_id: 1,
    date: new Date(),
  },
  {
    username: 'facundof13',
    comment: 'This is the comment that the user left on the event',
    user_id: 1,
    date: new Date(),
  },

];

function Event() {
  // const params = useParams();
  // const eventId = params.id;

  function goingChanged(change) {
    console.info(`Updating going status to: ${change}`);
  }

  function shareEvent() {
    console.info('Sharing an event!');
    // share event fetch call goes here
  }

  function favoriteEvent() {
    console.info('Hit favorite on an event!');
    // favorite event fetch call goes here
  }

  function submitComment() {
    console.info('Submitting a comment!');
    // submit a user comment here
  }

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
        comments={dummyComments}
        submitComment={() => submitComment()}
      />

    </Container>
  );
}

export default Event;
