// const defaultTracksState = [];

// const tracksReducer = (state = defaultTracksState, action) => {
//   switch (action.type) {
//     case 'Add_TRACK':
//       return [
//         ...state,
//         action.track,
//       ];
//     case 'EDIT_TRACK':
//       return state.map((item) => (item.id === action.id ? { ...item, ...action.track } : item));
//     case 'REMOVE_TRACK':
//       return state.filter(({ id }) => id !== action.id);
//     default:
//       return state;
//   }
// };
// export default tracksReducer;
