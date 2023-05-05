<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" v-model="isDark" class="sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
    ></div>
    <span v-show="!isDark" class="ml-3 text-sm font-medium text-gray-900"
      >Dark Mode</span
    >
    <span v-show="isDark" class="ml-3 text-sm font-medium dark:text-gray-300"
      >Light Mode</span
    >
  </label>
</template>

<script lang="ts">
export default {
  name: "ToggleDark",
};
</script>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();
</script>
