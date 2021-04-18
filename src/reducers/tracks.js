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

// const tracks = [{
//   date: '2021-04-13 00:00:00 +0000',
//   result: {
//     item1: '',
//     item2: '',
//     item3: '',
//     item4: '',
//     item5: '',
//     item6: '',
//   },
// }];
