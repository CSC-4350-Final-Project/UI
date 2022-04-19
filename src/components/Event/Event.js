import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Event.css';
import EventActions from './EventActions/EventActions';
import EventComments from './EventComments/EventComments';
import EventInfo from './EventInfo/EventInfo';

function Event() {
    const params = useParams();
    const [event, setEvent] = useState();

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

    function submitComment() {
    // console.info('Submitting a comment!');
    // submit a user comment here
    }

    async function getEvent() {
        const eventId = params.id;
        const fetchedEvent = await (await fetch(`${process.env.REACT_APP_DOMAIN}/event_detail/${eventId}`)).json();
        setEvent(fetchedEvent._embedded.events[0]);
    }

    useEffect(() => {
        getEvent();
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
                comments={[]}
                submitComment={() => submitComment()}
            />

        </Container>
    );
}

export default Event;
