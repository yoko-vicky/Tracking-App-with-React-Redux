import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AdminItemForm from '../../components/AdminItemForm';
import createTestStore from '../fixtures/createTestStore';

describe('AdminItemForm', () => {
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
            <AdminItemForm handleSubmit={handleSubmit} />
          </MemoryRouter>
        </Provider>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
