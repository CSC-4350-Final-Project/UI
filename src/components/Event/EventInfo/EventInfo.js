import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import moment from 'moment';

function EventInfo({ event }) {
  return event ? (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      {event.images && event.images[0] && event.images[0].url
        && (
          <Col md={6} className="text-center">
            <Image fluid className="rounded p-2" src={event.images[0].url} />
          </Col>
        )}
      <Col>

        <h3 className="text-center text-decoration-underline">{event.name}</h3>
        {event._embedded && event._embedded.venues
          && event._embedded.venues[0] && event._embedded.venues[0].name
          && (
            <Row className="p-2">
              <Col xs={12} sm={6} className="fw-bold">Location</Col>
              <Col className="event-info">{event._embedded.venues[0].name}</Col>
            </Row>
          )}
        {event.dates && event.dates.start && event.dates.start.dateTime
          && (
            <>
              <Row className="p-2">
                <Col xs={12} sm={6} className="fw-bold">Date</Col>
                <Col className="event-info">{moment(event.dates.start.dateTime).format('MMMM DD, YYYY')}</Col>
              </Row>
              <Row className="p-2">
                <Col xs={12} sm={6} className="fw-bold">Time</Col>
                <Col className="event-info">{moment(event.dates.start.dateTime).format('LT')}</Col>
              </Row>
            </>
          )}
        {event.classifications && event.classifications[0] && event.classifications[0].genre
          && event.classifications[0].genre.name
          && (
            <Row className="p-2">
              <Col xs={12} sm={6} className="fw-bold">Type</Col>
              <Col className="event-info">{event.classifications[0].genre.name}</Col>
            </Row>
          )}
      </Col>
    </Row>
  ) : '';
}
EventInfo.propTypes = {
  event: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    name: PropTypes.string,
    _embedded: PropTypes.shape({
      venues: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    }),
    dates: PropTypes.shape(PropTypes.shape({
      start: PropTypes.shape({ dateTime: PropTypes.string }),
    })),
    classifications: PropTypes.arrayOf(PropTypes.shape({
      genre: PropTypes.shape({ name: PropTypes.string }),
    })),
  }),
};

EventInfo.defaultProps = { event: null };

export default EventInfo;
