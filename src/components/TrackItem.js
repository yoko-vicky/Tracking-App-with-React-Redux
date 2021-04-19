import React from 'react';
import PropTypes from 'prop-types';

const TrackItem = ({ item, record, achivementRate }) => {
  const {
    id, icon, unit, title, target,
  } = item;

  return (
    <div className="items__item">
      <div className="items__icon">
        <span className="iconify" data-icon={icon || 'bi:pen-fill'} data-inline="false" />
      </div>
      <div className="items__text">
        <div className="items__title">{`${id} ${title}`}</div>
        <div className="items__result">
          <span className="items__result__num">{record}</span>
          <span className="items__result__unit">{`${unit} / ${target}`}</span>
        </div>
        <div className="items__rate">{`Achivement rate: ${achivementRate} %`}</div>
      </div>
    </div>
  );
};

TrackItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  record: PropTypes.number,
  achivementRate: PropTypes.number,
};

TrackItem.defaultProps = {
  item: {},
  record: 0,
  achivementRate: 0,
};

export default TrackItem;
