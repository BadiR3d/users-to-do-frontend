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
      console.log('LOGIN')
      state.user = user
      state.user.isLoggedIn = true
      state.user.token = token
    },
    LOGOUT(state) {
      console.log('LOGOUT')
      state.user = {};
      state.users = []
      state.tasks = []
    },
    SET_USER(state, user) {
      console.log('SET_USER: ', user)
      const name = state.user.name
      const surname = state.user.surname
      const email = state.user.email
      const birthday = state.user.birthday
      const token = state.user.token

      state.user = user;
      state.user.isLoggedIn = true
      !user.name ? state.user.name = name : user.name
      !user.surname ? state.user.surname = surname : user.surname
      !user.email ? state.user.email = email : user.email
      !user.birthday ? state.user.birthday = birthday : user.birthday
      !user.token ? state.user.token = token : user.token
    },
    SET_ALL_USERS(state, users) {
      console.log('SET_ALL_USERS: ', users)
      state.users = state.users.concat(users.data);
    },
    ADD_TASK(state, task) {
      console.log('ADD_TASK: ', task)
      state.tasks.push(task);
    },
    SET_USER_TASK(state, task) {
      console.log('SET_USER_TASK: ', task)
      state.user.task = task;
    },
    SET_ALL_TASKS(state, tasks) {
      console.log('SET_ALL_TASKS: ', tasks)
      state.tasks = state.tasks.concat(tasks.data);
    },
    REMOVE_USER_TASK(state, task) {
      console.log('REMOVE_USER_TASK: ', task)
      const index = state.tasks.findIndex(object => object._id === task._id);
      state.tasks = [
        ...state.tasks.slice(0, index),
        ...state.tasks.slice(index + 1)
      ]
    },
    REMOVE_USER_TASKS(state) {
      console.log('REMOVE_USER_TASKS')
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
          context.commit("LOGOUT");
          resolve(data)
        })
        .catch(function (error) {
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
          console.log('updateUser data: ', data)
          context.commit("SET_USER", data);
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    async setUser(context, user) {
      context.commit("SET_USER", user);
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
