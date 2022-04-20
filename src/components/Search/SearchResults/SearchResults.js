import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

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
          <Col className="text-center">
            <h4>Search Results</h4>
            {results.map((result, index) => <div key={index}>{result.name}</div>)}
          </Col>
        </Row>
      )
  );
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Array),
};

SearchResults.defaultProps = { results: [] };

export default SearchResults;
