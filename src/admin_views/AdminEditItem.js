/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import ItemForm from './AdminItemForm';

const AdminEditItem = ({ item, items, history }) => {
  // eslint-disable-next-line no-console
  console.log('items', items);
  // eslint-disable-next-line no-console
  console.log('item', item);
  // console.log(item);
  const {
    id, title, unit, icon,
  } = item;

  const handleSubmit = ({ title, unit, icon }) => {
    axios.put(`http://localhost:3001/items/${id}`, {
      item: {
        title,
        unit,
        icon,
      },
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('Response', response);
        history.push('/admin');
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Error', error);
      });
  };
  return (
    <div className="admin">
      <h1 className="heading">
        Edit Item
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
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
  items: PropTypes.instanceOf(Array),
  item: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};

AdminEditItem.defaultProps = {
  items: [],
  item: {},
};

export default connect(mapStateToProps)(AdminEditItem);
