import Vue from "vue";
import VueRouter from "vue-router";
import Stats from "../views/Stats.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

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
  },
];

const router = new VueRouter({
  routes,
});

export default router;
