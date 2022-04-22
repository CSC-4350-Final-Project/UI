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
  const [form, setForm] = useState({ type: '', value: '' });
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
    if (!form.type || !form.value) {
      setFormStatusDisplay({ error: true, message: 'Both fields are required!' });
    } else {
      const body = JSON.stringify(form);

      await (await fetch(
        `${process.env.REACT_APP_DOMAIN}/event/${eventId}/share`,
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

            Share this event with your
            friends by selecting one of the following options:

            <Form onSubmit={(e) => { e.preventDefault(); shareEvent(); }}>
              <div className="mt-4">
                <Form.Check type="radio" onChange={() => setForm({ ...form, type: 'email' })} name="share-type" id="email" label="Email" />
                <Form.Check type="radio" onChange={() => setForm({ ...form, type: 'phone' })} name="share-type" id="phone-number" label="Phone Number" />
              </div>
              <div className="mt-4">
                <Form.Label>
                  Enter&nbsp;
                  {form.type === 'email' ? 'an Email' : 'a Phone Number'}
                </Form.Label>
                <Form.Control
                  onChange={(event) => setForm({ ...form, value: event.target.value })}
                />
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
