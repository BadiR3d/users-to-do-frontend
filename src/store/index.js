import Vue from "vue";
import Vuex from "vuex";
import authModule from "./authStore/index.js";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth: authModule },
});
