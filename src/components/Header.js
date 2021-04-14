import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>Track it</h1>
    <nav className="header__nav">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/dashboard">Dashboard</NavLink>
      <NavLink exact to="/login">Login</NavLink>
      <NavLink exact to="/signup">Signup</NavLink>
      <NavLink exact to="/tracks">Add Track</NavLink>
      <NavLink exact to="/tracks">All Trackks</NavLink>
      <NavLink exact to="/progress">Progress</NavLink>
      <NavLink exact to="/more">More</NavLink>
      <NavLink exact to="/admin">[Admin] Home</NavLink>
      <NavLink exact to="/admin/item/create">[Admin] AddItem</NavLink>
    </nav>
  </header>
);

export default Header;
