export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
      name: "idalmasso",
      description: "Here is the description",
      //here there will be the logic for auth and so on...
      loggedIn: false,
    },
    users: [],
  },
  mutations: {
    LOGIN(state, { email, token }) {
      state.user.loggedIn = true;
      state.user.email = email;
      state.user.token = token;
    },
    LOGOUT(state) {
      state.user.loggedIn = false;
      state.user.email = "";
      state.user.token = "";
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    SET_ALL_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async login(context, { email, password }) {
      return fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cannot login!");
          }
          return response.json();
        })
        .then((data) => {
          context.commit("LOGIN", { email: email, token: data.token });
        })
        .catch((error) => {
          context.commit("LOGOUT");
          throw error;
        });
    },
    async logout(context) {
      context.commit("LOGOUT");
    },
    async signup(context, user ) {
      return fetch("http://localhost:3000/api/auth/create-user", {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Cannot signup!");
          }
          return response.json();
        })
        .then((data) => {
          context.commit("LOGIN", { email: user.email, token: data.token });
        })
        .catch((error) => {
          context.commit("LOGOUT");
          error.read().then((data) => {
            throw Error(data);
          });
        });
    },
    async deleteUser(context, { user }) {
      fetch("http://localhost:3000/api/users/" + user.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            context.commit("DELETE_USER", user.id);
            return;
          }
          throw Error(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAllUsers(context) {
      fetch("http://localhost:3000/api/users")
        .then((response) => {
          if (response.ok) {
            return response.json();
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
      return fetch("http://localhost:3000/api/users/" + email, {
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
  },
};
