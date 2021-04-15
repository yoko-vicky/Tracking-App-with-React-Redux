import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ItemList from './AdminItemList';
import { addItems } from '../actions/items';

const AdminHome = ({ addItems, items }) => {
  const [error, setError] = useState('');

  const getItem = () => {
    axios.get('http://localhost:3001/items',
      { withCredentials: true })
      .then((response) => {
        addItems(response.data);
      }).catch((e) => {
        setError(e);
      });
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="admin">
      <h1 className="heading">
        Items
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <ItemList items={items} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

AdminHome.propTypes = {
  addItems: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(Array),
};

AdminHome.defaultProps = {
  items: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
