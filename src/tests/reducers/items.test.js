import ItemsReducer from '../../reducers/items';
import items from '../fixtures/items';

describe('ItemsReducer', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = [];
  });

  test('should set default items values', () => {
    const state = ItemsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  test('should set items with passed item object', () => {
    const action = {
      type: 'ADD_ITEMS',
      items,
    };
    const state = ItemsReducer(undefined, action);
    expect(state).toEqual(items);
  });
});
