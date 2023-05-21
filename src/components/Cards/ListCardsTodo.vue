<template>
  <div class="flex flex-col gap-3 xl:gap-8 w-full">
    <div class="uncompleted flex flex-col gap-3 w-full ">
      <h4
        class="flex items-center gap-5 text-slate-700 font-semibold dark:text-white md:text-2xl"
      >
        <span class="material-symbols-outlined text-red-200 dark:text-red-400">construction</span>
        To do
      </h4>
      <TodoCard
        v-for="todo in todoUncompleted"
        :key="todo.id"
        :todo="todo"
        :display-date="displayDate"
        @displayInfo="$emit('displayInfo', todo)"
        @toggleCompleted="toggleCompleted(todo)"
      />
    </div>
    <div class="completed flex flex-col gap-3 w-full">
      <h4
        class="flex items-center gap-5 text-slate-700 font-semibold dark:text-white md:text-2xl"
      >
        <span
          class="material-symbols-outlined text-green-500 dark:text-green-600"
        >
          check_circle </span
        >Completed
      </h4>
      <TodoCard
        v-for="todo in todoCompleted"
        :key="todo.id"
        :todo="todo"
        :display-date="displayDate"
        @displayInfo="$emit('displayInfo', todo)"
        @toggleCompleted="toggleCompleted(todo)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ListCardsTodo",
};
</script>

<script lang="ts" setup>
import { Todo } from "@/entities/todo";
import TodoCard from "./TodoCard.vue";
import { defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore()

const props = defineProps<{
  todoUncompleted: Todo[];
  todoCompleted: Todo[];
  displayDate: boolean
}>();

const toggleCompleted = (todo: Todo) => {
  store.dispatch("todoStore/updateTodo", {
    todo: todo,
    completed: true,
  });
};
</script>
