import React, { useEffect } from 'react';
// import { Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Favorites() {
  const auth = useAuth();
  const params = useParams();
  //  const [userIds, setUserIds] = useState([]);
  //  const [eventIds, setEventIds] = useState([]);

  function getFavorites() {
    const eventId = params.id;
    fetch(`${process.env.REACT_APP_DOMAIN}/favorites/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth.headers(),
      },
    }).then((response) => response.json());
    //  .then((data) => { setUserIds(data.userIds); setEventIds(data.eventIds); });
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
    <div>
      <h2 className="text-center">Favorite List</h2>
      <button onClick={() => removeFavorite()} type="button">Remove</button>
    </div>
  );
}
Favorites.propTypes = {};
Favorites.defaultProps = {};

export default Favorites;
