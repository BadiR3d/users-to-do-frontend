import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {},
    users: [],
    tasks: [],
  },
  mutations: {
    LOGIN(state, { user, token}) {
      console.log('LOGIN before: ', user)
      state.user = user
      state.user.isLoggedIn = true
      state.user.token = token
      console.log('LOGIN after: ', user)
    },
    LOGOUT(state) {
      state.user = {};
      state.users = []
      state.tasks = []
    },
    SET_USER(state, user) {
      const password = state.user.password
      state.user = user;
      if (!user.password) {
        state.user.password = password
      }
    },
    SET_ALL_USERS(state, users) {
      console.log('SET_ALL_USERS; ', users)
      state.users = state.users.concat(users.data);
    },
    ADD_TASK(state, task) {
      console.log('ADD_TASK; ', task)
      state.tasks.push(task);
    },
    SET_USER_TASK(state, task) {
      console.log('SET_USER_TASK; ', task)
      state.user.task = task;
    },
    SET_ALL_TASKS(state, tasks) {
      console.log('SET_ALL_TASKS; ', tasks)
      state.tasks = state.tasks.concat(tasks.data);
    },
    REMOVE_USER_TASK(state, task) {
      const index = state.tasks.findIndex(object => object._id === task._id);
      state.tasks = [
        ...state.tasks.slice(0, index),
        ...state.tasks.slice(index + 1)
      ]
    },
    REMOVE_USER_TASKS(state) {
      state.user.task = {};
    }
  },
  actions: {
    async login(context, { email, password }) {
      return new Promise((resolve, reject) => {
        axios.post("login", { email, password })
         .then(function ({data}) {
          console.log(data)
          context.commit("LOGIN", { user: data.user, token: data.token});
          context.dispatch('getAllUsers')
          context.dispatch('getAllTasks')
          resolve(data);
         })
         .catch(function (error) {
          reject(error);
         });
       });
    },
    async logout(context) {
      await axios.post("logout", {
        headers: {
          'Authorization': `Bearer ${context.getters.getToken}`
        }
      })
        .then(() => {
          context.commit("LOGOUT");
        })
        .catch((error) => {
          context.commit("LOGOUT");
          console.log(error)
        });
    },
    async signup(context, user) {
      return new Promise((resolve, reject) => {
        axios.post("signup", user)
        .then(function ({data}) {
          console.log(data)
          context.commit("LOGIN", { user: data.user, token: data.token});
          context.dispatch('getAllUsers')
          resolve(data)
        })
        .catch(function (error) {
          context.commit("LOGOUT");
          reject(error);
        });
      });
    },
    async deleteUser(context) {
      return new Promise((resolve, reject) => {
        axios.delete("users/me/delete", {
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then(function ({data}) {
          console.log(data);
          context.commit("LOGOUT");
          resolve(data)
        })
        .catch(function (error) {
          context.commit("LOGOUT");
          reject(error);
        });
      });
    },
    async getUserProfile(context) {
      return new Promise((resolve, reject) => {
        axios.get("users/me",{
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then(function ({data}) {
          console.log(data);
          context.commit("SET_USER", { user: data.data.user });
          resolve(data)
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
      });
    },
    async getAllUsers(context) {
      return new Promise((resolve, reject) => {
        axios.get("users", {
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then((data) => {
          context.commit("SET_ALL_USERS", data);
          resolve(data)
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    },
    async updateUser(context, user) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: 'users/me/update',
          data: user,
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          },
        })
        .then(function ({data}) {
          console.log(data)
          context.commit("SET_USER", { user: data.user });
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    async setTask(context, task) {
      context.commit("SET_USER_TASK", task);
    },
    async getAllTasks(context) {
      return new Promise((resolve, reject) => {
        axios.get("tasks", {
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then((data) => {
          console.log(data);
          context.commit("SET_ALL_TASKS", data);
          resolve(data)
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    },
    async createTask(context, task) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'tasks/create-task',
          data: task,
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          },
        })
        .then(function ({data}) {
          console.log(data)
          context.commit("ADD_TASK", data)
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    async updateTask(context, task) {
      console.log('id: ', context.getters.getTaskId)
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `tasks/update-task/${context.getters.getTaskId}`,
          data: task,
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then(function ({data}) {
          console.log(data)
          context.commit("SET_USER_TASK", data);
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    async deleteTask(context) {
      return new Promise((resolve, reject) => {
        axios.delete(`tasks/${context.getters.getTaskId}`, {
          headers: {
            'Authorization': `Bearer ${context.getters.getToken}`
          }
        })
        .then(function ({data}) {
          console.log(data);
          context.commit("REMOVE_USER_TASK", data)
          resolve(data)
        })
        .catch(function (error) {
          reject(error);
        });
      });
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      if (!state.user) return false;
      return state.user.loggedIn;
    },
    allUsers(state) {
      return state.users
    },
    getToken(state) {
      return state.user.token
    },
    getTask(state) {
      return state.user.task
    },
    getTaskId(state) {
      return state.user.task._id
    },
    allTasks(state) {
      return state.tasks
    }
  },
};
