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
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          outlined
          single-line
          clearable
          dense
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Birthday"
              prepend-icon="mdi-calendar"
              readonly
              :value="fromUserBirthday"
              placeholder=""
              outlined
              single-line
              dense
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="en-in"
            v-model="birthday"
            no-title
            @input="dateMenu = false"
          ></v-date-picker>
        </v-menu>
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
      email: "",
      password: "",
      confirmPassword: "",
      dateMenu: false,
      errorMessage: "",
    };
  },
  computed: {
    isValid() {
      if (this.password && this.confirmPassword) {
        return this.password === this.confirmPassword
      } else return false
    },
    fromUserBirthday() {
      return new Moment(this.birthday).format("DD MMMM YYYY");
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
      user.email = this.email
      user.password = this.password
      console.log("signupClicked user: ", user.birthday)
      this.signup(user)
        .then((response) => {
          console.log('signup res: ', response)
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot signup user. please try again.";
        });
    },
  }
};
</script>
<style lang="sass"></style>
