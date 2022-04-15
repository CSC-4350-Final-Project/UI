import React from 'react';
// import PropTypes from 'prop-types';
// import useAuth from '../../hooks/useAuth';
import { Card } from 'react-bootstrap';

function Favorites() {
    return (
        <Card.Body>
            <Card.Title>
                <h2 className="text-center">Your Favorite Events</h2>
            </Card.Title>
        </Card.Body>
    );
}
Favorites.propTypes = {};

Favorites.defaultProps = {};

export default Favorites;
