import React, { useState } from 'react';
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
      if (response.data.logged_in) {
        handleLogin();
        history.push('/');
      } else if (response.data.errors.length > 0) {
        setErrors(response.data.errors);
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
        <UsersForm handleSubmit={handleSubmit} />
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
  history: undefined,
  username: '',
};

export default Signup;
