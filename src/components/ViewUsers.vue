<template>
  <v-container class="container">
    <h1>Users</h1>
    <p>a list of all users</p>
    <v-list>
      <v-list-item v-for="user in users" :key="user.email">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <h4>{{ user.name }} {{ user.surname }}</h4>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ViewUsers",
  created() {},
  components: {},
  computed: {
    ...mapGetters({ users: "auth/allUsers", user: "auth/currentUser" }),
  },
  watch: {
    users(newVal, oldVal) {
      console.log("users view newval ", newVal, " oldVal", oldVal);
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="sass"></style>
