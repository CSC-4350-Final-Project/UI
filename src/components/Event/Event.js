import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import './Event.css';
import EventComments from './EventComments/EventComments';
import EventInfo from './EventInfo/EventInfo';
import ShareEventModal from '../ShareEventModal/ShareEventModal';
import EventActions from './EventActions/EventActions';

function Event() {
  const params = useParams();
  const auth = useAuth();
  const [event, setEvent] = useState();
  const [comments, setComments] = useState();
  const [goingStatus, setGoingStatus] = useState();
  const [showShareModal, setShowShareModal] = useState(false);

  function shareEvent() {
    setShowShareModal(true);
  }

  async function getGoingStatus() {
    const eventId = params.id;

    const fetchedStatus = await (await fetch(
      `${process.env.REACT_APP_DOMAIN}/event/${eventId}/going`,
      { headers: auth.headers() },
    )).json();

    setGoingStatus(fetchedStatus);
  }

  async function goingChanged(value) {
    const eventId = params.id;
    const body = JSON.stringify({
      id: goingStatus.id || null,
      dateUpdated: new Date(),
      value,
    });

    const headers = {
      ...auth.headers(), 'Content-Type': 'application/json',
    };

    try {
      await (await fetch(`${process.env.REACT_APP_DOMAIN}/event/${eventId}/going`, {
        method: 'POST', headers, body,
      })).json();

      await getGoingStatus();
    } catch (e) {
      auth.logout();
    }
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
    getGoingStatus();
  }, []);

  return event && (
    <>
      <Container>
        <EventInfo event={event} />
        <EventActions
          event={event}
          shareEvent={() => shareEvent()}
          goingChanged={(status) => goingChanged(status)}
          goingStatus={goingStatus ? goingStatus.status : null}
        />
        <EventComments
          event={event}
          comments={comments}
          submitComment={(comment) => submitComment(comment)}
          showLeaveComment={auth.authed}
        />
        <ShareEventModal />
      </Container>
      <ShareEventModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        name={event.name}
        eventId={event.id}
      />
    </>
  );
}

export default Event;
