import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

const TrackItem = ({ item, result, targetDate }) => {
  const {
    icon, unit, title, target,
  } = item;
  const rate = result / target;
  const AchievementRate = Math.floor((rate >= 1 ? 1 : rate) * 100);

  return (
    <div className="items__item">
      <Link to={`/track/${Number(targetDate)}/edit`} className="items__item-link">
        <div className="items__icon">
          <span className="iconify" data-icon={icon || 'bi:pen-fill'} data-inline="false" />
        </div>
        <div className="items__text">
          <div className="items__title">{title}</div>
          <div className="items__result">
            <span className="items__result__num">{result || '0'}</span>
            <span className="items__result__unit">{`${pluralize(unit, result)} / ${target}`}</span>
          </div>
          <div className="items__rate">{`Achievement rate: ${AchievementRate || '0'} %`}</div>
        </div>
      </Link>
    </div>
  );
};

TrackItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  result: PropTypes.number,
  targetDate: PropTypes.number,
};

TrackItem.defaultProps = {
  item: {},
  result: 0,
  targetDate: 0,
};

export default TrackItem;
