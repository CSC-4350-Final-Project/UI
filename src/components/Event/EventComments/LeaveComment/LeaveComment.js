/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function LeaveComment({ submitComment }) {
  const [comment, setComment] = useState('');

  function postComment(e) {
    if (e === '') {
      window.alert('Please leave a comment.');
    }
    e.preventDefault();
    submitComment(comment);
    setComment('');
  }

  return (
    <Row className="mt-3 bg-light rounded p-2 shadow-sm">
      <Col xs={12}><h4 className="text-center">Leave a comment</h4></Col>
      <Form onSubmit={(e) => postComment(e)}>
        <Form.Group controlId="comment">
          <Form.Label>Enter a comment</Form.Label>
          <Form.Control
            required
            value={comment}
            onChange={((e) => setComment(e.target.value))}
            type="text"
            placeholder="Comment..."
          />
        </Form.Group>
      </Form>
      <Row className="mt-4">
        <Col>
          <div className="text-center">
            <Button variant="outline-primary" onClick={(e) => postComment(e)}>Submit</Button>
          </div>
        </Col>
      </Row>
    </Row>
  );
}
LeaveComment.propTypes = {
  submitComment: PropTypes.func,
};

LeaveComment.defaultProps = { submitComment: null };

export default LeaveComment;
