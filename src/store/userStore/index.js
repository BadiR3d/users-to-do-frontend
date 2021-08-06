export default {
  namespaced: true,
  state: {
    loadedUsers: [
      {
        id: 1,
        name: "idalmasso",
        email: "idalmasso@test.com",
        title: "snr",
        //here there will be the logic for auth and so on...
        loggedIn: false,
      },
    ],
  },
  mutations: {
    ADD_USER(state, user) {
      if (state.loadedUsers.some((u) => u.name == user.name)) {
        state.loadedUsers.splice(
          state.loadedUsers.indexOf((u) => u.name == user.name),
          1
        );
      }
      state.loadedUsers.push(user);
    },
  },
  actions: {},
  getters: {
    getUser: (state) => (userid) => {
      if (state.loadedUsers.some((user) => user.name == userid)) {
        return state.loadedUsers.find((user) => user.name == userid);
      } else {
        //Here I'll have to request from the server!!
        return {};
      }
    },
  },
};
