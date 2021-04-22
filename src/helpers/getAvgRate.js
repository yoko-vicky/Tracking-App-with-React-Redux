import moment from 'moment';

const calcAvgAchieveRate = (customTrackdates, tracks) => {
  const arrForAchiveRateForMonth = [];
  customTrackdates.forEach((trackDate) => {
    const sameDateTracks = tracks.filter((track) => track.date === trackDate);
    const totalRatesForDay = sameDateTracks
      .reduce((acm, rec) => {
        const rate = rec.result / rec.target;
        return acm + ((rate >= 1 ? 1 : rate) * 100);
      }, 0);
    const achiveRateForDay = totalRatesForDay / sameDateTracks.length;
    arrForAchiveRateForMonth.push(achiveRateForDay);
  });
  const totalRatesForMonth = arrForAchiveRateForMonth.reduce((accum, rate) => accum + rate, 0);
  return Math.floor(totalRatesForMonth / arrForAchiveRateForMonth.length);
};

// Avg achievements rate for the last 30 days
const getAvgAchieveRateForMonth = (trackDates, tracks) => {
  const today = moment();
  const oneMonthAgo = moment().subtract(1, 'months');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(today) && targetTrack.isAfter(oneMonthAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

// Avg achievements rate for the this week => today - 1 week ago
const getAvgAchieveRateForThisWeek = (trackDates, tracks) => {
  const today = moment();
  const oneWeekAgo = moment().subtract(1, 'weeks');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(today) && targetTrack.isAfter(oneWeekAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

// Avg achievements rate for the last week => 1 week ago - 2 week ago
const getAvgAchieveRateForLastWeek = (trackDates, tracks) => {
  const oneWeekAgo = moment().subtract(1, 'weeks');
  const twoWeeksAgo = moment().subtract(2, 'weeks');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(oneWeekAgo) && targetTrack.isAfter(twoWeeksAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

// Avg achievements rate for the last week => 2 weeks ago - 3 week ago
const getAvgAchieveRateForTwoWeeksBefore = (trackDates, tracks) => {
  const twoWeeksAgo = moment().subtract(2, 'weeks');
  const threeWeeksAgo = moment().subtract(3, 'weeks');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(twoWeeksAgo) && targetTrack.isAfter(threeWeeksAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

// Avg achievements rate for the last week => 3 weeks ago - 1 month ago
const getAvgAchieveRateForThreeWeeksBefore = (trackDates, tracks) => {
  const threeWeeksAgo = moment().subtract(3, 'weeks');
  const oneMonthAgo = moment().subtract(1, 'months');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(threeWeeksAgo) && targetTrack.isAfter(oneMonthAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

// Avg achievements rate for the last month =>  1 month ago - 2 month ago
const getAvgAchieveRateForLastMonth = (trackDates, tracks) => {
  const oneMonthAgo = moment().subtract(1, 'months');
  const twoMonthsAgo = moment().subtract(2, 'months');
  const customTrackdates = trackDates
    .filter((track) => {
      const targetTrack = moment(Number(track));
      return targetTrack.isSameOrBefore(oneMonthAgo) && targetTrack.isAfter(twoMonthsAgo);
    });
  return calcAvgAchieveRate(customTrackdates, tracks);
};

const getAvgRate = (trackDates, tracks, type) => {
  switch (type) {
    case 'THIS_MONTH':
      return getAvgAchieveRateForMonth(trackDates, tracks);
    case 'THIS_WEEK':
      return getAvgAchieveRateForThisWeek(trackDates, tracks);
    case 'LAST_WEEK':
      return getAvgAchieveRateForLastWeek(trackDates, tracks);
    case 'TWO_WEEKS_BEFORE':
      return getAvgAchieveRateForTwoWeeksBefore(trackDates, tracks);
    case 'THREE_WEEKS_BEFORE':
      return getAvgAchieveRateForThreeWeeksBefore(trackDates, tracks);
    case 'LAST_MONTH':
      return getAvgAchieveRateForLastMonth(trackDates, tracks);

    default:
      return 0;
  }
};

export default getAvgRate;
