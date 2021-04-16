import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoginStatus = ({ loginStats, user }) => (
  <div className="login-status">
    {loginStats ? `Welcome, ${user.user.username}` : 'Please log in.'}
  </div>
);

const mapStateToProps = (state) => ({
  loginStats: state.user.logIn,
  user: state.user,
});

LoginStatus.propTypes = {
  user: PropTypes.instanceOf(Object),
  loginStats: PropTypes.bool,
};

LoginStatus.defaultProps = {
  user: {},
  loginStats: false,
};

export default connect(mapStateToProps)(LoginStatus);
