import addItems from '../../actions/items';
import items from '../fixtures/items';

describe('Item', () => {
  test('should return item action object with a give item object', () => {
    const action = addItems(items);
    expect(action).toEqual({
      type: 'ADD_ITEMS',
      items,
    });
  });
  test('should return addItems default action object if no argument is given', () => {
    const action = addItems();
    expect(action).toEqual({
      type: 'ADD_ITEMS',
      items: [],
    });
  });
});
