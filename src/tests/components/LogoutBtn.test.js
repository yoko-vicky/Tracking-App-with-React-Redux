import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LogoutBtn from '../../components/LogoutBtn';
import createTestStore from '../fixtures/createTestStore';

describe('LogoutBtn', () => {
  let store;
  beforeEach(() => {
    store = createTestStore();
  });
  test('should match with snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <LogoutBtn />
          </MemoryRouter>
        </Provider>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
