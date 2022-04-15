import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

import { Link } from 'react-router-dom';
import './EventCard.css';

function EventCard({
    id, image, name, date,
}) {
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        setFormattedDate(moment(date).isValid() ? moment(date).format('MMMM DD, YYYY LT') : 'TBA');
    }, []);

    return (
        <div className="mx-auto">
            <Card style={{ width: '18rem', height: '100%' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title className="text-align">{name}</Card.Title>
                    <Card.Text className="text-align">{formattedDate}</Card.Text>
                    <Button className="button-align" as={Link} to={`event/${id}`}>See Details</Button>
                    <Button className="button-align">Add Favorite</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

EventCard.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
};

EventCard.defaultProps = {
    id: null,
    image: null,
    name: null,
    date: null,
};

export default EventCard;
