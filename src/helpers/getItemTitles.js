const getItemTitles = (items, theDayTracks = undefined) => {
  const titles = {};
  items.forEach((item) => {
    const targetTrack = theDayTracks ? theDayTracks.find((tr) => tr.item_id === item.id) : null;
    titles[item.id] = targetTrack ? targetTrack.result : '';
  });
  return titles;
};

export default getItemTitles;
