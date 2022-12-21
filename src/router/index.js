import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/local",
      name: "local",
      component: () => import("../views/GameViewLocal.vue"),
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
      path: "/game-plain",
      name: "game-plain",
      component: () => import("../views/GamePlain.vue"),
    },
    {
      path: "/status-plain",
      name: "status-plain",
      component: () => import("../views/StatusPlain.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
