<template>
  <div
    class="card flex items-start shadow-md border dark:border-slate-900 rounded-md divide-x-2 min-h-[5rem] h-fit min-w-fit w-auto overflow-hidden bg-white dark:bg-slate-800 dark:shadow-lg"
  >
    <div
      class="left w-1/5 md:w-1/12 flex justify-center items-center h-full cursor-pointer"
      @click="$emit('toggleCompleted')"
    >
      <span v-show="todo.completed" class="material-symbols-outlined text-green-500 dark:text-green-600">
        check_circle
      </span>
      <span v-show="!todo.completed" class="material-symbols-outlined text-slate-700 dark:text-red-500">
        do_not_disturb_on
      </span>
    </div>
    <div
      class="right flex flex-col justify-start h-full w-4/5 md:w-11/12 py-2 px-4 cursor-pointer"
      @click="$emit('displayInfo')"
    >
      <div class="flex items-start justify-between">
        <div class="left-elements flex flex-col items-start w-4/5">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white md:text-xl">{{ todo.title }}</h2>
          <span class="text-gray-700 dark:text-white text-xs italic">Créée le {{ formatDate(todo.createdAt) }}</span>
          <p class="text-gray-700 dark:text-white text-sm">
            {{ todo.content }}
          </p>
        </div>
        <div class="right-elements flex flex-col items-end w-1/5 gap-1">
          <span class="w-10 h-3 rounded-full border-[var(--cat-color)] bg-[var(--cat-color)]" :style="{ '--cat-color': colorCat(todo.category) }"></span>
          <small v-if="displayDate" class="text-xs text-gray-700 dark:text-white">{{ checkDayLeft(todo.endDateTime) }}</small>
          <span v-if="todo.marked" class="material-symbols-outlined text-red-500">flag</span>
          <span v-if="todo.location" class="material-symbols-outlined text-blue-300">map</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TodoCard",
};
</script>

<script lang="ts" setup>
import Utils from "@/utils/utils";
import { defineProps } from "vue";
import { useStore } from "vuex";
const utils = new Utils();
const store = useStore();

const props = defineProps<{
    todo: {
        id: string;
        title: string;
        content: string;
        completed: boolean;
        createdAt: string;
        endDateTime: string;
        marked: boolean;
        location: string,
        category: number
    };
    displayDate?: boolean
}>();

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

const colorCat = (cat: number) => {
  if (cat != -1) {
    const color = store.getters['categoryStore/color'](cat)
    if (color) return color
  }
  return "#fff"
}

</script>
