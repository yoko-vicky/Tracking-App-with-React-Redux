const defaultUserState = {
  loggedIn: '',
  user: {},
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default userReducer;
