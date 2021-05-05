import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemForm from '../components/AdminItemForm';
import { addNewItem } from '../helpers/restItems';

const AdminAddItem = ({ history, adminStatus, loginUser }) => {
  const [error, setError] = useState('');

  const runAddNewItem = async (title, unit, icon, target) => {
    try {
      setError('');
      await addNewItem(title, unit, icon, target);
      history.push('/admin');
    } catch {
      setError('Unable to fetch the data');
    }
  };

  const handleSubmit = ({
    title, unit, icon, target,
  }) => {
    runAddNewItem(title, unit, icon, target);
  };

  return adminStatus && loginUser ? (
    <div className="admin">
      <h1 className="heading">
        Admin Add Item
        <span className="admin-icon">admin</span>
      </h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <ItemForm handleSubmit={handleSubmit} />
        <Link to="/admin" className="btn">Back to Item List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  items: state.items,
  item: state.items.find((item) => item.id === Number(props.match.params.id)),
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

AdminAddItem.propTypes = {
  history: PropTypes.instanceOf(Object),
  adminStatus: PropTypes.bool,
  loginUser: PropTypes.bool.isRequired,
};

AdminAddItem.defaultProps = {
  history: null,
  adminStatus: false,
};

export default connect(mapStateToProps)(AdminAddItem);
