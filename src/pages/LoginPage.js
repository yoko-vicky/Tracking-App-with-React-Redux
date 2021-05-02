import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UsersForm';
import { loggedIn } from '../helpers/authUsers';
import { logIn, setUser } from '../actions/user';

const LoginPage = ({
  history, setUser, logIn, loginUser,
}) => {
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState('');

  const runLoginAuth = async (username, password) => {
    try {
      const response = await loggedIn(username, password);
      if (response.logged_in) {
        setMsg('You are now logging in...');
        localStorage.setItem('token', response.token);
        setUser(response.user);
        logIn(true);
        history.push(response.user.admin ? '/admin' : '/tracks');
      } else if (response.errors.length > 0) {
        setMsg('');
        setErrors(response.errors);
      }
    } catch {
      setMsg('');
      setErrors(['Sorry, login was failed.']);
    }
  };

  const handleSubmit = (username, password) => {
    runLoginAuth(username, password);
  };

  return loginUser ? <Redirect to="/tracks" /> : (
    <div>
      <h1 className="heading">Login</h1>
      <div className="content">
        {errors && errors.map((error) => (<p key={error}>{error}</p>))}
        {msg && <p className="info-msg">{msg}</p>}
        <UsersForm handleSubmit={handleSubmit} btnName="Login" />
        <Link to="/" className="btn">Go back to Home</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  logIn: (status) => dispatch(logIn(status)),
});

LoginPage.propTypes = {
  history: PropTypes.instanceOf(Object),
  logIn: PropTypes.func.isRequired,
  setUser: PropTypes.func,
  loginUser: PropTypes.bool.isRequired,
};

LoginPage.defaultProps = {
  history: null,
  setUser: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
