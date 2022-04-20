import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import EventCard from '../../EventCard/EventCard';

function SearchResults({ results }) {
  return (
    results.length === 0
      ? (
        <Row className="mt-3 bg-light rounded p-2 shadow-sm">
          <Col className="text-center">
            <h4>No results found</h4>
            <span>Please try changing your search criteria.</span>
          </Col>
        </Row>
      ) : (
        <Row className="mt-3 bg-light rounded p-2 shadow-sm">
          <Col xs={12} className="text-center">
            <h4>Search Results</h4>
          </Col>
          <Row>
            <Col style={{ gap: '25px' }} className="d-flex flex-row flex-wrap">
              {results.map((event, index) => (
                <EventCard
                  key={index}
                  id={event.id}
                  image={event.images[0].url}
                  name={event.name}
                  date={event.dates.start.dateTime}
                />
              ))}
            </Col>
          </Row>
        </Row>
      )
  );
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Array),
};

SearchResults.defaultProps = { results: [] };

export default SearchResults;
