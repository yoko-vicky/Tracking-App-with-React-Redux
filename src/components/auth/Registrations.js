import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Registrations = ({ handleSuccessfulAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/signup',
      {
        user: {
          username,
          password_digest: password,
        },
      },
      { withCredentials: true })
      .then((response) => {
        // console.log('registration res', response);
        if (response.data.status === 'created') {
          handleSuccessfulAuthentication(response.data);
        }
      }).catch((error) => {
        console.log('registration error', error);
      });
  };

  return (
    <div>
      <h1>Registrations</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

Registrations.propTypes = {
  handleSuccessfulAuthentication: PropTypes.func,
};

Registrations.defaultProps = {
  handleSuccessfulAuthentication: null,
};

export default Registrations;
