import getItemTitles from '../../helpers/getItemTitles';
import items from '../fixtures/items';
import tracks from '../fixtures/tracks';

describe('getItemTitles', () => {
  test('should return items titles corresponding each track', () => {
    const theDayTracks = tracks.filter((track) => track.date === tracks[0].date);
    const titles = getItemTitles(items, theDayTracks);
    const result = {
      1: 10, 2: 10, 3: 5, 4: 5, 5: 20, 6: 120,
    };
    expect(titles).toEqual(result);
  });
  test('should return default items object with empty strings', () => {
    const titles = getItemTitles(items);
    const result = {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: '',
    };
    expect(titles).toEqual(result);
  });
});
