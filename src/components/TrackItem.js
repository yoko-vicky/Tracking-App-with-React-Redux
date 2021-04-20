import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable camelcase */
const TrackItem = ({ item, targetTrack }) => {
  const {
    icon, unit, title, target,
  } = item;
  const { result } = targetTrack;
  const achivementRate = Math.floor((result / target) * 100);

  return (
    <div className="items__item">
      <div className="items__icon">
        <span className="iconify" data-icon={icon || 'bi:pen-fill'} data-inline="false" />
      </div>
      <div className="items__text">
        <div className="items__title">{title}</div>
        <div className="items__result">
          <span className="items__result__num">{result || '0'}</span>
          <span className="items__result__unit">{`${unit} / ${target}`}</span>
        </div>
        <div className="items__rate">{`Achivement rate: ${achivementRate || '0'} %`}</div>
      </div>
    </div>
  );
};

TrackItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  targetTrack: PropTypes.instanceOf(Object),
};

TrackItem.defaultProps = {
  item: {},
  targetTrack: {},
};

export default TrackItem;
