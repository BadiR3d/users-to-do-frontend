<template>
<p>hello {{user.name}}</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: 'Home',
    computed: {    
    ...mapGetters({ user: "auth/currentUser" }),
    },
    components: {},
  }
</script>
<style lang="sass"></style>
