import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UsersForm';
import { loggedIn } from '../helpers/authUsers';

const Login = ({
  loggedInStatus, handleLogin, history, username,
}) => {
  const [errors, setErrors] = useState([]);

  const runLoginAuth = async (username, password) => {
    try {
      const response = await loggedIn(username, password);
      // eslint-disable-next-line no-console
      console.log('response', response);
      if (response.logged_in) {
        handleLogin(response);
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
        <h2>
          Logged In Status:
          {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
        </h2>
        <UsersForm handleSubmit={handleSubmit} btnName="Login" />
        <Link to="/" className="btn">Go back to Home</Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  loggedInStatus: PropTypes.string,
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  username: PropTypes.string,
};

Login.defaultProps = {
  loggedInStatus: '',
  handleLogin: null,
  history: null,
  username: '',
};

export default Login;
