<template>
  <div>

    <span
      v-if="required"
      v-show="displayError"
      class="text-red-500 dark:text-sky-400 text-xs"
    >
      Le champ {{ label }} est obligatoire !
    </span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" v-model="valueInput" class="sr-only peer" />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
      ></div>
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ label }}</span
      >
    </label>
    <span v-if="required" class="text-red-500 dark:text-sky-400 italic text-xs"
      >* champ requis</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "CheckboxComponent",
};
</script>

<script lang="ts" setup>
import { WritableComputedRef, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  value?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  displayError?: boolean;
}>();

const emits = defineEmits(["update:value"]);

const valueInput: WritableComputedRef<boolean> = computed({
  get(): boolean {
    return props.value
  },
  set(newValue: boolean) {
    emits("update:value", newValue);
  },
});
</script>
