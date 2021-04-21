const calcAchieveTotalRate = (sameDateTracks) => {
  const totalTrackRates = sameDateTracks
    .map((tr) => Math.floor((tr.result / tr.target) * 100))
    .reduce((acm, tr) => acm + tr, 0);
  return Math.floor(totalTrackRates / sameDateTracks.length);
};

export default calcAchieveTotalRate;
