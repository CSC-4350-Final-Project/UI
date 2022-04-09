import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
          <Card.Title>{name}</Card.Title>
          <Card.Text>{formattedDate}</Card.Text>
          <Link to={`event/${id}`}>See more details</Link>
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