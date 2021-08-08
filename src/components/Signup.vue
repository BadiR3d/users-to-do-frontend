<template>
  <v-container>
    <v-form>
      <h3>Sign Up</h3>

      <v-alert
        v-if="errorMessage"
        type="error"
        dismissible
      >
        {{ errorMessage }} 
      </v-alert>

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
          placeholder="Birthday (01 January 2001)"
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
import Moment from 'moment'
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
      errorMessage: "",
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
      user.birthday = new Moment(this.birthday, "DD MMMM YYYY").local().valueOf()
      user.age = this.age
      user.email = this.email
      user.password = this.password
      console.log("signupClicked user: ", user.birthday)
      this.signup(user)
        .then((response) => {
          console.log('signup res: ', response)
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          // console.log(error)
          this.error = error
          this.errorMessage = "Cannot signup user. please try again.";
        });
    },
  }
};
</script>
<style lang="sass"></style>
