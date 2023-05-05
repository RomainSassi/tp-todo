<template>
  <div class="todo relative w-full h-full flex flex-col gap-5 p-5 z-10">
    <section class="header-todo">
      <div class="btn hidden xl:flex justify-between">
        <NavigationButton
          :button-text="'Retourner aux TO DO'"
          @click="$emit('close')"
        />
        <NavigationButton
          class="hidden xl:block"
          button-text="Modifier"
          @click="displayForm = true"
        />
      </div>
    </section>
    <section class="body-todo flex flex-col gap-4">
      <div class="title flex flex-col gap-1 text-xl text-slate-700 dark:text-slate-50">
        <span class="font-bold uppercase">
          {{ selectedTodo.title }}
        </span>
        <span class="text-sm flex items-center gap-4"> Créée le {{ formatDate(selectedTodo.createdAt) }} <span v-show="selectedTodo.marked" class="material-symbols-outlined text-red-500">flag</span> </span>
      </div>
      <div class="time-left text-slate-700 dark:text-slate-50 flex items-center gap-4">
        <span class="material-symbols-outlined">schedule</span> {{ checkDayLeft(selectedTodo.endDateTime) }}
      </div>
      <div v-if="selectedTodo.content" class="container-description flex flex-col gap-1 text-slate-700 dark:text-slate-50">
        <span class="text-xs">
          Description
        </span>
        <div
          class="content border p-2 rounded-lg bg-slate-100  dark:bg-slate-700 dark:border-slate-500"
        >
          {{ selectedTodo.content }}
        </div>
      </div>
      <div v-if="selectedTodo.location" class="location text-slate-700 dark:text-slate-50 flex items-center gap-4">
        <span class="material-symbols-outlined">map</span>
        <a :href="setMapsSearch(selectedTodo.location)" target="_blank">
          {{ selectedTodo.location }}
        </a>
      </div>
    </section>
    <router-link
      to="/todo/update"
      class="button-add fixed bottom-10 left-10 xl:hidden w-16 h-16 rounded-full bg-blue-300 dark:bg-blue-600 text-white flex justify-center items-center"
    >
      <span class="material-symbols-outlined text-4xl"> edit_note </span>
    </router-link>
    <router-link
      to="/"
      class="button-add fixed bottom-10 right-10 xl:hidden w-16 h-16 rounded-full bg-red-300 dark:bg-red-600 text-white flex justify-center items-center"
    >
      <span class="material-symbols-outlined text-4xl"> close </span>
    </router-link>
  </div>
  <aside v-show="displayForm" class="bgaside absolute top-0 left-0 w-1/5 h-full backdrop-blur-sm z-40" @click="displayForm = false"></aside>
  <aside
    class="h-full absolute top-0 right-0 w-4/5 bg-slate-50 dark:bg-slate-700 z-40"
    v-if="displayForm"
  >
    <UpdateTodoView @close="displayForm = false" />
  </aside>
</template>

<script lang="ts">
export default {
  name: "TodoView",
};
</script>

<script lang="ts" setup>
import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";
import UpdateTodoView from "./UpdateTodoView.vue";
import Utils from "@/utils/utils";
import { Todo } from "@/entities/todo";

const store = useStore();
const utils = new Utils();

const selectedTodo: ComputedRef<Todo> = computed(() => {
  return store.state.todoSelected;
});

const displayForm = ref(false);

const checkDayLeft = (endDate: string) => {
    const endDateDate = new Date(endDate)
    const today = new Date();

    const differenceInMilliseconds = endDateDate.getTime() - today.getTime();
    const differenceDay = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1

    let difference = `${differenceDay}d`;
    if (differenceDay >= 7) {
        const weeks = Math.floor(differenceDay / 7)
        const dayLeft = differenceDay % 7;
        difference = `${weeks}w ${dayLeft}d`
    }
    
    return difference;
}

const formatDate = (endDate: string) => {
  const date = new Date(endDate);
  return utils.formatDate(date);
}

const setMapsSearch = (location: string) => {
  const address = location.split(' ');
  let url = "https://www.google.com/maps/search/"

  address.forEach((value: string, index: number) => {
    if (index > 0) {
      url += `+${value}`
    } else {
      url += `${value}`
    }
  })

  return url
}
</script>
