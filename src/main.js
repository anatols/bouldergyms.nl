import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
Vue.component("v-chart", ECharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
