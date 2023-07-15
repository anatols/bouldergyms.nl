<template>
  <div class="stats">
    <div class="container">
      <div class="main-column">
        <div class="header">
          <div v-if="chartType == chartTypes.PERCENTILES">
            <h1>
              What people can climb
            </h1>
            How many climbers are able to climb each grade in a particular gym
            (as a percentage of all visitors of that gym)
          </div>
          <div v-else-if="chartType == chartTypes.POPULARITY">
            <h1>
              Most often climbed grades
            </h1>
            Out of all ascends logged, how many were for a specific grade (as a
            percentage of all ascends for each gym separately)
          </div>
          <div v-else-if="chartType == chartTypes.COMPARISON">
            <h1>
              Grade comparison
            </h1>
            What grade in another gym would be physically as hard as the one in
            yours
          </div>
        </div>
        <StatsChart class="chart" :chart-type="chartType" />
        <ChartLegend
          :enable-my-gym-selection="chartType == chartTypes.COMPARISON"
        />
      </div>
      <GymList />
    </div>
  </div>
</template>

<script>
import chartTypes from "@/chart/chart-types";

import GymList from "@/components/GymList.vue";
import ChartLegend from "@/components/ChartLegend.vue";
import StatsChart from "@/components/StatsChart.vue";

export default {
  name: "Stats",
  mixins: [chartTypes.mixin],
  components: {
    StatsChart,
    GymList,
    ChartLegend,
  },
  computed: {
    chartType() {
      return this.$route.params.chartType;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!chartTypes.validTypes.includes(to.params.chartType)) {
      next({
        path: chartTypes.COMPARISON,
      });
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
}

.container {
  display: flex;
  justify-content: center;
}

.main-column {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 750px;
}

.chart {
  margin: auto;
  width: 750px;
  height: 400px;
}

@media screen and (max-width: 1150px) {
  .main-column {
    width: 95%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chart {
    width: 100%;
    height: 250px;
  }
}
</style>
