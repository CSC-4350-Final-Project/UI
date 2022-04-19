import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventComment from './EventComment/EventComment';
import LeaveComment from './LeaveComment/LeaveComment';

function EventComments({ comments, submitComment }) {
    return (
        <>
            <Row className="mt-3 bg-light rounded p-2 shadow-sm">
                <Row>
                    <Col>
                        <h4 className="text-center">Comments</h4>
                        {comments.length === 0 && <div className="text-center">No comments left for this event.</div>}
                    </Col>
                </Row>
                {comments.length > 0 && comments.map(
                    (comment, index) => <EventComment key={index} comment={comment} />,
                )}
            </Row>
            <LeaveComment submitComment={submitComment} />
        </>
    );
}

EventComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        user_id: PropTypes.number,
        username: PropTypes.string,
        comment: PropTypes.string,
        date: PropTypes.instanceOf(Date),
    })),
    submitComment: PropTypes.func,
};

EventComments.defaultProps = { comments: [], submitComment: null };

export default EventComments;
