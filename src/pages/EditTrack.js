import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackForm from '../components/TrackForm';
import { updateTrack, addNewTrack } from '../helpers/restTracks';
import { getItems } from '../helpers/restItems';
import addItems from '../actions/items';
import getItemTitles from '../helpers/getItemTitles';

const EditTrack = ({
  loginUser, history, items, addItems, sameDateTracks, targetDate,
}) => {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const runGetItems = async () => {
    try {
      setError('');
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

  const runUpdateTrack = async (trackId, result, itemId, date) => {
    try {
      setError('');
      await updateTrack(trackId, result, itemId, date);
    } catch {
      setError('Unable to update the track');
    }
  };

  const runAddNewTrack = async (result, itemId, date) => {
    try {
      setError('');
      await addNewTrack(result, itemId, date);
    } catch {
      setError('Unable to create new tracks');
    }
  };

  const handleSubmit = (StrDate, state) => {
    Object.keys(state).forEach((key) => {
      const submitItemId = Number(key);
      const submitItemValue = state[key];

      const sameItemTrack = sameDateTracks.find((track) => track.item_id === submitItemId);
      if (sameItemTrack && submitItemValue) {
        runUpdateTrack(sameItemTrack.id, submitItemValue, submitItemId, StrDate);
      } else if (submitItemValue) {
        runAddNewTrack(submitItemValue, submitItemId, StrDate);
      }
    });
    if (!error) {
      setMsg('Updating track now...');
      setTimeout(() => {
        history.push(`/tracks/${StrDate}`);
      }, 800);
    }
  };
  const itemTitles = getItemTitles(items, sameDateTracks);

  return (loginUser ? (
    <div className="add-track">
      <h1 className="heading">Edit Track</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <TrackForm handleSubmit={handleSubmit} itemTitles={itemTitles} targetDate={targetDate} />
        {msg && <p className="info-msg">{msg}</p>}
        <Link to="/tracks" className="btn">Cancel & Back to Track List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />);
};

const mapStateToProps = (state, props) => ({
  sameDateTracks: state.tracks.filter((track) => track.date === props.match.params.id),
  items: state.items,
  loginUser: state.user.logIn,
  targetDate: Number(props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

EditTrack.propTypes = {
  items: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
  sameDateTracks: PropTypes.instanceOf(Array),
  targetDate: PropTypes.number,
};

EditTrack.defaultProps = {
  items: [],
  history: null,
  addItems: null,
  sameDateTracks: [],
  targetDate: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTrack);
