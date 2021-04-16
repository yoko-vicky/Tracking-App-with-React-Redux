import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutBtn from '../components/LogoutBtn';

const Home = ({
  loggedInStatus, handleLogout, username, history,
}) => (
  <div>
    <h1 className="heading">Track it</h1>
    <div className="content">
      <h2>
        Welcome to Track it App
      </h2>
      <p>
        Logged In Status:
        {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus}
      </p>
      <Link to="/login" className="btn mb2">Login</Link>
      <Link to="/signup" className="btn mb2">Signup</Link>
      <LogoutBtn handleLogout={handleLogout} history={history} />
    </div>
  </div>
);

Home.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string,
  history: PropTypes.instanceOf(Object),
};

Home.defaultProps = {
  username: '',
  history: null,
};

export default Home;
