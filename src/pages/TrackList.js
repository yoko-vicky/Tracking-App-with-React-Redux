import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackListItem from '../components/TrackListItem';
import { getTracks } from '../helpers/restTracks';
import { addTracks } from '../actions/tracks';

const TrackList = ({ addTracks, tracks, loginUser }) => {
  const [error, setError] = useState('');

  const runGetTracks = async () => {
    try {
      const response = await getTracks();
      if (response.length > 0) {
        addTracks(response);
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
});

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  loginUser: state.user.logIn,
});

TrackList.propTypes = {
  addTracks: PropTypes.func.isRequired,
  tracks: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
};

TrackList.defaultProps = {
  tracks: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
