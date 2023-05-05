import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/HomeView.vue')
  },
  {
    path: '/add-todo',
    name: 'addTodo',
    component: () => import( '../views/AddTodoView.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import( '../views/TodoView.vue')
  },
  {
    path: '/todo/update',
    name: 'update-todo',
    component: () => import( '../views/UpdateTodoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
