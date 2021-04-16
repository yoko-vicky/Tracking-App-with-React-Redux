import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UsersForm';
import { signedUp } from '../helpers/authUsers';

const Signup = ({
  loggedInStatus, handleLogin, history, username,
}) => {
  const [errors, setErrors] = useState([]);

  const runSignedUpAuth = async (username, password) => {
    try {
      const response = await signedUp(username, password);
      // eslint-disable-next-line no-console
      console.log(response);
      if (response.status === 'created') {
        handleLogin(response);
        history.push('/');
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
        <h2>
          Logged In Status:
          {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
        </h2>
        <UsersForm handleSubmit={handleSubmit} btnName="Sign Up" />
        <Link to="/" className="btn">Go back to Home</Link>
      </div>
    </div>
  );
};

Signup.propTypes = {
  loggedInStatus: PropTypes.string,
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  username: PropTypes.string,
};

Signup.defaultProps = {
  loggedInStatus: '',
  handleLogin: null,
  history: null,
  username: '',
};

export default Signup;
