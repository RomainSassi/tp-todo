<template>
  <div>
    
    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <span
      v-if="required"
      v-show="displayError"
      class="text-red-500 dark:text-sky-400 text-xs"
    >
      Le champ {{ label }} est obligatoire !
    </span>
    <select
      id="select"
      v-model="valueInput"
      :required="required"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">{{ option.label }}</option>
    </select>
    <span v-if="required" class="text-red-500 dark:text-sky-400 italic text-xs"
      >* champ requis</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "SelectComponent",
};
</script>

<script lang="ts" setup>
import { WritableComputedRef, computed, defineProps, defineEmits } from "vue";
interface OptionProps {
    id: number,
    label: string
}

const props = defineProps<{
  value?: number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  displayError?: boolean;
  options: OptionProps[]
}>();

const emits = defineEmits(["update:value"]);

const valueInput: WritableComputedRef<number> = computed({
  get(): number {
    return props.value ?? -1;
  },
  set(newValue: number) {
    emits("update:value", newValue);
  },
});
</script>
