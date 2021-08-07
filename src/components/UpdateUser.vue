<template>
  <v-container>
    <v-form>
      <h3>Update Profile</h3>
      <v-container>
        <v-text-field
          v-model="user.name"
          type="text"
          placeholder="Name"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="user.surname"
          type="text"
          placeholder="Surname"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="user.title"
          type="text"
          placeholder="Title"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="user.birthday"
          type="text"
          placeholder="Birthday"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="user.age"
          type="number"
          placeholder="Age"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="user.email"
          type="email"
          class=""
          placeholder="Email"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="currentPassword"
          type="password"
          class=""
          placeholder="Current Password"
          outlined
          single-line
          dense
          clearable
        />
        <v-text-field
          v-model="newPassword"
          type="password"
          class=""
          placeholder="New Password"
          outlined
          single-line
          dense
          clearable
        />
        <v-text-field
          v-model="confirmNewPassword"
          type="password"
          class=""
          placeholder="Confirm New Password"
          outlined
          single-line
          dense
          clearable
        />
      </v-container>

      <v-btn
        @click="deleteClicked"
        color="warning"
      >
      Delete
      </v-btn>

      <v-btn
        color="primary"
        class="pl-2"
      >
      Update
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UpdateUser',
  props: {
  },
  created() {},
  computed: {    
  ...mapGetters({ user: "auth/currentUser" }),
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  methods: {
    ...mapActions({ deleteUser: "auth/deleteUser"}),
    // ...mapActions({ getUser: "auth/getUserProfile"}),
    deleteClicked() {
      this.deleteUser().then(() => {
        this.$router.push({ name: "login"})
      })
    }
  }
};
</script>
<style lang="sass"></style>
