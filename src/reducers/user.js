const defaultUserState = {
  logIn: true,
  user: {},
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        logIn: action.logIn,
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
