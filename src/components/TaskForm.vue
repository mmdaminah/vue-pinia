<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" type="text" name="" placeholder="I need to ..." id="" />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useTasksStore } from '../stores/TaskStore'
export default {
  setup() {
    const taskStore = useTasksStore()

    const newTask = ref('')

    const handleSubmit = () => {
      if (newTask.value.length === 0) return
      taskStore.addTask({ title: newTask.value, isFav: false, id: new Date().getTime() })
      newTask.value = ''
    }

    return {
      newTask,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped></style>
