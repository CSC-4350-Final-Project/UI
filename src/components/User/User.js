import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

function User() {
  const auth = useAuth();

  function test() {
    console.log('fetching');
    fetch(`${process.env.REACT_APP_DOMAIN}/profile`, {
      headers: auth.headers(),
    })
      .then((res) => {
        console.log('here');
        return res.json();
      })
      .then((r) => console.log(r));
  }
  useEffect(() => test, []);

  return (
    <div>
      User Component
    </div>
  );
}

User.propTypes = {};

User.defaultProps = {};

export default User;
