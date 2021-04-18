export const addTracks = (tracks = []) => ({
  type: 'ADD_TRACKS',
  tracks,
});

export const removeAllTracks = () => ({
  type: 'REMOVE_ALL_TRACKS',
});
