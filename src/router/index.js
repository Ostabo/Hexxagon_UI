import { createRouter, createWebHistory } from "vue-router";
import Menu from "@/views/Menu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "menu",
      component: Menu,
    },
    {
      path: "/singleplayer",
      name: "singleplayer",
      component: Menu, // not implemented yet
    },
    {
      path: "/multiplayer",
      name: "multiplayer",
      component: () => import("../views/Game.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
