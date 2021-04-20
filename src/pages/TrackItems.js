import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getItems } from '../helpers/restItems';
import TrackItem from '../components/TrackItem';
import addItems from '../actions/items';

const TrackItems = ({
  sameDateTracks, items, loginUser, addItems, date, trackDates, currentIndex,
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

  const calcAchiveTotalRate = () => {
    const totalTrackRates = sameDateTracks
      .map((tr) => Math.floor((tr.result / tr.target) * 100))
      .reduce((acm, tr) => acm + tr, 0);
    const totalRate = Math.floor(totalTrackRates / sameDateTracks.length);
    return totalRate;
  };

  useEffect(() => {
    if (loginUser) {
      runGetItems();
    }
  }, []);

  return loginUser ? (
    <div className="items">
      {error && <p className="error-msg">{error}</p>}
      <h1 className="heading">Track it</h1>
      <div className="items__header">
        <div className="items__date">
          <Link to={trackDates[currentIndex - 1] || currentIndex}>&lt;</Link>
          <span>{moment(date).format('MMM Do YYYY')}</span>
          <Link to={trackDates[currentIndex + 1] || currentIndex}>&gt;</Link>
        </div>
        <div className="items__overview">
          Graph for
          {`achivements rate: ${calcAchiveTotalRate() || '0'} %`}
        </div>
      </div>
      <div className="content">
        <div className="items__list mb3">
          {items.map((item) => {
            const targetTrack = sameDateTracks.find((track) => track.item_id === item.id);
            return (
              <TrackItem key={item.id} item={item} targetTrack={targetTrack} />
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
