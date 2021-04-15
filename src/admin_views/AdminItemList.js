import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminItemList = ({ items }) => (
  <div className="admin__list">
    {items.map((item) => {
      const {
        id, title, unit, icon,
      } = item;
      return (
        <div key={id} className="admin__list__item">
          <Link to={`/admin/item/${id}`} className="admin__list__item__wrap">
            <span className="iconify" data-icon={icon} data-inline="false" />
            <h2 className="title">{title}</h2>
            <span className="unit">{unit}</span>
          </Link>
        </div>
      );
    })}
    <Link to="/admin/item/create" className="btn">Add Item</Link>
  </div>
);

AdminItemList.propTypes = {
  items: PropTypes.instanceOf(Array),
};

AdminItemList.defaultProps = {
  items: [],
};

export default AdminItemList;
