import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import getAvgAchieveRateForMonth from '../helpers/progress';
import { getTracks } from '../helpers/restTracks';
import { addTracks } from '../actions/tracks';
import { addTrackDates } from '../actions/trackDates';

const Progress = ({
  addTracks, loginUser, addTrackDates, trackDates, tracks,
}) => {
  const [error, setError] = useState('');
  const [arMonth, setArMonth] = useState(0);

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
      runGetTracks();
      setTimeout(() => {
        const avgAchieveRateForMonth = getAvgAchieveRateForMonth(trackDates, tracks);
        setArMonth(avgAchieveRateForMonth);
      }, 500);
    }
  }, []);

  return loginUser ? (
    <div className="progress">
      <h1 className="heading">Your Progress</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="progress__header">
          {`Your avarage achievements rate for the last 30 days: ${arMonth} %`}
        </div>
        <div className="progress__graph">
          your achivements graph for the last 2 weeks? 1 week?
        </div>
        <div className="progress__items">
          <div className="progress__item">
            Your total score for item1
          </div>
          <div className="progress__item">
            Your total score for item2
          </div>
          <div className="progress__item">
            Your total score for item3
          </div>
          <div className="progress__item">
            Your total score for item4
          </div>
          <div className="progress__item">
            Your total score for item5
          </div>
          <div className="progress__item">
            Your total score for item6
          </div>
        </div>
        <div className="progress__share">Share</div>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  trackDates: state.trackDates,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addTracks: (tracks) => dispatch(addTracks(tracks)),
  addTrackDates: (trackDates) => dispatch(addTrackDates(trackDates)),
});

Progress.propTypes = {
  addTracks: PropTypes.func,
  addTrackDates: PropTypes.func,
  trackDates: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  tracks: PropTypes.instanceOf(Array),
};

Progress.defaultProps = {
  addTracks: null,
  addTrackDates: null,
  trackDates: [],
  tracks: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
