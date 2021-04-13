import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleSuccessfulAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/login',
      {
        user: {
          username,
          password,
        },
      },
      { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
        } else if (response.data.errors.length > 0) {
          setErrors(response.data.errors);
        }
      }).catch((error) => {
        console.log('login error', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {errors && errors.map((error) => (<p key={error}>{error}</p>))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleSuccessfulAuthentication: PropTypes.func,
};

Login.defaultProps = {
  handleSuccessfulAuthentication: null,
};

export default Login;
