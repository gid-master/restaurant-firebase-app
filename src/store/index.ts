import { createStore } from "vuex";
import user from "./user";
import account from "./account";
import checkout from "./checkout";
import product from "./product";
import settings from "./settings";

export default createStore({
  modules: {
    user: user,
    account: account,
    checkout: checkout,
    product: product,
    settings: settings
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
