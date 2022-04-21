import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

function EventActions({ shareEvent, goingChanged }) {
  const [favorite, setFavorite] = useState(['Favorite Event']);
  const auth = useAuth();
  const [userEmail, setEmail] = useState([]);
  const [eventIds, setEventId] = useState([]);

  function favoriteEvent() {
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites`, {
      method: 'POST',
      headers: auth.headers(),
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        event_id: eventIds,
      }),
    }).then((response) => response.json())
      .then((data) => {

      });
    setFavorite('Favorited');
  }

  return (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      <Col className="text-center p-2">
        <h4>Interested?</h4>
        <Stack direction="vertical" gap={2}>
          <div className="text-center">
            <Button onClick={shareEvent} variant="outline-success" style={{ width: '150px' }}>Share Event</Button>
          </div>
          <div className="text-center">
            <Button onClick={() => favoriteEvent()} variant="outline-success" style={{ width: '150px' }}>{favorite}</Button>
          </div>
        </Stack>
      </Col>
      <Col xs={12} sm={6} className="m-0 p-2">
        <Form onChange={(event) => { goingChanged(event.target.id); }}>
          <h4 className="text-center">Are you going?</h4>
          <div className="d-flex flex-column align-items-center">
            <div>
              <Form.Check type="radio" name="going-status" id="going" label="Going" />
              <Form.Check type="radio" name="going-status" id="not-going" label="Not going" />
              <Form.Check type="radio" name="going-status" id="not-sure" label="Unsure" />
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

EventActions.propTypes = {
  shareEvent: PropTypes.func,
  //  favoriteEvent: PropTypes.func,
  goingChanged: PropTypes.func,
};

EventActions.defaultProps = {
  shareEvent: null,
  //  favoriteEvent: null,
  goingChanged: null,
};

export default EventActions;
