import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutBtn from '../components/LogoutBtn';

const Home = ({ history }) => (
  <div>
    <h1 className="heading">Track it</h1>
    <div className="content">
      <h2>
        Welcome to Track it App
      </h2>
      <Link to="/login" className="btn mb2">Login</Link>
      <Link to="/signup" className="btn mb2">Signup</Link>
      <LogoutBtn history={history} />
    </div>
  </div>
);

Home.propTypes = {
  history: PropTypes.instanceOf(Object),
};

Home.defaultProps = {
  history: null,
};

export default Home;
