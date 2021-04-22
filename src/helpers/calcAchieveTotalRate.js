const calcAchieveTotalRate = (sameDateTracks, itemNum) => {
  const totalTrackRates = sameDateTracks
    .reduce((acm, rec) => {
      const rate = rec.result / rec.target;
      return acm + ((rate >= 1 ? 1 : rate) * 100);
    }, 0);
  return Math.floor(totalTrackRates / itemNum);
};

export default calcAchieveTotalRate;
