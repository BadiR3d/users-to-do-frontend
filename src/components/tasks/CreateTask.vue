<template>
  <v-container>
    <v-form>
      <h3>Create Task</h3>

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
          v-model="description"
          type="text"
          placeholder="Description"
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
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        @click="createTaskClicked"
      >
        Create Task
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'CreateTask',
  data() {
    return {
      name: "",
      description: "",
      status: false,
      errorMessage: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions({ createTask: "auth/createTask" }),
    createTaskClicked() {
      let task = {}
      task.name = this.name
      task.description = this.description
      task.completed = this.status
      console.log('create task: ', task)
      this.createTask(task)
        .then((response) => {
          console.log('createTask res: ', response)
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = "Cannot create task. please try again.";
        });
    },
  }
}
</script>
<style lang="sass"></style>
