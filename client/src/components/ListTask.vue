<template>
  <div>
  <div v-bind:show="tasks.length>0" class="col align-self-center">
    <div class="form-row align-items-center" v-for="task in tasks" :key="task.id">
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <input
                type="checkbox"
                v-model="task.done"
                :checked="task.done"
                :value="task.done"
                v-on:change="updateTask(task)"
                title="Mark as done?"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            :class="task.done?'todo__done':''"
            v-model="task.description"
            @keypress="task.editing=true"
            @keyup.enter="updateTask(task)"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete task?"
                @click="deleteTask(task._id)"
              >
                X
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div
        class="alert alert-primary todo__row"
        v-if="tasks.length==0 && doneLoading"
    ><p>No Tasks for this User</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bus from "./../bus.js";

export default {
  data() {
    return {
      tasks: [],
      doneLoading: false
    };
  },
  props: [
    'userId'
  ],
  mounted: function() {
    this.fetchTask();
    this.listenToEvents();
  },
  watch: {
    $route: function() {
      this.doneLoading = false;
      this.fetchData().then(function() {
        this.doneLoading = true;
      });
    }
  },
  methods: {
    fetchTask() {
        this.$http.get(`/tasks/${this.userId[0]._id}`).then(response => {
        this.tasks = response.data;
      })
  },
    updateTask(task) {
      let id = task._id;
      this.$http
        .put(`/tasks/${id}`, task)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteTask(id) {
      this.$http.delete(`/tasks/${id}`).then(response => {
        this.fetchTask();
      });
    },

    listenToEvents() {
      bus.$on("refreshTask", $event => {
        this.fetchTask(); 
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>
