<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'fav'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }}</p>
      <div :key="index" v-for="(task, index) in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-else-if="filter === 'fav'">
      <p>You have {{ taskStore.favsCount }}</p>
      <div :key="index" v-for="(task, index) in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'

import { useTasksStore } from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTasksStore()

    taskStore.getTasks()

    const filter = ref('all')

    return {
      taskStore,
      filter
    }
  }
}
</script>
