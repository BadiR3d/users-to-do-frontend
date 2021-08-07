<template>
  <v-container>
    <v-form>
      <h3>Sign Up</h3>
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
          v-model="age"
          type="number"
          placeholder="Age"
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
          placeholder="Password"
          outlined
          single-line
          dense
          clearable
        />
        <v-text-field
          v-model="confirmPassword"
          type="password"
          class=""
          placeholder="Confirm Password"
          outlined
          single-line
          dense
          clearable
        />
      </v-container>
      <v-btn
        :disabled="!isValid"
        color="primary"
        @click.prevent="signupClicked()"
      >
        <span>Sign Up</span>
        <v-icon>mdi-clipboard-account-outline</v-icon>
      </v-btn>

      <p class="text-right">
        Already registered
        <router-link :to="{ name: 'login' }">sign in?</router-link>
      </p>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Signup',
  data() {
    return {
      name: "",
      surname: "",
      title: "",
      birthday: "",
      age: 12,
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isValid() {
      if (this.password && this.confirmPassword) {
        return this.password === this.confirmPassword
      } else return false
    },
  },
  methods: {
    ...mapActions({ signup: "auth/signup" }),
    signupClicked() {
      let user = {}
      user.name = this.name
      user.surname = this.surname
      user.title = this.title
      user.birthday = this.birthday
      user.age = this.age
      user.email = this.email
      user.password = this.password
      console.log("signupClicked user: ", user)
      this.signup(user)
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          this.error = error;
        });
    },
  }
};
</script>
<style lang="sass"></style>
