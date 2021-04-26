import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TrackForm from '../../components/TrackForm';
import createTestStore from '../fixtures/createTestStore';

describe('TrackForm', () => {
  let store;
  beforeEach(() => {
    store = createTestStore();
  });
  test('should match with snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <TrackForm />
          </MemoryRouter>
        </Provider>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
