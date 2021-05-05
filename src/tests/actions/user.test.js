import { logIn, setUser } from '../../actions/user';
import { user } from '../fixtures/user';

describe('User', () => {
  test('should return logIn action object with a given boolean login status', () => {
    const status = true;
    const action = logIn(status);
    expect(action).toEqual({
      type: 'LOG_IN',
      logIn: status,
    });
  });
  test('should return logIn default action object if no argument is given', () => {
    const action = logIn();
    expect(action).toEqual({
      type: 'LOG_IN',
      logIn: true,
    });
  });
  test('should return setUser action object with a given boolean login status', () => {
    const action = setUser(user);
    expect(action).toEqual({
      type: 'SET_USER',
      user,
    });
  });
  test('should return setUser default action object if no argument is given', () => {
    const action = setUser();
    expect(action).toEqual({
      type: 'SET_USER',
      user: {},
    });
  });
});
