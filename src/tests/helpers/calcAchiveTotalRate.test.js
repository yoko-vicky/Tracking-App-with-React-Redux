import calcAchieveTotalRate from '../../helpers/calcAchieveTotalRate';
import tracks from '../fixtures/tracks';
import items from '../fixtures/items';

describe('calcAchieveTotalRate', () => {
  test('should return the total achievements rate for each day', () => {
    const sameDateTracks = tracks.filter((track) => track.date === tracks[0].date);
    const result = calcAchieveTotalRate(sameDateTracks, items.length);
    expect(result).toEqual(46);
  });

  test('should return 0 is the sameDateTracks isempty', () => {
    const result = calcAchieveTotalRate([], items.length);
    expect(result).toEqual(0);
  });
});
