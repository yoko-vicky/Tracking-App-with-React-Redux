import { addTrackDates, removeAllTrackDates } from '../../actions/trackDates';
import trackDates from '../fixtures/trackDates';

describe('trackDates', () => {
  test('should return addTrackDates action object with a give trackDates object', () => {
    const action = addTrackDates(trackDates);
    expect(action).toEqual({
      type: 'ADD_TRACK_DATES',
      trackDates,
    });
  });
  test('should return addTrackDates default action object if no argument is given', () => {
    const action = addTrackDates();
    expect(action).toEqual({
      type: 'ADD_TRACK_DATES',
      trackDates: [],
    });
  });
  test('should return removeTrackDates action object', () => {
    const action = removeAllTrackDates();
    expect(action).toEqual({
      type: 'REMOVE_ALL_TRACK_DATES',
    });
  });
});
