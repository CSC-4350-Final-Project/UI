import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';

function EventActions({ shareEvent, favoriteEvent, goingChanged }) {
  return (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      <Col className="text-center p-2">
        <h4>Interested?</h4>
        <Stack direction="vertical" gap={2}>
          <div className="text-center">
            <Button onClick={shareEvent} variant="outline-success" style={{ width: '150px' }}>Share Event</Button>
          </div>
          <div className="text-center">
            <Button onClick={favoriteEvent} variant="outline-success" style={{ width: '150px' }}>Favorite Event</Button>
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
  favoriteEvent: PropTypes.func,
  goingChanged: PropTypes.func,
};

EventActions.defaultProps = {
  shareEvent: null,
  favoriteEvent: null,
  goingChanged: null,
};

export default EventActions;
