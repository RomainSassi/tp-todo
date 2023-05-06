import { createStore } from 'vuex'
import todoStore from './modules/todo.store'
import categoryStore from './modules/category.store'
import { Todo } from '@/entities/todo'

interface snackbarValues {
  text: string,
  concern: string
}

export default createStore({
  state: {
    snackbar: {
      text: "",
      error: false,
      warning: false,
      info: false,
      success: false
    },
    todoSelected: {},
    editionMode: false
  },
  getters: {
  },
  mutations: {
    SET_SNACKBAR_VALUE(state: any, object: snackbarValues) {
      state.snackbar.text = object.text
      state.snackbar.error = false
      state.snackbar.warning = false
      state.snackbar.info = false
      state.snackbar.success = false

      switch (object.concern) {
        case "error":
          state.snackbar.error = true
          break;
        case "warning":
          state.snackbar.warning = true
          break;
        case "info":
          state.snackbar.info = true
          break;
        case "success":
          state.snackbar.success = true
          break;
      
        default:
          state.snackbar.warning = true
          break;
      }
    },
    RESET_SNACK(state: any) {
      state.snackbar = {
        text: "",
        error: false,
        warning: false,
        info: false,
        success: false
      }
    },
    SET_TODO_SELECTED(state: any, todo: Todo) {
      state.todoSelected = todo
    },
    TOGGLE_EDITION_MODE(state: any) {
      state.editionMode = !state.editionMode
    }
  },
  actions: {
  },
  modules: {
    todoStore,
    categoryStore
  }
})
