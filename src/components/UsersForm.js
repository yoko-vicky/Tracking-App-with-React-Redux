import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UsersForm = ({ handleSubmit, btnName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(username, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <div className="form__group">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form__group">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn mb3">{btnName}</button>
      </form>
    </div>
  );
};

UsersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  btnName: PropTypes.string,
};

UsersForm.defaultProps = {
  btnName: 'Save',
};

export default UsersForm;
