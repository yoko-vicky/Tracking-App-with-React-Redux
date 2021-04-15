/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemForm from './AdminItemForm';

const AdminEditItem = ({ item, items }) => {
  // eslint-disable-next-line no-console
  console.log(items);
  // console.log(item);
  const {
    id, title, unit, icon,
  } = item;
  return (
    <div className="admin">
      <h1 className="heading">
        Edit Item
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        <ItemForm id={id} title={title} unit={unit} icon={icon} />
        <button type="button">Remove Item</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  items: state.items,
  item: state.items.find((item) => item.id === props.match.params.id),
});

AdminEditItem.propTypes = {
  items: PropTypes.instanceOf(Array),
  item: PropTypes.instanceOf(Object),
};

AdminEditItem.defaultProps = {
  items: [],
  item: {},
};

export default connect(mapStateToProps)(AdminEditItem);
