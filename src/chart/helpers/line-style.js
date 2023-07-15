function forSeries(highlight) {
  return {
    lineStyle: {
      width: 3,
      shadowBlur: highlight ? 2 : 0,
      shadowColor: "black",
    },
  };
}

export default {
  forSeries,
};
