<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Users Logo"
          class="shrink mr-2"
          contain
          src="@/assets/users_app_logo.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Users Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/users_app_name.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        target="_blank"
        text
        v-if="user.isLoggedIn"
        @click.prevent="userProfileClicked()"
      >
        <span class="mr-2">User Profile</span>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>

      <v-btn
        href="#"
        target="_blank"
        text
        v-if="user.isLoggedIn"
        @click.prevent="getUsersClicked()"
      >
        <span class="mr-2">Users</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <v-btn
        href="#"
        target="_blank"
        text
      >
        <span class="mr-2">About</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn
        href="#"
        target="_blank"
        text
        v-if="user.isLoggedIn"
        @click.prevent="logoutClicked()"
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  computed: {    
    ...mapGetters({ loggedIn: "auth/isLoggedIn", user: "auth/currentUser" }),
  },
  data: () => ({
  }),
  watch: {},
  methods: {
    ...mapActions({ logout: "auth/logout" }),
    logoutClicked() {
      this.logout()
      this.$router.push({ name: "login"})
    },
    userProfileClicked() {
      this.$router.push({ name: "update-profile" })
    },
    getUsersClicked() {
      this.$router.push({ name: "view-users" })
    }
  }
};
</script>
