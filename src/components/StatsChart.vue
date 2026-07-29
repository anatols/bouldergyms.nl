<template>
  <VChart :option="chartData" autoresize />
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";

import stats from "@/stats/stats.json";
import { gymsRanked } from "@/stats/gyms";
import { useSettingsStore } from "@/stores/settings";
import grades from "@/stats/grades";
import chartTypes from "@/chart/chart-types";
import chartHelpers from "@/chart/chart-helpers";
import styleVars from "@/style/vars";

use([CanvasRenderer, BarChart, LineChart, TooltipComponent, GridComponent]);

const props = defineProps({
  chartType: String,
});

const settings = useSettingsStore();
const { enabledGymIds, myGymId } = storeToRefs(settings);

const gymsToDisplay = computed(() => [
  // Always add my gym first (bottom-most) to the chart
  ...gymsRanked.filter(
    ({ id }) => enabledGymIds.value.includes(id) && id === myGymId.value
  ),
  ...gymsRanked.filter(
    ({ id }) => enabledGymIds.value.includes(id) && id !== myGymId.value
  ),
]);

function percentageToFixed(percentage) {
  return percentage.toFixed(percentage < 5 ? 2 : 0);
}

function seriesForEnabledGyms(gymCallbackFn) {
  return gymsToDisplay.value.map((gym, index) => ({
    name: gym.name,
    id: gym.id,
    color: gym.chart_color,
    smooth: true,
    z: index,
    symbolSize: 3,
    ...gymCallbackFn(gym),
  }));
}

function chartContentForPercentilesChart() {
  const xAxisGradeScale = stats.grades.scales.french_abcplus;
  const xAxis = [
    chartHelpers.axis.forGradeScale(xAxisGradeScale),
    chartHelpers.axis.forMajorGradeScale(stats.grades.scales.french_major),
  ];
  const yAxis = [chartHelpers.axis.forPercentages(true)];

  const series = seriesForEnabledGyms((gym) => ({
    type: "line",
    ...chartHelpers.lineStyle.forSeries(false),
    data: grades.mapGradeNamesToValues(
      grades.reducePercentilesToScale(gym.stats.percentiles, xAxisGradeScale),
      percentageToFixed
    ),
  }));

  return {
    ...chartHelpers.tooltip.forPercentileChart(),
    xAxis,
    yAxis,
    series,
  };
}

function chartContentForPopularityChart() {
  const xAxisGradeScale = stats.grades.scales.french_major;
  const xAxis = [chartHelpers.axis.forGradeScale(xAxisGradeScale)];
  const yAxis = [chartHelpers.axis.forPercentages(false)];

  const series = seriesForEnabledGyms((gym) => ({
    type: "bar",
    data: grades.mapGradeNamesToValues(
      grades.reducePopularitiesToScale(gym.stats.popularities, xAxisGradeScale),
      percentageToFixed
    ),
  }));

  return {
    ...chartHelpers.tooltip.forPopularityChart(),
    xAxis,
    yAxis,
    series,
  };
}

function chartContentForGradeComparisonChart() {
  const xAxisGradeScale = stats.grades.scales.french_abcplus;
  const yAxisGradeScale = stats.grades.scales.french_abcplus;
  const xAxis = [
    chartHelpers.axis.forGradeScale(
      xAxisGradeScale,
      true,
      gymsToDisplay.value.length <= 1
        ? ""
        : `Grade you climb at ${stats.gyms[myGymId.value].name}`
    ),
    chartHelpers.axis.forMajorGradeScale(stats.grades.scales.french_major),
  ];

  const otherGyms = gymsToDisplay.value.filter(
    (gym) => gym.id != myGymId.value
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
      data: ["← easier", "similar", "harder →"],
      axisLabel: {
        rotate: 90,
      },
    },
  ];

  const percentileMapper = myGymId.value
    ? new grades.PercentileMapper(
        stats.gyms[myGymId.value].stats.percentiles,
        xAxisGradeScale
      )
    : undefined;

  const series = seriesForEnabledGyms((gym) => ({
    type: "line",
    ...chartHelpers.lineStyle.forSeries(gym.id === myGymId.value),
    data: percentileMapper
      .mapPercentiles(gym.stats.percentiles, yAxisGradeScale)
      .map((mapping) => [
        mapping.baseGradeName,
        mapping.targetGrade - mapping.baseGrade,
        mapping.targetGradeNames,
      ]),
  }));

  return {
    ...chartHelpers.tooltip.forGradeComparisonChart(myGymId.value),
    xAxis,
    yAxis,
    series,
  };
}

function chartContent() {
  switch (props.chartType) {
    case chartTypes.PERCENTILES:
      return chartContentForPercentilesChart();

    case chartTypes.POPULARITY:
      return chartContentForPopularityChart();

    case chartTypes.COMPARISON:
      return chartContentForGradeComparisonChart();

    default:
      throw new Error("Unknown chart type.");
  }
}

const chartData = computed(() => ({
  ...chartContent(),
  textStyle: {
    color: styleVars["--primary-text-color"],
    fontFamily: styleVars["--primary-font-family"],
    fontSize: 14,
  },
  grid: {
    left: "50px",
    top: "30px",
    right: "40px",
    bottom: "40px",
  },
}));
</script>
