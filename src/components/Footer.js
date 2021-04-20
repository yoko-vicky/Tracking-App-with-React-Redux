import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <NavLink to="/track/create" className="footer__nav__item">
        <span className="iconify" data-icon="foundation:graph-bar" data-inline="false" />
        <span className="footer__nav__item__text">Add Track</span>
      </NavLink>
      <NavLink to="/tracks" className="footer__nav__item">
        <span className="iconify" data-icon="fa-solid:check" data-inline="false" />
        <span className="footer__nav__item__text">Track List</span>
      </NavLink>
      <NavLink to="/progress" className="footer__nav__item">
        <span className="iconify sm" data-icon="ant-design:pie-chart-filled" data-inline="false" />
        <span className="footer__nav__item__text">Your Progress</span>
      </NavLink>
      <NavLink to="/more" className="footer__nav__item">
        <span className="iconify md" data-icon="carbon:overflow-menu-horizontal" data-inline="false" />
        <span className="footer__nav__item__text">More</span>
      </NavLink>
    </nav>
  </footer>
);

export default Footer;
