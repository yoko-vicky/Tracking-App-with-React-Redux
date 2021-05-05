export const addTrackDates = (trackDates = []) => ({
  type: 'ADD_TRACK_DATES',
  trackDates,
});

export const removeAllTrackDates = () => ({
  type: 'REMOVE_ALL_TRACK_DATES',
});
