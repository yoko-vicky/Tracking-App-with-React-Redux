import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackForm from '../components/TrackForm';
import { addNewTrack } from '../helpers/restTracks';
import { getItems } from '../helpers/restItems';
import addItems from '../actions/items';

const AddTrack = ({
  loginUser, tracks, history, items, addItems,
}) => {
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
    runGetItems();
  }, []);

  const runAddNewTrack = async (result, itemId, date) => {
    try {
      await addNewTrack(result, itemId, date);
    } catch {
      setError('Unable to create new tracks');
    }
  };

  const handleSubmit = (StrDate, state) => {
    const sameDateTrack = tracks.find((track) => track.date === StrDate);
    if (sameDateTrack) {
      setError('Track data for the same date alreay exists');
    } else {
      Object.keys(state).forEach((key) => {
        runAddNewTrack(state[key], key, StrDate);
        history.push('/tracks');
      });
    }
  };
  const itemTitles = () => {
    const titles = {};
    items.forEach((item) => { titles[item.id] = ''; });
    return titles;
  };

  return (loginUser ? (
    <div className="add-track">
      <h1 className="heading">Add Track</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <p>Welcome back let&apos;s add your track for today!</p>
        <TrackForm handleSubmit={handleSubmit} itemTitles={itemTitles} />
      </div>
    </div>
  ) : <Redirect to="/" />);
};

const mapStateToProps = (state) => ({
  items: state.items,
  tracks: state.tracks,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

AddTrack.propTypes = {
  items: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  tracks: PropTypes.instanceOf(Array),
  history: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
};

AddTrack.defaultProps = {
  items: [],
  tracks: [],
  history: null,
  addItems: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
