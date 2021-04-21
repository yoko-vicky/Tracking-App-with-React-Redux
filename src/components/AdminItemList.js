import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminItemList = ({ items }) => {
  const regex = /^[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/;
  const validIcon = (iconString) => iconString && iconString.match(regex);

  return (
    <div className="admin__list">
      {items.map((item) => {
        const {
          id, title, unit, icon,
        } = item;
        return (
          <div key={id} className="admin__list__item">
            <Link to={`/admin/item/${id}`} className="admin__list__item__wrap">
              <span className="iconify" data-icon={validIcon(icon) ? icon : 'heroicons-outline:paper-clip'} data-inline="false" />
              <h2 className="title">{title}</h2>
              <span className="unit">{unit}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

AdminItemList.propTypes = {
  items: PropTypes.instanceOf(Array),
};

AdminItemList.defaultProps = {
  items: [],
};

export default AdminItemList;
