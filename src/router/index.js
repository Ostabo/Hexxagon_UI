import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "menu",
      component: MenuView,
    },
    {
      path: "/singleplayer",
      name: "singleplayer",
      component: MenuView, // not implemented yet
    },
    {
      path: "/multiplayer",
      name: "multiplayer",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
