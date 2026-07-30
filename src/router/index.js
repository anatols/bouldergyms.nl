import { createRouter, createWebHistory } from "vue-router";

import chartTypes from "@/chart/chart-types";
import About from "@/views/About.vue";
import Stats from "@/views/Stats.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/:chartType?",
    name: "Stats",
    component: Stats,
    // Anything that isn't a known chart type falls back to the comparison chart.
    beforeEnter: (to) =>
      chartTypes.validTypes.includes(to.params.chartType)
        ? true
        : { name: "Stats", params: { chartType: chartTypes.COMPARISON } },
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
