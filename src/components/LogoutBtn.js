import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ handleLogout }) => {
  const onLogout = () => {
    localStorage.setItem('token', '');
    handleLogout();
  };

  return (
    <button type="button" onClick={onLogout} className="btn">Logout</button>
  );
};

Home.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Home;
