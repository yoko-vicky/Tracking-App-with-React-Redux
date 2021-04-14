import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound">
    <h1 className="heading">Sorry... Not Found</h1>
    <div className="content">
      <Link to="/">Go to home</Link>
    </div>
  </div>
);

export default NotFound;
