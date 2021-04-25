import { addTracks, removeAllTracks } from '../../actions/tracks';
import tracks from '../fixtures/tracks';

describe('trackDates', () => {
  test('should return addTracks action object with a give tracks object', () => {
    const action = addTracks(tracks);
    expect(action).toEqual({
      type: 'ADD_TRACKS',
      tracks,
    });
  });
  test('should return addTracks default action object if no argument is given', () => {
    const action = addTracks();
    expect(action).toEqual({
      type: 'ADD_TRACKS',
      tracks: [],
    });
  });
  test('should return removeTracks action object', () => {
    const action = removeAllTracks();
    expect(action).toEqual({
      type: 'REMOVE_ALL_TRACKS',
    });
  });
});
