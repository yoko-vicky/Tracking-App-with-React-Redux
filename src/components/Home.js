import React from 'react';
import PropTypes from 'prop-types';
import Registrations from './auth/Registrations';

const Home = ({
  loggedInStatus, handleLogin, history, username,
}) => {
  const handleSuccessfulAuthentication = (userObj) => {
    handleLogin(userObj);
    history.push('/dashboard');
  };
  return (
    <div>
      <h1>Home</h1>
      <h2>
        Logged In Status:
        {loggedInStatus === 'Logged in!' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
      </h2>
      <Registrations handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.string,
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  username: PropTypes.string,
};

Home.defaultProps = {
  loggedInStatus: '',
  handleLogin: null,
  history: undefined,
  username: '',
};

export default Home;
