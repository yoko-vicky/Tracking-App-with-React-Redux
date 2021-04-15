import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // const items = this.props;
    /* eslint-disable react/no-unused-state */
    // 以下はitemsじゃなくて記録の方をチェックする必要あり（Edit用に）
    // this.state = {
    //   one: items[0] ? items[0].result : 0,
    //   two: items[1] ? items[1].result : 0,
    //   three: items[2] ? items[2].result : 0,
    //   four: items[3] ? items[3].result : 0,
    //   five: items[4] ? items[4].result : 0,
    //   six: items[5] ? items[5].result : 0,
    //   /* eslint-enable react/no-unused-state */
    // };
  }

  onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.one);
  }

  handleChange = (e, nameStr) => {
    const { value } = e.target;
    this.setState(() => ({ [nameStr]: value }));
  }

  render() {
    const { items } = this.props;

    return (
      <div>
        <h1>Track Form</h1>
        <form onSubmit={this.onSubmit} className="track-form form">
          {items.length > 0 && items.map((item, index) => {
            const {
              id, icon, title, unit,
            } = item;
            const names = ['one', 'two', 'three', 'four', 'five', 'six'];
            return (
              <div className="track-form__group" key={id}>
                <span className="iconify" data-icon={icon || 'bi:pen-fill'} data-inline="false" />
                <label className="track-form__label" htmlFor={title}>{title}</label>
                <input
                  type="number"
                  name={names[index]}
                  className="track-form__input"
                  onChange={(e) => this.handleChange(e, names[index])}
                />
                <span className="track-form__unit">{unit}</span>
              </div>
            );
          })}

          <button type="submit" className="btn">Save Track</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
});

TrackForm.propTypes = {
  items: PropTypes.instanceOf(Array),
};

TrackForm.defaultProps = {
  items: [],
};

export default connect(mapStateToProps)(TrackForm);
