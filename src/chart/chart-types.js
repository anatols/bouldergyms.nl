const chartTypes = {
  PERCENTILES: "strength",
  POPULARITY: "popularity",
  COMPARISON: "comparison",
};

export default {
  ...chartTypes,

  validTypes: Object.values(chartTypes),

  mixin: {
    created() {
      this.chartTypes = chartTypes;
    },
  },
};
