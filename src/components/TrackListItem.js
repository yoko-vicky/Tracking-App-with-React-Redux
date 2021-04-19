import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TrackListItem = ({ milSec }) => {
  const [dateSign, setDateSign] = useState('');
  // console.log('milSec', milSec);

  const checkDateSign = () => {
    const today = moment();
    const formattedToday = today.format('MMM Do YYYY');
    const formattedYesterday = today.subtract(1, 'days').format('MMM Do YYYY');
    const weekAgoFromToday = today.subtract(7, 'days');
    const momentMilSec = moment(milSec);
    const formattedMilSec = momentMilSec.format('MMM Do YYYY');

    // console.log('weekagoFromToday', weekAgoFromToday);
    // console.log('yesterday', formattedYesterday);
    if (formattedMilSec === formattedToday) {
      setDateSign('Today');
    } else if (formattedMilSec === formattedYesterday) {
      setDateSign('Yesterday');
    } else if (momentMilSec > weekAgoFromToday) {
      setDateSign('Before Last week');
    }
  };

  useEffect(() => {
    checkDateSign();
  }, []);

  return (
    <div className="tracks__item">
      {dateSign && <div className="tracks__item__sign">{dateSign}</div>}
      <Link to={`/tracks/${milSec}`} className="tracks__item__link">
        <div className="tracks__item__graph">&nbsp;</div>
        <div className="tracks__item__date">{moment(milSec).format('MMM Do YYYY')}</div>
        <div className="track__item__rate">
          <span>100</span>
          %
        </div>
        <span className="iconify" data-icon="akar-icons:chevron-right" data-inline="false" />
      </Link>
    </div>
  );
};

TrackListItem.propTypes = {
  milSec: PropTypes.number,
};

TrackListItem.defaultProps = {
  milSec: 0,
};

export default TrackListItem;
