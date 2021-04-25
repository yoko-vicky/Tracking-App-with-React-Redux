import trackDatesReducer from '../../reducers/trackDates';
import trackDates from '../fixtures/trackDates';

describe('trackDatesReducer', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = [];
  });

  test('should set default trackDates values', () => {
    const state = trackDatesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  test('should set trackDates with passed trackDates object', () => {
    const action = {
      type: 'ADD_TRACK_DATES',
      trackDates,
    };
    const state = trackDatesReducer(undefined, action);
    expect(state).toEqual(trackDates);
  });
  test('should set default tracks if when the action object includes type of REMOVE_ALL_TRACK_DATES', () => {
    const action = {
      type: 'REMOVE_ALL_TRACK_DATES',
    };
    const state = trackDatesReducer(undefined, action);
    expect(state).toEqual(defaultState);
  });
});
