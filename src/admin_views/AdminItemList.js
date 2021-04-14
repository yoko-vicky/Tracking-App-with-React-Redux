import React from 'react';
import { Link } from 'react-router-dom';

const AdminItemList = () => (
  <div className="item-edit">
    <h1>ItemList Page</h1>
    <p>
      item name, unit, icon_url
      <button type="button">Edit</button>
      <button type="button">Remove</button>
    </p>
    <p>
      item name, unit, icon_url
      <button type="button">Edit</button>
      <button type="button">Remove</button>
    </p>
    <p>
      item name, unit, icon_url
      <button type="button">Edit</button>
      <button type="button">Remove</button>
    </p>
    <Link to="/add_item">Add Item</Link>
  </div>
);

export default AdminItemList;
