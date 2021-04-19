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
  const [totalRate, setTotalRate] = useState(0);
  let achiveTotalRate = [];

  // console.log(sameDateTracks);
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

  const resultForItem = (itemId) => {
    const targetTrack = sameDateTracks.find((track) => track.item_id === itemId);
    if (!targetTrack) return 0;

    return Number(targetTrack.result);
  };

  const calcAchivementRate = (record, target) => Math.floor((record / target) * 100);
  const calcAchiveTotalRate = () => {
    const filteredRates = achiveTotalRate.filter((rate) => rate !== 0);
    const totalRates = filteredRates.reduce((acm, rate) => acm + rate, 0);
    setTotalRate(Math.floor(totalRates / filteredRates.length));
  };

  useEffect(() => {
    if (loginUser) {
      runGetItems();
    }
    if (achiveTotalRate.length > 0) {
      calcAchiveTotalRate();
    }
    return () => {
      // ページ遷移したらstateを消す
      achiveTotalRate = [];
      setTotalRate(0);
    };
  }, []);

  return loginUser ? (
    <div className="items">
      {error && <p className="error-msg">{error}</p>}
      <h1 className="heading">Track it</h1>
      <div className="items__header">
        <div className="items__date">
          <Link to={trackDates[currentIndex - 1]}>&lt;</Link>
          <span>{moment(date).format('MMM Do YYYY')}</span>
          <Link to={trackDates[currentIndex + 1]}>&gt;</Link>
        </div>
        <div className="items__overview">
          Graph for
          {`achivements rate: ${totalRate} %`}
        </div>
      </div>
      <div className="content">
        <div className="items__list">
          {items.map((item) => {
            const record = resultForItem(item.id);
            const achivementRate = calcAchivementRate(record, item.target);
            achiveTotalRate.push(achivementRate);
            return (
              <TrackItem
                key={item.id}
                item={item}
                record={record}
                achivementRate={achivementRate}
              />
            );
          })}
        </div>
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
