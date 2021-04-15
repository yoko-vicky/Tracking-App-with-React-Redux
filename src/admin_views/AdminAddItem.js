import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemForm from './AdminItemForm';
import { addNewItem } from '../helpers/restItems';

const AdminAddItem = ({ history }) => {
  const [error, setError] = useState('');

  const runAddNewItem = async (title, unit, icon) => {
    try {
      await addNewItem(title, unit, icon);
      history.push('/admin');
    } catch {
      setError('Unable to fetch the data');
    }
  };

  const handleSubmit = ({ title, unit, icon }) => {
    runAddNewItem(title, unit, icon);
  };

  return (
    <div className="admin">
      <h1 className="heading">
        Admin Add Item
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <ItemForm handleSubmit={handleSubmit} />
        <Link to="/admin" className="btn w100">Back to Item List</Link>
      </div>
    </div>
  );
};

AdminAddItem.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default AdminAddItem;
