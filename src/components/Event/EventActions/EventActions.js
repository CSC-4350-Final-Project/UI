import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function EventActions({
  shareEvent,
  goingChanged,
  goingStatus,
}) {
  const [favorite, setFavorite] = useState('Favorite Event');
  const auth = useAuth();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  function getFavorites() {
    const eventId = params.id;
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    }).then((response) => response.json())
      .then((data) => {
        if (data.is_favorite) {
          setFavorite('Favorited');
        } else {
          setFavorite('Favorite Event');
        }
      });
  }

  function favoriteEvent() {
    if (!auth.authed) {
      setShowFavoriteModal(true);
      return;
    }
    const eventId = params.id;
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    }).then((response) => response.json())
      .then(() => {
        getFavorites();
      });
  }

  useEffect(() => {
    if (auth.authed) {
      getFavorites();
    }
  }, []);

  function setGoingChanged(value) {
    if (auth.authed) {
      goingChanged(value);
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <Row className="mt-3 bg-light rounded p-2 shadow-sm">
        <Col className="text-center p-2">
          <h4>Interested?</h4>
          <Stack direction="vertical" gap={2}>
            <div className="text-center">
              <Button onClick={shareEvent} variant="success" style={{ width: '150px' }}>Share Event</Button>
            </div>
            <div className="text-center">
              <Button onClick={() => favoriteEvent()} variant={favorite === 'Favorited' ? 'warning' : 'success'} style={{ width: '150px' }}>{favorite}</Button>
            </div>
          </Stack>
        </Col>
        <Col xs={12} sm={6} className="m-0 p-2">
          <Form>
            <h4 className="text-center">Are you going?</h4>
            <div className="d-flex flex-column align-items-center">
              <div>
                <Form.Check type="radio" onChange={(event) => setGoingChanged(event.target.id)} checked={goingStatus === 'going'} name="going-status" id="going" label="Going" />
                <Form.Check type="radio" onChange={(event) => setGoingChanged(event.target.id)} checked={goingStatus === 'not-going'} name="going-status" id="not-going" label="Not going" />
                <Form.Check type="radio" onChange={(event) => setGoingChanged(event.target.id)} checked={goingStatus === 'not-sure'} name="going-status" id="not-sure" label="Unsure" />
              </div>
            </div>
          </Form>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you going?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please&nbsp;
          <Link to="/login">sign in</Link>
          &nbsp;to indicate if you are going to this event or not!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFavoriteModal} onHide={() => setShowFavoriteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Favorite Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please&nbsp;
          <Link to="/login">sign in</Link>
          &nbsp;to favorite this event!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowFavoriteModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

EventActions.propTypes = {
  shareEvent: PropTypes.func,
  goingChanged: PropTypes.func,
  goingStatus: PropTypes.string,
};

EventActions.defaultProps = {
  shareEvent: null,
  goingChanged: null,
  goingStatus: null,
};

export default EventActions;
