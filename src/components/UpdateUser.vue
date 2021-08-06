<template>
  <v-container>
    <v-form>
      <h3>Update Profile</h3>
      <v-container>
        <v-text-field
          v-model="name"
          type="text"
          placeholder="Name"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="surname"
          type="text"
          placeholder="Surname"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="title"
          type="text"
          placeholder="Title"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="birthday"
          type="text"
          placeholder="Birthday"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="email"
          type="email"
          class=""
          placeholder="Email"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="password"
          type="password"
          class=""
          placeholder="Current Password"
          outlined
          single-line
          dense
          clearable
        />
        <v-text-field
          v-model="confirmPassword"
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

      <v-btn @click="deleteClicked" color="warning">Delete</v-btn>
      <v-btn color="primary" class="pl-2">Update</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      title: "",
      birthday: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmNewPassword: "",
    };
  },
  methods: {
    deleteClicked() {
      this.$store.dispatch("users/deleteUser", { user: this.user });
    }
  }
};
</script>
<style lang="sass"></style>
