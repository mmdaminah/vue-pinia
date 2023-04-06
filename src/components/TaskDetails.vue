<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.deleteTask(task.id)" class="material-icons">delete</i>
      <i
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
        class="material-icons"
        >favorites</i
      >
    </div>
  </div>
</template>

<script>
import { useTasksStore } from '../stores/TaskStore'
export default {
  props: ['task'],
  setup() {
    const taskStore = useTasksStore()

    return {
      taskStore
    }
  }
}
</script>
