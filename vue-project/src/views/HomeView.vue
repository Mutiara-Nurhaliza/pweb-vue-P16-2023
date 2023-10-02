<template>
  <div class="container">
    <h2 class="text-center">Todo List</h2>

    <!-- input -->
    <div class="d-flex">
      <input
        v-model="category"
        type="text"
        placeholder="Enter Category"
        class="form-control"
      />
      <input
        v-model="task"
        type="text"
        placeholder="Enter task"
        class="form-control"
      />

      <button @click="submitTask" class="btn btn-warning rounded-0">
        Submit
      </button>
    </div>
    <!-- input end -->
    <!-- filter category -->
    <div class="filter-container">
      <label for="categoryFilter">Filter by Category:</label>
      <select v-model="selectedCategory">
        <option value="All">All</option>
        <option
          v-for="task in tasks"
          :key="task.category"
          @click="selectCategory(task.category)"
        >
          {{ task.category }}
        </option>
      </select>
    </div>
    <!-- filter category end -->
    <!-- task -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filteredTasks" :key="index">
          <th>{{ task.category }}</th>
          <th :class="{ 'completed-task': task.completed }">{{ task.name }}</th>
          <td class="text-center">
            <input type="checkbox" v-model="task.completed" />
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
            <router-link :to="{ name: 'edit', params: { index } }">
  <span class="fa fa-pen"></span>
  <div @click="deleteTask(index)"></div>
</router-link></div>

          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- task end -->
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    task: String,
  },

  data() {
    return {
      category: "",
      task: "",
      editedTask: null,
      tasks: [],
      selectedCategory: "All",
    };
  },

  methods: {
    submitTask() {
      if (this.task.length === 0) return;
      if (this.editedTask === null) {
        this.tasks.push({
          category: this.category,
          name: this.task,
          completed: false,
        });
      } else {
        this.tasks[this.editedTask].name = this.task;
        this.tasks[this.editedTask].category = this.category;
        this.editedTask = null;
      }
      this.category = "";
      this.task = "";
      this.saveTasksToLocalStorage();
    },

    selectCategory(category) {
      this.selectedCategory = category;
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    },

    editTask(index) {
      this.task = this.tasks[index].name;
      this.category = this.tasks[index].category;
      this.editedTask = index;
    },

    saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },

  computed: {
    filteredTasks() {
      if (this.selectedCategory === "All") {
        return this.tasks; // Return all tasks if "All" is selected
      } else {
        return this.tasks.filter(
          (task) => task.category === this.selectedCategory
        );
      }
    },
  },

  created() {
    const tasksFromLocalStorage = localStorage.getItem("tasks");
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    }
  },
};
</script>

<style>
@media (min-width: 2048px) {
  /* Tambahkan aturan CSS tambahan di sini */
  .container {
    /* Misalnya, mengatur lebar kontainer menjadi 80% pada layar lebar */
    width: 80%;
  }

  /* Aturan CSS tambahan lainnya untuk tampilan di layar yang lebar */
}
.completed-task {
  text-decoration: line-through;
  color: #999;
}
</style>
