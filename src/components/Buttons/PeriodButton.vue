<template>
  <button
    class="w-16 h-16 md:w-24 md:h-24 p-10 flex flex-col justify-center items-center gap-1 relative py-2 hover:bg-surface-100 dark:hover:bg-surfacedark-100 text-gray-600 dark:text-gray-200"
    :class="{
      'border rounded-md border-green-600 dark:border-green-200 ': active,
      '!border-red-400 !text-red-400': id == 6,
      '!border-blue-400 !text-blue-400': id == 1,
      '!border-green-400 !text-green-400': id == 2,
      '!border-orange-400 !text-orange-400': id == 3,
    }"
  >
    <span class="material-symbols-outlined md:text-5xl">{{ icon }}</span>
    <span class="counter-todo absolute -top-2 -right-2">
      <span
        class="text-white rounded-full w-5 h-5 flex justify-center items-center bg-gray-400"
        :class="{
          '!bg-red-400': id == 6,
          '!bg-blue-400': id == 1,
          '!bg-green-400': id == 2,
          '!bg-orange-400': id == 3,
        }"
      >
        {{ counter }}
      </span>
    </span>
  </button>
</template>

<script lang="ts">
export default {
  name: "PeriodButton",
};
</script>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  id: number;
  text: string;
  icon: string;
  counter: number;
  active: boolean;
}>();
</script>
