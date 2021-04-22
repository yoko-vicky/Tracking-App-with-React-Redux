import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
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
      }, 1000);
    }
  }, []);

  const percentForChart = arMonth >= 100 ? 100 : arMonth;
  const leftPercentForChart = 100 - percentForChart;
  return loginUser ? (
    <div className="progress">
      <h1 className="heading">Your Progress</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="progress__header">
          <Chart
            width="300px"
            height="300px"
            chartType="PieChart"
            loader={<div className="loader">Loading...</div>}
            data={[['Pac Man', 'Percentage'], ['', percentForChart], ['', leftPercentForChart]]}
            options={{
              legend: 'none',
              pieSliceText: 'none',
              pieStartAngle: 0,
              tooltip: { trigger: 'none' },
              slices: {
                0: { color: '#41b5e8' },
                1: { color: 'transparent' },
              },
            }}
            rootProps={{ 'data-testid': '6' }}
          />
          {`Your avarage achievements rate for the last 30 days: ${arMonth} %`}
        </div>
        <div className="progress__graph">
          your achivements graph for the last 2 weeks? 1 week?
          <Chart
            width="500px"
            height="300px"
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ['Year', 'Sales', 'Expenses', 'Profit'],
              ['2014', 1000, 400, 200],
              ['2015', 1170, 460, 250],
              ['2016', 660, 1120, 300],
              ['2017', 1030, 540, 350],
            ]}
            options={{
              // Material design options
              chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
              },
            }}
              // For tests
            rootProps={{ 'data-testid': '2' }}
          />
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
