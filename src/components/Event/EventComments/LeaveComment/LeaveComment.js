import React from 'react';
import {
    Button,
    Col,
    Form,
    Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function LeaveComment({ submitComment }) {
    return (
        <Row className="mt-3 bg-light rounded p-2 shadow-sm">
            <Col xs={12}><h4 className="text-center">Leave a comment</h4></Col>
            <Form>
                <Form.Group controlId="comment">
                    <Form.Label>Enter a comment</Form.Label>
                    <Form.Control type="text" placeholder="Comment..." />
                </Form.Group>
            </Form>
            <Row className="mt-4">
                <Col>
                    <div className="text-center">
                        <Button variant="outline-primary" onClick={() => submitComment()}>Submit</Button>
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
