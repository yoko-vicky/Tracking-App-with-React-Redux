import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TrackItem from '../../components/TrackItem';
import createTestStore from '../fixtures/createTestStore';
import items from '../fixtures/items';

describe('TrackItem', () => {
  let store;
  beforeEach(() => {
    store = createTestStore();
  });
  test('should match with snapshot', () => {
    const handleSubmit = jest.fn();
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <TrackItem
              handleSubmit={handleSubmit}
              item={items[0]}
              result={100}
              targetDate={items[0].date}
            />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
