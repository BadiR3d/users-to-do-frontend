import Vue from "vue";
import Vuex from "vuex";
import usersModule from "./userStore/index.js";
import authModule from "./authStore/index.js";
import tasksModule from "./taskStore/index.js";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { users: usersModule, auth: authModule, tasks: tasksModule },
});
