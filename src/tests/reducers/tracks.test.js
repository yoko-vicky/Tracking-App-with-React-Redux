import tracksReducer from '../../reducers/tracks';
import tracks from '../fixtures/tracks';

describe('tracksReducer', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = [];
  });

  test('should set default tracks values', () => {
    const state = tracksReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  test('should set tracks with passed tracks object', () => {
    const action = {
      type: 'ADD_TRACKS',
      tracks,
    };
    const state = tracksReducer(undefined, action);
    expect(state).toEqual(tracks);
  });
  test('should set default tracks if when the action object includes type of REMOVE_ALL_TRACKS', () => {
    const action = {
      type: 'REMOVE_ALL_TRACKS',
    };
    const state = tracksReducer(undefined, action);
    expect(state).toEqual(defaultState);
  });
});
