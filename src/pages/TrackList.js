import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moment } from '../helpers/api';
import TrackListItem from '../components/TrackListItem';
import { getTracks } from '../helpers/restTracks';
import { getItems } from '../helpers/restItems';
import { addTracks } from '../actions/tracks';
import addItems from '../actions/items';
import { addTrackDates } from '../actions/trackDates';

const TrackList = ({
  addTracks, loginUser, addTrackDates, trackDates, tracks, items, addItems,
}) => {
  const [error, setError] = useState('');

  const runGetItems = async () => {
    try {
      const response = await getItems();
      if (response.length > 0) {
        setError('');
        addItems(response);
      } else {
        setError('No Items');
      }
    } catch {
      setError('Unable to fetch the item data');
    }
  };

  const runGetTracks = async () => {
    try {
      const response = await getTracks();
      if (response) {
        setError('');
        addTracks(response.records);
        addTrackDates(response.record_dates);
      } else {
        setError('No Tracks');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (loginUser) {
      runGetItems();
      runGetTracks();
    }
  }, []);

  return loginUser ? (
    <div className="TrackList">
      <h1 className="heading">All tracks</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="tracks mb3">
          {trackDates.length > 0 && trackDates.map((trackDate) => {
            const milSec = Number(trackDate);
            const sameDateTracks = tracks.filter((track) => moment(Number(track.date)).isSame(moment(milSec), 'day'));

            return (
              <TrackListItem
                milSec={milSec}
                key={milSec}
                sameDateTracks={sameDateTracks}
                itemNum={items.length}
              />
            );
          })}
        </div>
        <Link to="track/create" className="btn dark">Add New Track</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  addTracks: (tracks) => dispatch(addTracks(tracks)),
  addTrackDates: (trackDates) => dispatch(addTrackDates(trackDates)),
  addItems: (items) => dispatch(addItems(items)),
});

const mapStateToProps = (state) => ({
  items: state.items,
  tracks: state.tracks,
  trackDates: state.trackDates,
  loginUser: state.user.logIn,
});

TrackList.propTypes = {
  addTracks: PropTypes.func,
  addTrackDates: PropTypes.func,
  addItems: PropTypes.func,
  trackDates: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  tracks: PropTypes.instanceOf(Array),
  items: PropTypes.instanceOf(Array),
};

TrackList.defaultProps = {
  addTracks: null,
  addTrackDates: null,
  addItems: null,
  trackDates: [],
  tracks: [],
  items: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
