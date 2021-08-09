<template>
  <v-container>
    <h3>Welcome {{user.name}}, the {{user.title}}</h3>
    <h5>Tasks</h5>
    <task-list v-if="tasks.length > 0"></task-list>
    <p v-else>You currently don't have any tasks</p>
    <p class="text-left mt-2 mb-4">
      <router-link to="/create-task">New Task</router-link>
    </p>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import TaskList from "./tasks/TaskList.vue"
export default {
    name: 'Home',
    computed: {    
    ...mapGetters({ user: "auth/currentUser" }),
    ...mapGetters({ tasks: "auth/allTasks" }),
    },
    components: {
      TaskList
    },
    methods: {}
  }
</script>
<style lang="sass"></style>
