import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Registrations = ({ handleSuccessfulAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/signup',
      {
        user: {
          username,
          password,
        },
      },
      { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'created') {
          handleSuccessfulAuth(response.data);
          console.log(response);
        } else {
          setErrors(response.data.errorMsgs);
        }
      }).catch(() => {
        setErrors(['Sorry, user cannot be created.']);
      });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h1>Registrations</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

Registrations.propTypes = {
  handleSuccessfulAuth: PropTypes.func,
};

Registrations.defaultProps = {
  handleSuccessfulAuth: null,
};

export default Registrations;
