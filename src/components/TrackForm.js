import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import pluralize from 'pluralize';

const TrackForm = ({ items, handleSubmit, itemTitles }) => {
  const [error, setError] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [state, setState] = useState(itemTitles);

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleInputChange = (value, nameItemNum) => {
    if (value.match(/^[0-9\s]{0,4}$/)) {
      setState({ ...state, [nameItemNum]: value.trim() });
    } else {
      setError('Please provide only integers with maximum 4 digits');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedDate = String(moment(date).valueOf());
    handleSubmit(formattedDate, state);
  };

  return (
    <div className="track-form">
      {error && <p className="error-msg">{error}</p>}
      <form className="track-form__form mb3" onSubmit={onSubmit}>
        <div className="track-form__date">
          <input type="date" onChange={onDateChange} value={date} />
        </div>
        <div className="track-form__group mb3">
          {items.map((item) => (
            <div className="track-form__item" key={item.id}>
              <div className="track-form__icon">
                <span className="iconify" data-icon={item.icon} data-inline="false" />
              </div>
              <div className="track-form__title">{item.title}</div>
              <input
                type="number"
                name={item.title}
                className="track-form__input"
                maxLength="4"
                onChange={(e) => handleInputChange(e.target.value, item.id)}
                // eslint-disable-next-line dot-notation
                value={state[item.id]}
              />
              <div className="track-form__unit">{pluralize(item.unit, state[item.id])}</div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
});

TrackForm.propTypes = {
  items: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func,
  itemTitles: PropTypes.instanceOf(Object),
};

TrackForm.defaultProps = {
  items: [],
  handleSubmit: null,
  itemTitles: {},
};

export default connect(mapStateToProps)(TrackForm);
