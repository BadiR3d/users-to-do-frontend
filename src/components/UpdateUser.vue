<template>
  <v-container>
    <v-form>
      <h3>Update Profile</h3>

      <v-alert
        v-if="errorMessage"
        type="error"
        dismissible
      >
        {{ errorMessage }} 
      </v-alert>

      <v-alert
        v-if="successMessage"
        type="success"
        dismissible
      >
        {{ successMessage }} 
      </v-alert>

      <v-container>
        <v-text-field
          v-model="name"
          type="text"
          :placeholder="currUser.name"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="surname"
          type="text"
          :placeholder="currUser.surname"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="title"
          type="text"
          :placeholder="currUser.title"
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
          :placeholder="currUser.email"
          outlined
          single-line
          clearable
          dense
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
        :disabled="!isValid"
        color="primary"
        class="pl-2"
        @click="updateClicked"
      >
      Update
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Moment from 'moment'
export default {
  name: 'UpdateUser',
  props: {
  },
  created() {},
  computed: {    
    ...mapGetters({ currUser: "auth/currentUser" }),
    fromUserBirthday() {
      if (!this.birthday) {
        return new Moment(this.currUser.birthday).format("DD MMMM YYYY");
      } else {
        return new Moment(this.birthday).format("DD MMMM YYYY");
      }
    },
    isValid() {
      if (this.newPassword && this.newPassword !== this.confirmNewPassword) {
        return false
      } else return true
    }
  },
  data() {
    return {
      name: "",
      surname: "",
      title: "",
      birthday: "",
      email: "",
      newPassword: "",
      errorMessage: "",
      confirmNewPassword: "",
      dateMenu: false,
      successMessage: "",
    };
  },
  methods: {
    ...mapActions({ deleteUser: "auth/deleteUser"}),
    ...mapActions({ updateUser: "auth/updateUser"}),
    ...mapActions({ setUser: "auth/setUser"}),
    deleteClicked() {
      this.deleteUser().then(() => {
        this.$router.push({ name: "login"})
      })
      .catch(error => {
        console.log(error)
        this.errorMessage = "Cannot delete user. please try again.";
      });
    },
    updateClicked() {
      let user = {}
      user.name = this.name ? this.name : this.currUser.name
      user.surname = this.surname ? this.surname : this.currUser.surname
      user.title = this.title ? this.title : this.currUser.title
      user.birthday = this.birthday ? this.birthday : this.currUser.birthday
      user.email = this.email ? this.email : this.currUser.email
      
      if (this.newPassword) user.password = this.newPassword
      console.log('updateClicked: ',user)
      this.updateUser(user)
        .then((response) => {
          console.log('updateUser res: ', response)
          this.successMessage = "update successful"
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot update user. please try again.";
        });
    }
  }
};
</script>
<style lang="sass"></style>
