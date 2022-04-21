import React, { useState, useEffect } from 'react';
// import { Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Favorites() {
  const auth = useAuth();
  const params = useParams();
  const [userIds, setUserIds] = useState([]);
  const [eventIds, setEventIds] = useState([]);

  function getFavorites() {
    const eventId = params.id;
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    }).then((response) => response.json())
      .then((data) => { setUserIds(data.userIds); setEventIds(data.eventIds); });
  }
  useEffect(() => { getFavorites(); }, []);

  function removeFavorite() {
    // this function removes the event from the Favorite page/database
    const eventId = params.id;
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    }).then((response) => response.json())
      .then(() => {
        getFavorites();
      });
  }

  return (
    <div className="App">
      <h3>Favorite List</h3>
      {eventIds}
      {eventIds.map((eventId, index) => (
        <div>
          <div className="content">
            <b>
              User ID
              {userIds[index]}
              {' '}
              -
              {' '}
            </b>
            <b>
              Event ID
              {eventIds[index]}
            </b>
            {' '}
            {' '}
            <button type="button" onClick={() => removeFavorite(index)}>Remove</button>
          </div>
        </div>
      ))}
      ;

    </div>
  );
}
Favorites.propTypes = {};
Favorites.defaultProps = {};

export default Favorites;
