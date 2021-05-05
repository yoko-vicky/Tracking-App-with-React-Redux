import axios from 'axios';
import {
  getTracks, addNewTrack, updateTrack, removeTrackFromDB,
} from '../../helpers/restTracks';
import tracks from '../fixtures/tracks';

jest.mock('axios');

describe('restTracks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('should fetch the items data', async () => {
    axios.get.mockResolvedValue({ data: tracks });
    const response = await getTracks();
    expect(response.length).toEqual(7);
  });

  test('should return error if it is unable to fetch', async () => {
    const error = 'Unable to fetch the data';
    axios.get.mockRejectedValue(error);
    const response = await getTracks();
    expect(response).toEqual(error);
  });
  test('should add a new item', async () => {
    const track = tracks[0];
    const newTrack = {
      result: track.result,
      itemId: track.item_id,
      date: track.date,
    };
    axios.post.mockResolvedValue(track);
    const response = await addNewTrack(newTrack);
    await expect(response).toEqual(track);
  });

  test('should return error if it is unable to add new item', async () => {
    const track = tracks[0];
    const newTrack = {
      result: track.result,
      itemId: track.item_id,
      date: track.date,
    };
    const error = 'Unable to add the data';
    axios.post.mockRejectedValue(error);
    const response = await addNewTrack(newTrack);
    expect(response).toEqual(error);
  });
  test('should update the data', async () => {
    const updatedTrack = {
      id: tracks[0].id,
      result: 777,
      itemId: tracks[0].item_id,
      date: tracks[0].date,
    };
    axios.put.mockResolvedValue({
      data: {
        ...tracks[0],
        ...updatedTrack,
      },
    });
    const response = await updateTrack(updatedTrack);
    expect(response.data.result).toEqual(777);
  });

  test('should return error if it is unable to update', async () => {
    const updatedTrack = {
      id: tracks[0].id,
      result: 777,
      itemId: tracks[0].item_id,
      date: tracks[0].date,
    };
    const error = 'Unable to fetch the data';
    axios.put.mockRejectedValue(error);
    const response = await updateTrack(updatedTrack);
    expect(response).toEqual(error);
  });

  test('should remove the data', async () => {
    axios.delete.mockResolvedValue({ status: 'ok' });
    const response = await removeTrackFromDB(tracks[1].id);
    expect(response.status).toEqual('ok');
  });

  test('should return error if it is unable to delete', async () => {
    const error = 'Unable to delete the data';
    axios.delete.mockRejectedValue(error);
    const response = await removeTrackFromDB(tracks[1].id);
    expect(response).toEqual(error);
  });
});
