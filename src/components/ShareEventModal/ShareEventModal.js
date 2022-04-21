import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

function ShareEventModal({
  showModal,
  setShowModal,
  name,
  eventId,
}) {
  const [email, setEmail] = useState('');
  const [formStatusDisplay, setFormStatusDisplay] = useState({ error: false, message: null });
  const auth = useAuth();

  function closeModal(useDelay = false) {
    if (useDelay) {
      setFormStatusDisplay({ error: false, message: 'Successfully shared event!' });
      setTimeout(() => {
        setFormStatusDisplay({ error: false, message: null });
        setShowModal(false);
      }, 3000);
    } else {
      setFormStatusDisplay({ error: false, message: null });
      setShowModal(false);
    }
  }

  async function shareEvent() {
    if (!email || email === '') {
      setFormStatusDisplay({ error: true, message: 'Email is required!' });
    } else {
      const url = window.location.href;
      const body = JSON.stringify({ email, url });

      await (await fetch(
        `${process.env.REACT_APP_DOMAIN}/${eventId}/share_event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...auth.headers(),
          },
          body,
        },
      )).json();
      closeModal(true);
    }
  }

  return (
    auth.authed
      ? (
        <Modal show={showModal} onHide={() => closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>
              Share&nbsp;
              {name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formStatusDisplay.message && (
              <div>
                <p className={formStatusDisplay.error ? 'text-danger' : 'text-success'}>{formStatusDisplay.message}</p>
              </div>
            )}
            Enter an email to share this event!
            <Form onSubmit={(e) => { e.preventDefault(); shareEvent(); }}>
              <div className="mt-4">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={(event) => setEmail(event.target.value)} />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeModal()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => shareEvent()}>
              Share
            </Button>
          </Modal.Footer>
        </Modal>
      )
      : (
        <Modal show={showModal} onHide={() => closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>
              Share&nbsp;
              {name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please&nbsp;
            <Link to="/login">sign in</Link>
            &nbsp;to share this event!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => closeModal()}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )
  );
}

ShareEventModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};

ShareEventModal.defaultProps = {
};

export default ShareEventModal;
