<template>
  <div class="add-todo px-5 h-full overflow-scroll pt-5 pb-32 xl:py-5">
    <section class="header flex">
      <div class="btn hidden xl:block">
        <NavigationButton
          :button-text="'Retourner a la TO DO'"
          @click="$emit('close')"
        />
      </div>
    </section>
    <section class="body flex flex-col gap-7">
      <h2
        class="uppercase flex justify-center text-gray-600 dark:text-white font-bold tracking-widest"
      >
        Formulaire de modification de todo
      </h2>
      <form class="flex flex-col gap-5">
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
          v-model:value="todoEndTime"
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
      </form>
      <div class="action-form">
        <ValidationButton @click="valideForm" button-text="Mettre à jour la To do" />
      </div>
    </section>
    <router-link
      to="/todo"
      class="button-add fixed bottom-10 right-10 xl:hidden w-16 h-16 rounded-full bg-red-300 dark:bg-red-600 text-white flex justify-center items-center"
    >
      <span class="material-symbols-outlined text-4xl"> close </span>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "UpdateTodoView",
};
</script>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { Todo } from "@/entities/todo";
import { useStore } from "vuex";
import Utils from '@/utils/utils';
const store = useStore();
const utils = new Utils();

const todo: Ref<Todo> = ref(store.state.todoSelected);
const todoEndTime = ref(utils.formatDate(new Date(store.state.todoSelected.endDateTime),"-","en"))

const validTitle = ref(true);
const validDate = ref(true);

const valideForm = async () => {
  if (todo.value.title && todoEndTime.value) {
    validDate.value = true;
    validTitle.value = true;

    const todoToSend: Todo = {
      id: todo.value.id,
      title: todo.value.title,
      content: todo.value.content,
      createdAt: todo.value.createdAt,
      endDateTime: new Date(todoEndTime.value).toISOString(),
      completed: false,
      marked: todo.value.marked,
      location: todo.value.location,
      category: todo.value.category
    };

    store.dispatch("todoStore/updateTodo", {
      todo: todoToSend,
      completed: false,
    });
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

const categoryData = computed(() => {
  return store.state.categoryStore.allCategory;
})
</script>
