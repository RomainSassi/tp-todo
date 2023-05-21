<template>
  <div class="add-todo pt-5 pb-32 xl:py-5 px-5 flex flex-col gap-5 relative w-full h-full overflow-scroll">
    <section class="header flex">
      <div class="btn hidden xl:block">
        <NavigationButton
          :button-text="'Retourner aux TO DO'"
          @click="$emit('close')"
        />
      </div>
    </section>
    <section class="body flex flex-col gap-7">
      <h2
        class="uppercase flex justify-center text-gray-600 dark:text-white font-bold tracking-widest"
      >
        Formulaire de création de todo
      </h2>
      <form class="flex flex-col gap-5 xl:m-auto min-w-[60%]">
        <InputTextComponent
          label="Titre de la todo"
          placeholder="Acheter des fraises"
          v-model:value="todo.title"
          :required="true"
          :display-error="!validTitle"
        />
        <TextAreaComponent
          label="Contenu de la todo"
          v-model:value="todo.content"
          placeholder="Bon primeur au 9 rue jean Macet"
        />
        <DatePickerComponent
          label="Date limite de la todo"
          v-model:value="todo.endDateTime"
          :required="true"
          :display-error="!validDate"
        />
        <CheckboxComponent v-model:value="todo.marked" label="Marqué d'un drapeau" />
        <InputTextComponent
          label="Localisation"
          placeholder="15 rue du poirier 13002 Marseille"
          v-model:value="todo.location"
        />
        <SelectComponent v-if="categoryData" v-model:value="todo.category" label="Catégorie" placeholder="Sélectionner une catégorie" :options="categoryData" />
        <div class="action-form flex justify-end">
          <NavigationButton @click="addCatForm" button-text="Créer une catégorie"/>
          <ValidationButton class="hidden xl:block" @click="valideForm" button-text="Créer la todo" />
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
    <transition name="slide-fade">
      <aside
        class="fixed top-1/2 -translate-y-1/2 right-0 h-[90%] w-[95%] bg-slate-50 dark:bg-slate-700 z-40 shadow-lg rounded-l-xl"
        v-if="displayForm"
      >
        <AddCatView v-if="displayForm" @close="displayForm = false" @created="displayForm = false"/>
      </aside>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddTodoView",
};
</script>

<script lang="ts" setup>
import { ref, computed, defineEmits } from "vue";
import type { Ref } from "vue";
import { Todo } from "@/entities/todo";
import TodoService from "@/services/todo.services";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AddCatView from "./AddCatView.vue";
const store = useStore();
const router = useRouter();
const emits = defineEmits(['close', 'created']);

const todo: Ref<Todo> = ref({
  id: "",
  title: "",
  content: "",
  completed: false,
  createdAt: "",
  endDateTime: "",
  marked: false, 
  location: "",
  category: -1
});

const validTitle = ref(true);
const validDate = ref(true);
const displayForm = ref(false);

const valideForm = async () => {
  if (todo.value.title && todo.value.endDateTime) {
    validDate.value = true;
    validTitle.value = true;

    const todoToSend = {
      id: "",
      title: todo.value.title,
      content: todo.value.content,
      createdAt: new Date().toISOString(),
      endDateTime: new Date(todo.value.endDateTime).toISOString(),
      completed: false,
      marked: todo.value.marked,
      location: todo.value.location,
      category: todo.value.category
    };

    const todoService = new TodoService();
    const response = await todoService.createATodo(todoToSend);
    if (response === true) {
      store.commit("SET_SNACKBAR_VALUE", {
        text: "Todo créée avec succès",
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
  } else {
    if (todo.value.endDateTime) {
      validDate.value = true;
    } else {
      validDate.value = false;
    }
    if (todo.value.title) {
      validTitle.value = true;
    } else {
      validTitle.value = false;
    }
  }
};

const addCatForm = () => {
  if (window.innerWidth >= 1280) {
    displayForm.value = true
  } else {
    router.push('/category/add');
  }
}

const categoryData = computed(() => {
  return store.state.categoryStore.allCategory;
})
</script>
