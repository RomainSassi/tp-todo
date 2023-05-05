<template>
    <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{{ buttonText }}</button>
</template>

<script lang="ts">
export default {
    name: "ValidationButton"
}
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
    buttonText: string,
}>()
</script>