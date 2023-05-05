<template>
  <div class="">
    <label
      for=""
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <span v-if="required" v-show="displayError" class="text-red-500 dark:text-sky-400 text-xs">
        Le champ {{ label }} est obligatoire !
    </span>
    <input class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required v-model="valueInput" :placeholder="placeholder" :min="todayString" type="date" name="" id="" >
    <p v-if="required" class="text-red-500 dark:text-sky-400 italic text-xs">* champ requis</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "DatePickerComponent",
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, WritableComputedRef } from "vue";
import Utils from '@/utils/utils';

const props = defineProps<{
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean,
  displayError?: boolean
}>();

const today = new Date();

const utilsClass = new Utils();
const todayString = utilsClass.formatDate(today, "-", "en")


const emits = defineEmits(["update:value"]);
const valueInput: WritableComputedRef<string> = computed({
  get(): string {
    return props.value ?? "";
  },
  set(newValue: string) {
    console.log(newValue);
    
    emits("update:value", newValue);
  },
});
</script>

<style></style>
