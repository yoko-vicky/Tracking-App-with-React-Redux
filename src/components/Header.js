import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ adminUser, whileloggedIn }) => {
  const [toggleClass, setToggleClass] = useState('');
  const onToggleMenu = () => {
    setToggleClass(toggleClass === ' active' ? '' : ' active');
  };
  const closeToggleMenu = () => {
    setToggleClass('');
  };

  return (
    <header className="header">
      <div className="header__title-wrap">
        <Link to="/" className="header__title">Track it</Link>
      </div>
      <button type="button" className={`header__toggle${toggleClass}`} onClick={onToggleMenu}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </button>
      <nav className={`header__nav${toggleClass}`}>
        <NavLink exact to="/" className="header__link" onClick={closeToggleMenu}>Home</NavLink>
        <NavLink exact to="/tracks/create" className="header__link" onClick={closeToggleMenu}>Add Track</NavLink>
        <NavLink exact to="/tracks" className="header__link" onClick={closeToggleMenu}>All Tracks</NavLink>
        <NavLink exact to="/progress" className="header__link" onClick={closeToggleMenu}>Progress</NavLink>
        <NavLink exact to="/more" className="header__link" onClick={closeToggleMenu}>More</NavLink>
        {!whileloggedIn && (
          <>
            <NavLink exact to="/login" className="header__link" onClick={closeToggleMenu}>Login</NavLink>
            <NavLink exact to="/signup" className="header__link" onClick={closeToggleMenu}>Signup</NavLink>
          </>
        )}

        {(whileloggedIn && adminUser) && (
          <>
            <NavLink exact to="/admin" className="header__link" onClick={closeToggleMenu}>[Admin Menu] Item List</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  adminUser: state.user.user.admin,
  whileloggedIn: state.user.logIn,
});

Header.propTypes = {
  adminUser: PropTypes.bool,
  whileloggedIn: PropTypes.bool,
};

Header.defaultProps = {
  adminUser: false,
  whileloggedIn: false,
};

export default connect(mapStateToProps)(Header);
