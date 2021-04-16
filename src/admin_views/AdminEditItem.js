/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemForm from './AdminItemForm';
import { updateItem, removeItemFromDB } from '../helpers/restItems';

const AdminEditItem = ({ item, history }) => {
  const [error, setError] = useState('');

  const {
    id, title, unit, icon,
  } = item;

  const runUpdateItem = async (title, unit, icon) => {
    try {
      await updateItem(id, title, unit, icon);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to fetch the data');
    }
  };

  const runRemoveItemFromDB = async (id) => {
    try {
      await removeItemFromDB(id);
      history.push('/admin');
    } catch {
      setError('Sorry, unable to remove the item');
    }
  };

  const handleSubmit = ({ title, unit, icon }) => {
    runUpdateItem(title, unit, icon);
  };

  const onRemove = () => {
    runRemoveItemFromDB(id);
  };

  return (
    <div className="admin">
      <h1 className="heading">
        Edit Item
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <ItemForm id={id} title={title} unit={unit} icon={icon} handleSubmit={handleSubmit} />
        <button type="button" className="btn mb2" onClick={onRemove}>Remove Item</button>
        <Link to="/admin" className="btn">Cancel & Back to Item List</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  items: state.items,
  item: state.items.find((item) => item.id === Number(props.match.params.id)),
});

AdminEditItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

AdminEditItem.defaultProps = {
  item: {},
  history: null,
};

export default connect(mapStateToProps)(AdminEditItem);
