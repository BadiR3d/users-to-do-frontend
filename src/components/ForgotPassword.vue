<template>
  <v-container>
    <form>
      <h3>Forgot Password</h3>

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
      </v-container>

      <v-btn color="primary">
        Reset password
      </v-btn>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
};
</script>
<style lang="sass"></style>
