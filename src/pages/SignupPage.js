import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UsersForm';
import { signedUp } from '../helpers/authUsers';
import { logIn, setUser } from '../actions/user';

const SignupPage = ({ history, setUser, logIn }) => {
  const [errors, setErrors] = useState([]);

  const runSignedUpAuth = async (username, password) => {
    try {
      const response = await signedUp(username, password);
      // eslint-disable-next-line no-console
      // console.log(response);
      if (response.status === 'created') {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        logIn(true);
        history.push('/track/create');
      } else if (response.errors.length > 0) {
        setErrors(response.errors);
      }
    } catch {
      setErrors(['Sorry, signup was faild.']);
    }
  };

  const handleSubmit = (username, password) => {
    runSignedUpAuth(username, password);
  };

  return (
    <div>
      <h1 className="heading">Signup</h1>
      <div className="content">
        {errors && errors.map((error) => (<p key={error}>{error}</p>))}
        <UsersForm handleSubmit={handleSubmit} btnName="Sign Up" />
        <Link to="/" className="btn">Go back to Home</Link>
      </div>
    </div>
  );
};

SignupPage.propTypes = {
  history: PropTypes.instanceOf(Object),
  logIn: PropTypes.func,
  setUser: PropTypes.func,
};

SignupPage.defaultProps = {
  history: null,
  logIn: null,
  setUser: null,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  logIn: (status) => dispatch(logIn(status)),
});

export default connect(undefined, mapDispatchToProps)(SignupPage);
