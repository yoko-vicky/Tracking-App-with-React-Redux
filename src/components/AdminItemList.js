import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

const AdminItemList = ({ items }) => (
  <div className="admin__list">
    {items.map((item) => {
      const {
        id, title, unit, target,
      } = item;
      return (
        <div key={id} className="admin__list__item">
          <Link to={`/admin/item/${id}`} className="admin__list__item__wrap">
            <h2 className="title">{title}</h2>
            <p className="target">
              <span className="target-num">{target}</span>
              <span className="unit">{pluralize(unit, target)}</span>
            </p>
          </Link>
        </div>
      );
    })}
  </div>
);

AdminItemList.propTypes = {
  items: PropTypes.instanceOf(Array),
};

AdminItemList.defaultProps = {
  items: [],
};

export default AdminItemList;
