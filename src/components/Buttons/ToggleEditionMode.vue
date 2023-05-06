<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" :value="editionMode" @change="updateStoreEditionMode" class="sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
    ></div>
    <span v-show="!editionMode" class="ml-3 text-sm font-medium text-gray-900"
      >Modifier</span
    >
    <span v-show="editionMode" class="ml-3 text-sm font-medium dark:text-gray-300"
      >Annuler</span
    >
  </label>
</template>

<script lang="ts">
export default {
  name: "ToggleEditionMode",
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const editionMode = computed(() => {
  return store.state.editionMode
})

const updateStoreEditionMode = () => {
  store.commit('TOGGLE_EDITION_MODE')
}
</script>
