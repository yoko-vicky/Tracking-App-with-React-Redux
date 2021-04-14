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
