import userReducer from '../../reducers/user';
import { user } from '../fixtures/user';

describe('userReducer', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      logIn: true,
      user: {},
    };
  });

  test('should set default user values', () => {
    const state = userReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  test('should set login status with passed boolean status', () => {
    const status = true;
    const action = {
      type: 'LOG_IN',
      logIn: status,
    };
    const state = userReducer(undefined, action);
    expect(state.logIn).toEqual(status);
  });
  test('should set user object with a given action object', () => {
    const action = {
      type: 'SET_USER',
      user,
    };
    const state = userReducer(undefined, action);
    expect(state.user).toEqual(user);
  });
});
