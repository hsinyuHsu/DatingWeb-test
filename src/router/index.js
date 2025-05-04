// @/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CreateEvent from "@/views/CreateEvent.vue";

const routes = [
  {
    path: "/",
    name: "CreateEvent",
    component: CreateEvent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
