import axios from 'axios';
import { signedUp, loggedIn } from '../../helpers/authUsers';
import { user } from '../fixtures/user';

jest.mock('axios');

describe('authUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('should sign up the user', async () => {
    const newUser = {
      username: 'vicky',
      password: 'test123',
    };
    axios.post.mockResolvedValue({ data: user });
    const response = await signedUp(newUser.username, newUser.password);
    expect(response).toEqual(user);
  });

  test('should return error if it is unable to sign up', async () => {
    const newUser = {
      username: 'vicky',
      password: 'test123',
    };
    const error = 'Unable to sign up';
    axios.post.mockRejectedValue(error);
    const response = await signedUp(newUser.username, newUser.password);
    expect(response).toEqual(error);
  });
  test('should login the user', async () => {
    axios.post.mockResolvedValue({ data: user });
    const response = await loggedIn(user.username, user.password);
    expect(response).toEqual(user);
  });

  test('should return error if it is unable to login', async () => {
    const error = 'Unable to sign up';
    axios.post.mockRejectedValue(error);
    const response = await loggedIn(user.username, user.password);
    expect(response).toEqual(error);
  });
});
