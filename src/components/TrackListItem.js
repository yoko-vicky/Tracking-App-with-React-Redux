import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TrackListItem = ({ track }) => {
  console.log('TrackListItem', track);
  return (
    <div className="TrackListItem">
      <Link to={`/track/${track.id}`}>
        <h2>
          Track ID:
          {track.id}
        </h2>
        <div>
          item Id:
          {track.item_id}
        </div>
        <div>
          <p>
            date:
            {track.date}
          </p>
          <p>
            result:
            {track.result}
          </p>
        </div>
      </Link>
    </div>
  );
};

TrackListItem.propTypes = {
  track: PropTypes.instanceOf(Object),
};

TrackListItem.defaultProps = {
  track: {},
};

export default TrackListItem;
