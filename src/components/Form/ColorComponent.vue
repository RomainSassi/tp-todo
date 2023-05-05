<template>
  <div>
    <label
      v-if="label"
      for="message"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <span
      v-if="required"
      v-show="displayError"
      class="text-red-500 dark:text-sky-400 text-xs"
    >
      Le champ {{ label }} est obligatoire !
    </span>
    <input
      type="color"
      name=""
      id=""
      v-model="valueInput"
      class="block bg-transparent"
      :required="required"
    />
    <span v-if="required" class="text-red-500 dark:text-sky-400 italic text-xs"
      >* champ requis</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "ColorComponent",
};
</script>

<script lang="ts" setup>
import { WritableComputedRef, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  value?: string;
  label?: string;
  required?: boolean;
  displayError?: boolean;
}>();

const emits = defineEmits(["update:value"]);

const valueInput: WritableComputedRef<string> = computed({
  get(): string {
    return props.value ?? "";
  },
  set(newValue: string) {
    emits("update:value", newValue);
  },
});
</script>
