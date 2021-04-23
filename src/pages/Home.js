import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutBtn from '../components/LogoutBtn';

const Home = ({ history, loginUser }) => (
  <div>
    <h1 className="heading">Home</h1>
    <div className="content">
      <h2 className="home__heading">
        Welcome to Track it App!
      </h2>
      {loginUser ? <LogoutBtn history={history} /> : (
        <div>
          <Link to="/login" className="btn mb2 dark">Login</Link>
          <Link to="/signup" className="btn mb2 medium">Signup</Link>
        </div>
      )}

    </div>
  </div>
);

const mapStateToProps = (state) => ({
  loginUser: state.user.logIn,
});

Home.propTypes = {
  history: PropTypes.instanceOf(Object),
  loginUser: PropTypes.bool.isRequired,
};

Home.defaultProps = {
  history: null,
};

export default connect(mapStateToProps)(Home);
