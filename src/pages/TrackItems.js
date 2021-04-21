import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Chart from 'react-google-charts';
import { getItems } from '../helpers/restItems';
import TrackItem from '../components/TrackItem';
import addItems from '../actions/items';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';

const TrackItems = ({
  sameDateTracks, items, loginUser, addItems, date, trackDates, currentIndex,
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

  useEffect(() => {
    if (loginUser) {
      runGetItems();
    }
  }, []);

  const totalRate = calcAchieveTotalRate(sameDateTracks) || 0;
  const rateForChart = totalRate >= 100 ? 100 : totalRate;
  const leftRateForChart = 100 - rateForChart;

  return loginUser ? (
    <div className="items">
      {error && <p className="error-msg">{error}</p>}
      <h1 className="heading">Track it</h1>
      <div className="items__header">
        <div className="items__date">
          <Link to={trackDates[currentIndex - 1] || trackDates[currentIndex]}>&lt;</Link>
          <span>{moment(date).format('MMM Do YYYY')}</span>
          <Link to={trackDates[currentIndex + 1] || trackDates[currentIndex]}>&gt;</Link>
        </div>
        <div className="items__overview">
          <div className="items__chart__container">
            <Chart
              width="180px"
              height="180px"
              chartType="PieChart"
              loader={<div className="loader">Loading...</div>}
              data={[['Pac Man', 'Percentage'], ['', rateForChart], ['', leftRateForChart]]}
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
          </div>
          <div className="items__chart__comment">
            {`Achievements rate: ${calcAchieveTotalRate(sameDateTracks) || '0'} %`}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="items__list mb3">
          {items.map((item) => {
            const targetTrack = sameDateTracks.find((track) => track.item_id === item.id);
            return (
              <TrackItem
                key={item.id}
                item={item}
                result={targetTrack ? targetTrack.result : 0}
                targetDate={date}
              />
            );
          })}
        </div>
        <Link to="/tracks" className="btn">Back to all tracks</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  sameDateTracks: state.tracks.filter((track) => track.date === props.match.params.id),
  items: state.items,
  trackDates: state.trackDates,
  loginUser: state.user.logIn,
  date: Number(props.match.params.id),
  currentIndex: state.trackDates.findIndex((date) => date === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addItems: (items) => dispatch(addItems(items)),
});

TrackItems.propTypes = {
  sameDateTracks: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
  date: PropTypes.number,
  trackDates: PropTypes.instanceOf(Array),
  currentIndex: PropTypes.number,
};

TrackItems.defaultProps = {
  sameDateTracks: [],
  items: [],
  addItems: null,
  date: 0,
  trackDates: [],
  currentIndex: -1,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItems);
