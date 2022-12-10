import { createRouter, createWebHistory } from "vue-router";
import Game from "@/views/Game.vue";
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
      component: Game,
    },
    {
      path: "/multiplayer",
      name: "multiplayer",
      component: Game,
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
