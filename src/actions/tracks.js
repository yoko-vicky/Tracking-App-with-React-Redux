export const addTrack = (track = {}) => ({
  type: 'ADD_TRACK',
  track,
});

export const editTrack = (id, update = {}) => ({
  type: 'EDIT_TRACK',
  id,
  update,
});

export const removeTrack = (id) => ({
  type: 'REMOVE_TRACK',
  id,
});
