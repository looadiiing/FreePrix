import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    // {
    //   path: "/account",
    //   name: "account",
    //   component: () => import("../views/AccountView.vue"),
    // },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: () => import("../views/CartView.vue"),
    // },
  ],
});

export default router;