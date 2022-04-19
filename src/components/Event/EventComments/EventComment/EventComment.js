import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

function EventComment({ comment }) {
  return (
    <Row className="p-2">
      <Col xs={12} sm={2}><Link to={`/user/${comment.user_id}`}>{comment.username}</Link></Col>
      <Col xs={12} sm={8}><span>{comment.text}</span></Col>
      <Col xs={12} sm={2}><span>{moment(comment.date_posted).fromNow()}</span></Col>
    </Row>
  );
}

EventComment.propTypes = {
  comment: PropTypes.shape({
    user_id: PropTypes.number,
    username: PropTypes.string,
    text: PropTypes.string,
    date_posted: PropTypes.string,
  }),
};

EventComment.defaultProps = {
    comment: null,
};

export default EventComment;
