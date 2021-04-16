import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemList from '../components/AdminItemList';
import addItems from '../actions/items';
import { getItems } from '../helpers/restItems';
import NotFound from './NotFound';

const AdminHome = ({ addItems, items, adminStatus }) => {
  const [error, setError] = useState('');

  const runGetItems = async () => {
    try {
      const response = await getItems();
      if (response.length > 0) {
        addItems(response);
      } else {
        setError('No Items');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (adminStatus) {
      runGetItems();
    }
  }, []);

  return adminStatus ? (
    <div className="admin">
      <h1 className="heading">
        Items
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        {items.length > 0 && <ItemList items={items} />}
        <Link to="/admin/item/create" className="btn">Add Item</Link>
      </div>
    </div>
  ) : <NotFound />;
};

const mapStateToProps = (state) => ({
  items: state.items,
  adminStatus: state.user.user.admin,
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

AdminHome.propTypes = {
  addItems: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
};

AdminHome.defaultProps = {
  items: [],
  adminStatus: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
