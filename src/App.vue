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
      >
        <span class="mr-2">About Ndyebo Badi</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn
        href="#"
        target="_blank"
        text
        v-if="loggedIn"
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: 'App',
  computed: {
    ...mapGetters({ loggedIn: "auth/isLoggedIn" })
  },
  data: () => ({
    appLogo: '',
    appNameLogo: '',
  }),
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    logoutClicked() {
      this.logout().then(() => {
        this.$router.push({ name: "login"})
      })
    }
  }
};
</script>
