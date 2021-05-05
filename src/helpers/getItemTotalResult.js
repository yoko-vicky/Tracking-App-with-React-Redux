import { moment } from './api';

const getItemTotalResult = (item, tracks) => {
  const sameItemTracks = tracks.filter((track) => {
    const matchId = track.item_id === item.id;
    const targetDate = moment(Number(track.date));
    const thisMonth = targetDate.isSameOrBefore(moment()) && targetDate.isAfter(moment().subtract(1, 'months'));
    return matchId && thisMonth;
  });
  const totalResultForItem = sameItemTracks.reduce((acm, track) => acm + track.result, 0);
  return totalResultForItem;
};

export default getItemTotalResult;
