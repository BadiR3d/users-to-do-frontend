<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="(task, index) in tasks" :key="index"
        @click="viewTask(task)"
      >
        <v-list-item-icon>
          <v-icon>mdi-format-list-checks</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <h4>task: {{ task.name }}, {{ task.description }}, is {{ task.completed ? 'completed' : 'not complete' }}</h4>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'TaskList',
    computed: {    
    ...mapGetters({ tasks: "auth/allTasks" }),
    },
    components: {},
    methods: {
      ...mapActions({ setTask: "auth/setTask" }),
      viewTask(task) {
        console.log('details: ', task)
        this.setTask(task)
        .then(() => {})
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot set task. please try again.";
        });
        this.$router.push({ name: "task-details" })
      }
    },
  }
</script>
<style lang="sass"></style>
