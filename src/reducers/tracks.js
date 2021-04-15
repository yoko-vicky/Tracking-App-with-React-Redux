const defaultTracksState = [];

const tracksReducer = (state = defaultTracksState, action) => {
  switch (action.type) {
    case 'ADD_TRACK':
      return [
        ...state,
        action.track,
      ];
    case 'EDIT_TRACK':
      return state.map((item) => (item.id === action.id ? { ...item, ...action.update } : item));
    case 'REMOVE_TRACK':
      return state.filter(({ id }) => id !== action.id);
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
