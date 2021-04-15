import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loggedOut } from '../helpers/authUsers';

const Home = ({ loggedInStatus, handleLogout, username }) => {
  const [error, setError] = useState([]);

  const runLoggedOut = async () => {
    try {
      const response = await loggedOut();
      // eslint-disable-next-line no-console
      console.log(response);
      handleLogout();
    } catch {
      setError('Sorry, unable to logged out');
    }
  };

  const onLogout = () => {
    runLoggedOut();
  };

  return (
    <div>
      <h1 className="heading">Track it</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <h2>
          Logged In Status:
          {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus}
          <button type="button" onClick={onLogout}>Logout</button>
        </h2>
      </div>
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string,
};

Home.defaultProps = {
  username: '',
};

export default Home;
