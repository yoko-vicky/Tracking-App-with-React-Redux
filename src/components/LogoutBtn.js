import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, setUser } from '../actions/user';
import { removeAllTracks } from '../actions/tracks';

const LogoutBtn = ({ logIn, removeAllTracks, setUser }) => {
  const onLogout = () => {
    localStorage.removeItem('token');
    logIn(false);
    setUser({});
    removeAllTracks();
  };

  return (
    <button type="button" onClick={onLogout} className="btn">Logout</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (status) => dispatch(logIn(status)),
  setUser: (user) => dispatch(setUser(user)),
  removeAllTracks: () => dispatch(removeAllTracks()),
});

LogoutBtn.propTypes = {
  logIn: PropTypes.func,
  removeAllTracks: PropTypes.func,
  setUser: PropTypes.func,
};

LogoutBtn.defaultProps = {
  logIn: null,
  removeAllTracks: null,
  setUser: null,
};

export default connect(undefined, mapDispatchToProps)(LogoutBtn);
