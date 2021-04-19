const defaultTrackDatesState = [];

const trackDatesReducer = (state = defaultTrackDatesState, action) => {
  switch (action.type) {
    case 'ADD_TRACK_DATES':
      return action.trackDates;
    case 'REMOVE_ALL_TRACK_DATES':
      return defaultTrackDatesState;
    default:
      return state;
  }
};
export default trackDatesReducer;
