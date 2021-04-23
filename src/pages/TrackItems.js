import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Chart from 'react-google-charts';
import { getItems } from '../helpers/restItems';
import { addTracks } from '../actions/tracks';
import { addTrackDates } from '../actions/trackDates';
import { removeTrackFromDB, getTracks } from '../helpers/restTracks';
import TrackItem from '../components/TrackItem';
import addItems from '../actions/items';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';

const TrackItems = ({
  sameDateTracks,
  items,
  loginUser,
  addItems,
  date,
  trackDates,
  currentIndex,
  history,
  addTracks,
  addTrackDates,
}) => {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

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

  const runRemoveTrackFromDB = async (id) => {
    try {
      setError('');
      await removeTrackFromDB(id);
    } catch {
      setError('Sorry, unable to remove the item');
    }
  };

  const handleRemoveTrack = () => {
    sameDateTracks.forEach((track) => {
      runRemoveTrackFromDB(track.id);
    });
    if (!error) {
      setMsg('Removing now...');
      setTimeout(() => {
        history.push('/tracks');
      }, 800);
    }
  };

  const totalRate = calcAchieveTotalRate(sameDateTracks, items.length) || 0;
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
                  1: { color: '#eaeef1' },
                },
              }}
              rootProps={{ 'data-testid': '6' }}
            />
          </div>
          <div className="items__chart__comment">
            {`Achievements rate: ${rateForChart} %`}
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
        {msg && <p className="info-msg">{msg}</p>}
        <Link to={`/track/${Number(date)}/edit`} className="btn dark mb3">Edit this track</Link>
        <button type="button" onClick={handleRemoveTrack} className="btn mb2 warn">Remove this track</button>
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
  addTracks: (tracks) => dispatch(addTracks(tracks)),
  addTrackDates: (trackDates) => dispatch(addTrackDates(trackDates)),
});

TrackItems.propTypes = {
  addTracks: PropTypes.func,
  addTrackDates: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  sameDateTracks: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Object),
  addItems: PropTypes.func,
  date: PropTypes.number,
  trackDates: PropTypes.instanceOf(Array),
  currentIndex: PropTypes.number,
};

TrackItems.defaultProps = {
  addTracks: null,
  addTrackDates: null,
  history: null,
  sameDateTracks: [],
  items: [],
  addItems: null,
  date: 0,
  trackDates: [],
  currentIndex: -1,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItems);
