import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UsersForm from '../../components/UsersForm';
import createTestStore from '../fixtures/createTestStore';

describe('UsersForm', () => {
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
            <UsersForm handleSubmit={handleSubmit} />
          </MemoryRouter>
        </Provider>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
