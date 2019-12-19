import API from '@/services/API'

export default {
    getToDos () {
        return API().get('todo')
    },
    addToDo (newTodo) {
        return API().post('addTodo', {
            newTodo: newTodo
        })
    },
    deleteToDo (id) {
        return API().delete('deleteTodo', {
            id: id
        })
    }
}