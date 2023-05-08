<template>
  <div
    class="add-cat pt-5 pb-32 xl:py-5 px-5 flex flex-col gap-5 relative w-full h-full overflow-scroll"
  >
    <section class="header flex">
      <div class="btn hidden xl:block">
        <NavigationButton
          :button-text="'Retourner aux TO DO'"
          @click="$emit('close')"
        />
      </div>
    </section>
    <section class="body">
      <h2
        class="uppercase flex justify-center text-gray-600 dark:text-white font-bold tracking-widest"
      >
        Formulaire de création de catégorie
      </h2>
      <form class="flex flex-col gap-5 xl:m-auto min-w-[60%]">
        <InputTextComponent
          label="Label de la catégorie"
          placeholder="Maison"
          v-model:value="cat.label"
          :required="true"
          :display-error="!validLabel"
        />
        <ColorComponent
          label="Couleur de la catégorie"
          v-model:value="cat.color"
          :required="true"
          :display-error="!validColor"
        />
        <div class="action-form hidden xl:flex justify-end">
          <ValidationButton
            @click="valideForm"
            button-text="Créer la catégorie"
          />
        </div>
      </form>
    </section>
    <button
      class="button-add fixed bottom-10 left-10 xl:hidden w-16 h-16 rounded-full bg-green-300 dark:bg-green-600 text-white flex justify-center items-center"
      @click="valideForm"
    >
      <span class="material-symbols-outlined text-4xl"> data_check </span>
    </button>
    <router-link
      to="/"
      class="button-add fixed bottom-10 right-10 xl:hidden w-16 h-16 rounded-full bg-red-300 dark:bg-red-600 text-white flex justify-center items-center"
    >
      <span class="material-symbols-outlined text-4xl"> close </span>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddCatView",
};
</script>

<script lang="ts" setup>
import { ref, defineEmits, onBeforeMount, computed, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { Category } from "@/entities/category";
import CategoryService from '@/services/category.services';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
const emits = defineEmits(['close', 'created', 'updated']);

const cat: Ref<Category> = ref({
  id: "",
  label: "",
  color: "",
});

const validLabel = ref(true);
const validColor = ref(true);

const valideForm = async () => {
    console.log(cat.value);
    
  if (cat.value.label && cat.value.color) {
    validColor.value = true;
    validLabel.value = true;

    
    if (selectedCat.value.id) {
      const response = await store.dispatch('categoryStore/updateCat', cat.value)
      if (response === true) {
        if (window.innerWidth >= 1280) {
          emits('updated');
        } else {
          router.push('/');
        }
      }
    } else {

      const catService = new CategoryService();
      const response = await catService.createACategory(cat.value)
  
      if (response === true) {
        store.commit("SET_SNACKBAR_VALUE", {
          text: "Catégorie créée avec succès",
          concern: "success",
        });
        if (window.innerWidth >= 1280) {
          emits('created');
        } else {
          router.push('/');
        }
      } else {
        store.commit("SET_SNACKBAR_VALUE", {
          text: "Erreur lors de la création de la TO DO",
          concern: "error",
        });
      }
    }

  } else {
    if (cat.value.label) {
      validLabel.value = true;
    } else {
      validLabel.value = false;
    }
    if (cat.value.color) {
      validColor.value = true;
    } else {
      validColor.value = false;
    }
  }
};

const selectedCat = computed(() => {
  return store.state.categoryStore.selectedCat
})

onBeforeMount(() => {
  if (selectedCat.value.id) {
    cat.value = selectedCat.value
  }
})
onBeforeUnmount(() => {
  if (selectedCat.value.id) {
    store.commit('categoryStore/SET_SELECTED_CAT', {});
  }
})
</script>
