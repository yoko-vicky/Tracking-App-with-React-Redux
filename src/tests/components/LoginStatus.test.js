import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LoginStatus from '../../components/LoginStatus';
import createTestStore from '../fixtures/createTestStore';

describe('LoginStatus', () => {
  let store;
  beforeEach(() => {
    store = createTestStore();
  });
  test('should match with snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <LoginStatus />
          </MemoryRouter>
        </Provider>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
