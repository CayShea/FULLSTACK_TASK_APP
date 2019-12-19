<template lang="html">
  <div>
    <form @submit="addTodo($event)">
      <input type='text' placeholder='Enter Todo' v-model='newTodo'/>
      <input type='submit' />
    </form>
    <ul>
      <li v-for='todo in todos' :key='todo._id'>
        <input type="checkbox" @click="deleteTodo(todo._id)">
        {{todo.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import todoAPI from '@/services/todoAPI.js'

export default {
  data () {
    return {
      newTodo: '',
      todos: []
    }
  },
  mounted () {
    this.loadTodos()
  },
  methods: {
    async addTodo (event) {
      event.preventDefault() 
      const response = await todoAPI.addToDo(this.newTodo)
      this.todos.push(response.data)
      this.newTodo = '' 
    },
    async loadTodos () {
      const response = await todoAPI.getToDos()
      this.todos = response.data
    },
    async deleteTodo (id) {
        todoAPI.deleteToDo(id)
        this.todos = this.todos.filter(obj => {
            return obj._id !== id
        })
    }
  }
}
</script>

<style lang="css">
</style>