import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";

import ECharts from "vue-echarts";
Vue.component("v-chart", ECharts);

use([CanvasRenderer, BarChart, LineChart, TooltipComponent, GridComponent]);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
