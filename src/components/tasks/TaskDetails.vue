<template>
  <v-container>
    <v-form>
      <h3>Task Details</h3>

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
          placeholder="name"
          outlined
          single-line
          clearable
          dense
        />
        <v-text-field
          v-model="description"
          type="text"
          placeholder="description"
          outlined
          single-line
          clearable
          dense
        />
        <v-checkbox
          v-model="status"
          class=""
          label="Completed"
          outlined
          single-line
          dense
        />
      </v-container>
      <v-btn
        color="primary"
        @click="deleteTaskClicked"
      >
        Delete Task
      </v-btn>
      <v-btn
        color="primary"
        @click="updateTaskClicked"
      >
        Update Task
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'TaskDetails',
  computed: {
    ...mapGetters({ currentTask: "auth/getTask" }),
  },
  created() {},
  data() {
    return {
      name: "",
      description: "",
      status: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions({ updateTask: "auth/updateTask"}),
    ...mapActions({ deleteTask: "auth/deleteTask"}),
    updateTaskClicked() {
      console.log('task: ', this.currentTask)
      let taskUpdate = {}
      taskUpdate.name = this.name || this.currentTask.name
      taskUpdate.description = this.description || this.currentTask.description
      taskUpdate.completed = this.status || this.currentTask.completed
      console.log('update task: ', taskUpdate)
      this.updateTask(taskUpdate)
        .then((response) => {
          console.log('updateTask res: ', response)
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot update task. please try again.";
        });
    },
    deleteTaskClicked() {
      this.deleteTask()
        .then((response) => {
          console.log('deleteTask res: ', response)
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot delete task. please try again.";
        });
    },
  }
}
</script>
<style lang="sass"></style>
