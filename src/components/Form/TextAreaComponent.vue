<template>
    <div>
        <label v-if="label" for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ label }}
        </label>
        <textarea 
            v-model="valueInput" 
            id="message" rows="4" 
            :placeholder="placeholder" 
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
        </textarea>
    </div>
</template>

<script lang="ts">
export default {
    name: "TextAreaComponent"
}
</script>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, WritableComputedRef } from 'vue';

const props = defineProps<{
    value?: string,
    placeholder?: string,
    label?: string
}>()

const emits = defineEmits(['update:value'])

const valueInput:  WritableComputedRef<string> = computed({
    get(): string {
        return props.value ?? ""
    },
    set(newValue: string) {
        emits('update:value', newValue)
    }
})

</script>