import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackListItem from '../components/TrackListItem';
import { getTracks } from '../helpers/restTracks';
import { addTracks } from '../actions/tracks';
import { addTrackDates } from '../actions/trackDates';

const TrackList = ({
  addTracks, tracks, loginUser, addTrackDates,
}) => {
  const [error, setError] = useState('');

  const runGetTracks = async () => {
    try {
      const response = await getTracks();
      if (response) {
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
    if (loginUser) { runGetTracks(); }
  }, []);

  return loginUser ? (
    <div className="TrackList">
      <h1 className="heading">All tracks</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="tracks mb3">
          {tracks.length > 0 && tracks.map((eachTrack) => (
            <TrackListItem track={eachTrack} key={eachTrack.id} />
          ))}
        </div>
        <Link to="track/create" className="btn">Add New Track</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  addTracks: (tracks) => dispatch(addTracks(tracks)),
  addTrackDates: (trackDates) => dispatch(addTrackDates(trackDates)),
});

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  loginUser: state.user.logIn,
});

TrackList.propTypes = {
  addTracks: PropTypes.func,
  addTrackDates: PropTypes.func,
  tracks: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
};

TrackList.defaultProps = {
  addTracks: null,
  addTrackDates: null,
  tracks: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
