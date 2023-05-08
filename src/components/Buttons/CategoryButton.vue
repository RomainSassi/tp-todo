<template>
  <div
    class="category-item px-4 py-1 cursor-pointer dark:text-white text-slate-700 flex justify-between items-center"
    :class="{
      'bg-[var(--custom-color)]': filterCategory == cat.id,
    }"
    :style="{ '--custom-color': cat.color }"
  >
    <span @click="$emit('select', cat.id)" class="w-3/4 h-full">
      {{ cat.label }}
    </span>
    <div class="right w-1/4 flex gap-2 items-center justify-end">
      <div
        v-show="isEditionMode"
        @click="$emit('edit', cat)"
        class="edit-button relative bg-gray-200 border shadow rounded-full h-5 w-5 flex justify-center items-center cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm relative z-30">
          edit
        </span>
        <span
          class="absolute top-0 left-0 z-10 w-full h-full motion-safe:animate-ping bg-gray-200 border rounded-full"
        ></span>
      </div>
      <div
        @click="deleteCat(cat)"
        v-show="isEditionMode"
        class="delete-button relative bg-red-200 border shadow rounded-full h-5 w-5 flex justify-center items-center cursor-pointer"
      >
        <span class="material-symbols-outlined text-sm relative z-30">
          remove
        </span>
        <span
          class="absolute top-0 left-0 z-10 w-full h-full motion-safe:animate-ping bg-red-200 border rounded-full"
        ></span>
      </div>
      <span
        class="w-10 h-3 rounded-full border-[var(--catleft-color)] bg-[var(--catleft-color)]"
        :style="{ '--catleft-color': cat.color }"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CategoryButton",
};
</script>

<script lang="ts" setup>
import { Category } from "@/entities/category";
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps<{
  cat: {
    id: any;
    label: string;
    color: string;
  };
  filterCategory: number;
  isEditionMode: boolean
}>();

const deleteCat = (cat: Category) => {
  store.dispatch('categoryStore/deteleCat', cat)
}
</script>
