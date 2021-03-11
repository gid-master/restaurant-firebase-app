import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";

let initialized = false;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { toolbarId: "home", showToolbar: true }
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
    meta: { toolbarId: "menu", showToolbar: true }
  },
  {
    path: "/product/:id",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "product" */ "../views/Product.vue"),
    meta: { showToolbar: false }
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue"),
    meta: { toolbarId: "checkout", showToolbar: true }
  },
  {
    path: "/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    meta: { toolbarId: "account", showToolbar: true },
    // example of using guard for individual routers
    beforeEnter: (to, from, next) => {
      if (!store.getters.user) {
        next({ name: "login" });
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: { toolbarId: "account", showToolbar: true },
    // example of using guard for individual routers
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next({ name: "account" });
      } else {
        next();
      }
    }
  },
  {
    path: "/error/:id",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue"),
    meta: { showToolbar: false }
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "error", params: { id: "404" } }
  }
];

const preLoadData = async () => {
  try {
    await store.dispatch("products");
    await store.dispatch("recoverCart");
  } catch (error) {
    console.log("ERROR BEFORE PRELOADING DATA", error);
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(async () => {
  if (!initialized) {
    initialized = true;
    await preLoadData();
  }

  // always hide modal once router changes
  if (store.getters.modal && store.getters.modal.show) {
    store.dispatch("showModal", { show: false });
  }
});

export default router;
