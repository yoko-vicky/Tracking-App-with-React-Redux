import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Chart from 'react-google-charts';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';

const TrackListItem = ({ milSec, sameDateTracks }) => {
  const [dateSign, setDateSign] = useState('');

  const checkDateSign = () => {
    const today = moment();
    const formattedToday = today.format('MMM Do YYYY');
    const formattedYesterday = today.subtract(1, 'days').format('MMM Do YYYY');
    const formattedLastweek = today.subtract(7, 'days').format('MMM Do YYYY');
    const momentMilSec = moment(milSec);
    const formattedMilSec = momentMilSec.format('MMM Do YYYY');

    if (formattedMilSec === formattedToday) {
      setDateSign('today');
    } else if (formattedMilSec === formattedYesterday) {
      setDateSign('yesterday');
    } else if (formattedMilSec <= formattedLastweek) {
      setDateSign('lastweek');
    }
  };

  const setBeforeSign = () => {
    const beforeArray = Array.from(document.querySelectorAll('.lastweek'));
    if (beforeArray.classList) {
      beforeArray[0].classList.add('first');
      beforeArray[0].firstElementChild.textContent = 'before last week';
    }
  };

  useEffect(() => {
    checkDateSign();
    setTimeout(() => {
      setBeforeSign();
    }, 1000);
  }, []);

  const AchievementRate = calcAchieveTotalRate(sameDateTracks);
  const rateForChart = AchievementRate >= 100 ? 100 : AchievementRate;
  const leftRateForChart = 100 - rateForChart;
  return (
    <div className={`tracks__item ${dateSign}`}>
      <div className="tracks__item__sign">{dateSign !== 'lastweek' ? dateSign : ''}</div>
      <Link to={`/tracks/${milSec}`} className="tracks__item__link">
        <div className="tracks__item__graph">
          <Chart
            width="40px"
            height="40px"
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
        <div className="tracks__item__date">{moment(milSec).format('MMM Do YYYY')}</div>
        <div className="tracks__item__rate">
          {AchievementRate >= 100 && (
            <span className="goodjob">
              <span className="iconify" data-icon="si-glyph:champion-cup" data-inline="false" />
            </span>
          )}
          <span className="rate">{AchievementRate}</span>
          %
        </div>
        <div className="tracks__item__toright">
          <span className="iconify" data-icon="akar-icons:chevron-right" data-inline="false" />
        </div>
      </Link>
    </div>
  );
};

TrackListItem.propTypes = {
  milSec: PropTypes.number,
  sameDateTracks: PropTypes.instanceOf(Array),
};

TrackListItem.defaultProps = {
  milSec: 0,
  sameDateTracks: [],
};

export default TrackListItem;
