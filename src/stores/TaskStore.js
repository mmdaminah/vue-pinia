import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasksStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav)
    },
    favsCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount() {
      return this.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.isLoading = true
      const data = await fetch('http://localhost:3000/tasks').then((res) => res.json())

      this.isLoading = false

      this.tasks = data
    },
    async addTask(task) {
      this.tasks.push(task)
      const res = fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.error) {
        console.log(res.errror)
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      const res = fetch('http://localhost:3000/tasks/' + id, {
        method: 'Delete'
      })
      if (res.error) {
        console.log(res.errror)
      }
    },
    async toggleFav(id) {
      let updatedTask
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          updatedTask = { ...task, isFav: !task.isFav }
          return updatedTask
        }
        return task
      })
      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: updatedTask.isFav }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.error) {
        console.log(res.errror)
      }
    }
  }
})
