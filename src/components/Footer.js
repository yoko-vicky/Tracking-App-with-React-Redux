import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <NavLink exact to="/add_track">Add Track</NavLink>
      <NavLink exact to="/track_list">Track List</NavLink>
      <NavLink exact to="/progress">Your Progress</NavLink>
      <NavLink exact to="/more">More</NavLink>
    </nav>
  </footer>
);

export default Footer;
