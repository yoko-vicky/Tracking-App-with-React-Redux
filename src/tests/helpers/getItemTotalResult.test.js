import getItemTotalResult from '../../helpers/getItemTotalResult';
import items from '../fixtures/items';
import tracks from '../fixtures/tracks';

describe('getItemTotalResult', () => {
  test('should return the total result for each item for last month', () => {
    const result = getItemTotalResult(items[0], tracks);
    expect(result).toEqual(10);
  });

  test('should return 0 if the items and tracks are empty arrays', () => {
    const result = getItemTotalResult([], []);
    expect(result).toEqual(0);
  });
});
