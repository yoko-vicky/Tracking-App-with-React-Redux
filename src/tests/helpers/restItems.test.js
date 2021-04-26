import axios from 'axios';
import {
  getItems, updateItem, addNewItem, removeItemFromDB,
} from '../../helpers/restItems';
import items from '../fixtures/items';

jest.mock('axios');

describe('restItems', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('should fetch the items data', async () => {
    axios.get.mockResolvedValue({ data: items });
    const response = await getItems();
    expect(response.length).toEqual(6);
  });

  test('should return error if it is unable to fetch', async () => {
    const error = 'Unable to fetch the data';
    axios.get.mockRejectedValue(error);
    const response = await getItems();
    expect(response).toEqual(error);
  });
  test('should add a new item', async () => {
    const item = {
      title: 'test item',
      unit: 'test',
      icon: 'test:icon',
      target: 100,
    };
    axios.post.mockResolvedValue(item);
    const response = await addNewItem(item.title, item.unit, item.icon, item.target);
    await expect(response.icon).toEqual('test:icon');
  });

  test('should return error if it is unable to add new item', async () => {
    const item = {
      title: 'test item',
      unit: 'test',
      icon: 'test:icon',
      target: 100,
    };
    const error = 'Unable to fetch the data';
    axios.post.mockRejectedValue(error);
    const response = await addNewItem(item.title, item.unit, item.icon, item.target);
    expect(response).toEqual(error);
  });
  test('should update the data', async () => {
    const updatedItem = {
      id: items[0].id,
      title: 'Updated title',
      unit: 'test',
      icon: 'test:icon',
      target: 100,
    };
    axios.put.mockResolvedValue({
      data: {
        ...items[0],
        ...updatedItem,
      },
    });
    const response = await updateItem(updatedItem);
    expect(response.title).toEqual('Updated title');
  });

  test('should return error if it is unable to update', async () => {
    const updatedItem = {
      id: items[0].id,
      title: 'Updated title',
      unit: 'test',
      icon: 'test:icon',
      target: 100,
    };
    const error = 'Unable to fetch the data';
    axios.put.mockRejectedValue(error);
    const response = await updateItem(updatedItem);
    expect(response).toEqual(error);
  });

  test('should remove the data', async () => {
    axios.delete.mockResolvedValue({ status: 'ok' });
    const response = await removeItemFromDB(items[1].id);
    expect(response.status).toEqual('ok');
  });

  test('should return error if it is unable to delete', async () => {
    const error = 'Unable to delete the data';
    axios.delete.mockRejectedValue(error);
    const response = await removeItemFromDB(items[1].id);
    expect(response).toEqual(error);
  });
});
