import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImg from '../assets/images/notfound.jpg';

const NotFound = () => (
  <div className="notfound">
    <h1 className="heading">Sorry... Not Found</h1>
    <div className="content">
      <img src={notFoundImg} alt="Sorry... Not Found" className="image mb2" />
      <Link to="/" className="btn w100">Go back to home</Link>
    </div>
  </div>
);

export default NotFound;
