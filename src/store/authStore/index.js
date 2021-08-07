import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {},
    users: [],
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
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ALL_USERS(state, users) {
      console.log('SET_ALL_USERS; ', users)
      state.users = state.users.concat(users.data);
    },
  },
  actions: {
    async login(context, { email, password }) {
      axios.post("login", { email, password })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Cannot login!");
          }
          return response;
        })
        .then((data) => {
          if (data.status === 200) {
            context.commit("LOGIN", { user: data.data.user, token: data.data.token});
            context.dispatch('getAllUsers')
          } else {
            context.commit("LOGOUT")
          }
        })
        .catch((error) => {
          context.commit("LOGOUT");
          throw error;
        });
    },
    async logout(context) {
      await axios.post("logout")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cannot logout!");
          }
          return response.json();
        })
        .then(() => {
          context.commit("LOGOUT");
        })
        .catch((error) => {
          context.commit("LOGOUT");
          error.read().then((data) => {
            throw Error(data);
          });
        });
    },
    async signup(context, user ) {
      await axios.post("signup", user)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cannot signup!");
          }
          return response.json();
        })
        .then((data) => {
          context.commit("LOGIN", data.data.user);
        })
        .catch((error) => {
          context.commit("LOGOUT");
          error.read().then((data) => {
            throw Error(data);
          });
        });
    },
    async deleteUser(context, { user }) {
      await axios.delete("users/" + user.id)
        .then((response) => {
            console.log(response);
            if (response.ok) {
            context.commit("DELETE_USER", user.id);
            return;
          }
          throw Error(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserProfile(context) {
      await axios.get("users/me",{
        headers: {
          'Authorization': `Bearer ${context.getters.getToken}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.body);
        }
      })
      .then((data) => {
        console.log(data);
        context.commit("SET_USER", data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async getAllUsers(context) {
      console.log('getAllUsers tokelele: ', context.getters.getToken)
      await axios.get("users", {
        headers: {
          'Authorization': `Bearer ${context.getters.getToken}`
        }
      })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            return response;
          } else {
            throw Error(response.body);
          }
        })
        .then((data) => {
          console.log(data);
          context.commit("SET_ALL_USERS", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addUser(context, { email }) {
      return fetch("users/" + email, {
        headers: {
          Authorization: context.rootGetters["auth/getTokenHeader"]
        }
      })
        .then(response => {
          if (!response.ok) throw new Error("Cannot get user");
          return response.json();
        })
        .then(data => {
          context.commit("ADD_USER", data);
        })
        .catch(error => {
          console.log(error);
          throw error;
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
    }
  },
};
