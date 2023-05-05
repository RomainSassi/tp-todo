<template>
    <div>
        <label v-if="label" for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ label }} 
        </label>
        <span v-if="required" v-show="displayError" class="text-red-500 dark:text-sky-400 text-xs">
            Le champ {{ label }} est obligatoire !
        </span>
        <input 
            type="text" 
            name="" 
            id="" 
            :placeholder="props.placeholder" 
            v-model="valueInput" 
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :required="required"
        >
        <span v-if="required" class="text-red-500 dark:text-sky-400 italic text-xs">* champ requis</span>
    </div>
</template>

<script lang="ts">
export default {
    name: "InputTextComponent"
}
</script>

<script lang="ts" setup>
import { WritableComputedRef, computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  value?: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  displayError?: boolean
}>()

const emits = defineEmits(['update:value'])

const valueInput: WritableComputedRef<string> = computed({
    get(): string {
        return props.value ?? ""
    },
    set(newValue: string) {        
        emits('update:value', newValue)
    }
})
</script>