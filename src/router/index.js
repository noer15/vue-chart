import Vue from "vue";
import VueRouter from "vue-router";
import Polling from "../views/Polling.vue";
import Chart from "../views/Chart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Polling,
  },
  {
    path: "/polling",
    name: "polling",
    component: Chart,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
