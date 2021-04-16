import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UsersForm';
import { loggedIn } from '../helpers/authUsers';
import { logIn, setUser } from '../actions/user';

const LoginPage = ({ history, setUser, logIn }) => {
  const [errors, setErrors] = useState([]);

  const runLoginAuth = async (username, password) => {
    try {
      const response = await loggedIn(username, password);
      // eslint-disable-next-line no-console
      // console.log('response', response);
      if (response.logged_in) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        logIn(true);
        history.push('/');
      } else if (response.errors.length > 0) {
        setErrors(response.errors);
      }
    } catch {
      setErrors(['Sorry, login was failed.']);
    }
  };

  const handleSubmit = (username, password) => {
    runLoginAuth(username, password);
  };

  return (
    <div>
      <h1 className="heading">Login</h1>
      <div className="content">
        {errors && errors.map((error) => (<p key={error}>{error}</p>))}
        <UsersForm handleSubmit={handleSubmit} btnName="Login" />
        <Link to="/" className="btn">Go back to Home</Link>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.instanceOf(Object),
  logIn: PropTypes.func,
  setUser: PropTypes.func,
};

LoginPage.defaultProps = {
  history: null,
  logIn: null,
  setUser: null,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  logIn: (status) => dispatch(logIn(status)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
