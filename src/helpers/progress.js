import moment from 'moment';

// Avarage achievements rate for the last 30 days
const getAvarageAchievemnetsRateForMonth = (trackDates, tracks) => {
  const today = moment().valueOf();
  const oneMonthBefore = moment().subtract(1, 'month').valueOf();
  const trackDatesForThisMonth = trackDates
    .filter((track) => {
      const momentedTrack = moment(Number(track)).valueOf();
      return momentedTrack <= today && momentedTrack >= oneMonthBefore;
    });
  const arrForAchiveRateForMonth = [];
  trackDatesForThisMonth.forEach((trackDate) => {
    const sameDateTracks = tracks.filter((track) => track.date === trackDate);
    const totalRatesForDay = sameDateTracks
      .reduce((acm, rec) => acm + ((rec.result / rec.target) * 100), 0);
    const achiveRateForDay = totalRatesForDay / sameDateTracks.length;
    arrForAchiveRateForMonth.push(achiveRateForDay);
  });
  const totalRatesForMonth = arrForAchiveRateForMonth.reduce((accum, rate) => accum + rate, 0);
  return Math.floor(totalRatesForMonth / arrForAchiveRateForMonth.length);
};

export default getAvarageAchievemnetsRateForMonth;
