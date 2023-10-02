import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import catchAll from "../views/NotFound.vue";
import EditTask from "../views/EditTask.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/edit/:index",
      name: "edit",
      component: EditTask,
      props: true, // Mengaktifkan prop "index" dari parameter rute
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:catchAll(.*)", // or `:pathMatch(.*)*`
      name: "NotFound",
      component: catchAll,
    },
  ],
});

export default router;
