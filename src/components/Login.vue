<template>
  <v-container>
    <v-form>
      <h3>Sign In</h3>

      <v-container>
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
      </v-container>
      <v-btn
        color="primary"
        @click.prevent="loginClicked()"
      >
        <span>Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <p class="text-right mt-2 mb-4">
        <router-link to="/signup">Sign Up</router-link>
        <v-spacer />
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({ login: "auth/login"}),
    loginClicked() {
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          this.error = error;
        });
    },
  }
};
</script>
<style lang="sass"></style>
