<template>
  <v-chart :option="chartData" :autoresize="true" />
</template>

<script>
import { mapState } from "vuex";

import grades from "@/stats/grades";
import chartTypes from "@/chart/chart-types";
import chartHelpers from "@/chart/chart-helpers";
import styleVars from "@/style/vars";

function percentageToFixed(percentage) {
  return percentage.toFixed(percentage < 5 ? 2 : 0);
}

export default {
  name: "StatsChart",
  props: ["chart-type"],
  mixins: [chartTypes.mixin, styleVars.mixin],
  methods: {
    seriesForEnabledGyms(gymCallbackFn) {
      return this.gymsToDisplay.map((gym, index) => ({
        name: gym.name,
        id: gym.id,
        color: gym.chart_color,
        smooth: true,
        z: index,
        symbolSize: 3,
        ...gymCallbackFn(gym),
      }));
    },

    chartContentForPercentilesChart() {
      const xAxisGradeScale = this.stats.grades.scales.french_abcplus;
      const xAxis = [
        chartHelpers.axis.forGradeScale(xAxisGradeScale),
        chartHelpers.axis.forMajorGradeScale(
          this.stats.grades.scales.french_major
        ),
      ];
      const yAxis = [chartHelpers.axis.forPercentages(true)];

      const series = this.seriesForEnabledGyms((gym) => ({
        type: "line",
        ...chartHelpers.lineStyle.forSeries(false),
        data: grades.mapGradeNamesToValues(
          grades.reducePercentilesToScale(
            gym.stats.percentiles,
            xAxisGradeScale
          ),
          percentageToFixed
        ),
      }));
      return {
        ...chartHelpers.tooltip.forPercentileChart(),
        xAxis,
        yAxis,
        series,
      };
    },

    chartContentForPopularityChart() {
      const xAxisGradeScale = this.stats.grades.scales.french_major;
      const xAxis = [chartHelpers.axis.forGradeScale(xAxisGradeScale)];
      const yAxis = [chartHelpers.axis.forPercentages(false)];

      const series = this.seriesForEnabledGyms((gym) => ({
        type: "bar",
        data: grades.mapGradeNamesToValues(
          grades.reducePopularitiesToScale(
            gym.stats.popularities,
            xAxisGradeScale
          ),
          percentageToFixed
        ),
      }));
      return {
        ...chartHelpers.tooltip.forPopularityChart(),
        xAxis,
        yAxis,
        series,
      };
    },

    chartContentForGradeComparisonChart() {
      const xAxisGradeScale = this.stats.grades.scales.french_abcplus;
      const yAxisGradeScale = this.stats.grades.scales.french_abcplus;
      const xAxis = [
        chartHelpers.axis.forGradeScale(
          xAxisGradeScale,
          true,
          this.gymsToDisplay.length <= 1
            ? ""
            : `Grade you climb at ${this.stats.gyms[this.myGymId].name}`
        ),
        chartHelpers.axis.forMajorGradeScale(
          this.stats.grades.scales.french_major
        ),
      ];

      const otherGyms = this.gymsToDisplay.filter(
        (gym) => gym.id != this.myGymId
      );

      const yAxis = [
        chartHelpers.axis.forGradeComparison(
          otherGyms.length === 0
            ? ""
            : `Grade at ${
                otherGyms.length > 1
                  ? `the other ${otherGyms.length} gyms`
                  : otherGyms[0].name
              }`
        ),
        {
          type: "category",
          axisTick: {
            show: false,
          },
          data: ["\u2190 easier", "similar", "harder \u2192"],
          axisLabel: {
            rotate: 90,
          },
        },
      ];

      const percentileMapper = this.myGymId ? new grades.PercentileMapper(
        this.stats.gyms[this.myGymId].stats.percentiles,
        xAxisGradeScale
      ) : undefined;

      const series = this.seriesForEnabledGyms((gym) => ({
        type: "line",
        ...chartHelpers.lineStyle.forSeries(gym.id === this.myGymId),
        data: percentileMapper
          .mapPercentiles(gym.stats.percentiles, yAxisGradeScale)
          .map((mapping) => [
            mapping.baseGradeName,
            mapping.targetGrade - mapping.baseGrade,
            mapping.targetGradeNames,
          ]),
      }));

      return {
        ...chartHelpers.tooltip.forGradeComparisonChart(this.myGymId),
        xAxis,
        yAxis,
        series,
      };
    },

    chartContent() {
      switch (this.chartType) {
        case chartTypes.PERCENTILES:
          return this.chartContentForPercentilesChart();

        case chartTypes.POPULARITY:
          return this.chartContentForPopularityChart();

        case chartTypes.COMPARISON:
          return this.chartContentForGradeComparisonChart();

        default:
          throw "Unknown chart type.";
      }
    },
  },
  computed: {
    ...mapState({
      enabledGymIds: (state) => state.settings.enabledGymIds,
      gymsRanked: (state) => state.gymsRanked,
      stats: (state) => state.stats,
      myGymId: (state) => state.settings.myGymId,
      myGym: (state) => state.stats.gyms[state.settings.myGymId],
    }),
    gymsToDisplay() {
      return [
        // Always add my gym first (bottom-most) to the chart
        ...this.gymsRanked.filter(
          ({ id }) => this.enabledGymIds.includes(id) && id === this.myGymId
        ),
        ...this.gymsRanked.filter(
          ({ id }) => this.enabledGymIds.includes(id) && id !== this.myGymId
        ),
      ];
    },
    chartData() {
      return {
        ...this.chartContent(),
        textStyle: {
          color: this.styleVars["--primary-text-color"],
          fontFamily: this.styleVars["--primary-font-family"],
          fontSize: 14,
        },
        grid: {
          left: "50px",
          top: "30px",
          right: "40px",
          bottom: "40px",
        },
      };
    },
  },
};
</script>
