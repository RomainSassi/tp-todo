<template>
    <router-link
        v-if="routerTo"
        :to="routerTo"
        :type="type"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {{ buttonText }}
    </router-link>
    <button v-else class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        {{ buttonText }}
    </button>
</template>

<script lang="ts">
export default {
    name: "NavigationButton"
}
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
    buttonText: string,
    routerTo?: string,
    type?: { default: "button" }
}>()
</script>

<style>

</style>