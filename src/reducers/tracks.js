const defaultTracksState = [];

const tracksReducer = (state = defaultTracksState, action) => {
  switch (action.type) {
    case 'ADD_TRACKS':
      return action.tracks;
    case 'REMOVE_ALL_TRACKS':
      return defaultTracksState;
    default:
      return state;
  }
};
export default tracksReducer;
