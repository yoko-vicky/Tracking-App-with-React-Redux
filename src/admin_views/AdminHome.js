import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemList from './AdminItemList';
import { addItems } from '../actions/items';
import { getItems } from '../helpers/restItems';

const AdminHome = ({ addItems, items }) => {
  const [error, setError] = useState('');

  const runGetItems = async () => {
    try {
      const response = await getItems();
      addItems(response);
    } catch {
      setError('Unable to fetch the data');
    }
  };
  useEffect(() => {
    runGetItems();
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
