/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemForm from './AdminItemForm';
import { updateItem } from '../helpers/restItems';

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
      setError('Unable to fetch the data');
    }
  };

  const handleSubmit = ({ title, unit, icon }) => {
    runUpdateItem(title, unit, icon);
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
        <button type="button">Remove Item</button>
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
  history: PropTypes.instanceOf(Object).isRequired,
};

AdminEditItem.defaultProps = {
  item: {},
};

export default connect(mapStateToProps)(AdminEditItem);
