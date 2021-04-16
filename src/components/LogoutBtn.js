import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn } from '../actions/user';

const LogoutBtn = ({ logIn }) => {
  const onLogout = () => {
    localStorage.removeItem('token');
    logIn(false);
  };

  return (
    <button type="button" onClick={onLogout} className="btn">Logout</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (status) => dispatch(logIn(status)),
});

LogoutBtn.propTypes = {
  logIn: PropTypes.func,
};

LogoutBtn.defaultProps = {
  logIn: null,
};

export default connect(undefined, mapDispatchToProps)(LogoutBtn);
