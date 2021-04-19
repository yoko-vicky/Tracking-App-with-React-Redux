import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getItems } from '../helpers/restItems';
import addItems from '../actions/items';

const TrackItem = ({
  sameDateTracks, items, loginUser, addItems, date,
}) => {
  console.log('sameDateTracks', sameDateTracks);
  console.log('items', items);
  console.log('date', date);

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
      setError('Unable to fetch the item data');
    }
  };

  useEffect(() => {
    if (loginUser) {
      runGetItems();
    }
  }, []);

  return loginUser ? (
    <div className="TrackItem">
      {error && <p className="error-msg">{error}</p>}
      <h1 className="heading">{moment(date).format('MMM Do YYYY')}</h1>
      <div className="content">
        Track Item Detail for 1 day
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  sameDateTracks: state.tracks.filter((track) => track.date === props.match.params.id),
  items: state.items,
  loginUser: state.user.logIn,
  date: Number(props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

TrackItem.propTypes = {
  sameDateTracks: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
  date: PropTypes.number,
};

TrackItem.defaultProps = {
  sameDateTracks: [],
  items: [],
  addItems: null,
  date: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);
