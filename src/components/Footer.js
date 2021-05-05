import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsBarChartFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <NavLink to="/track/create" className="footer__nav__item">
        <BsBarChartFill />
        <span className="footer__nav__item__text">Add Track</span>
      </NavLink>
      <NavLink to="/tracks" className="footer__nav__item">
        <FaCheck />
        <span className="footer__nav__item__text">Track List</span>
      </NavLink>
      <NavLink to="/progress" className="footer__nav__item">
        <GiPieChart />
        <span className="footer__nav__item__text">Your Progress</span>
      </NavLink>
      <NavLink to="/more" className="footer__nav__item">
        <BiDotsHorizontalRounded />
        <span className="footer__nav__item__text">More</span>
      </NavLink>
    </nav>
  </footer>
);

export default Footer;
