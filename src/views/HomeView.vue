<template>
  <div class="home relative w-full h-full flex flex-col">
    <section
      class="home-header gap-2 md:gap-0 flex flex-col-reverse md:flex-row w-full h-fit justify-between items-start md:items-center relative z-0 px-4 py-2"
    >
      <div
        class="count-todos flex gap-2 items-baseline text-xl text-slate-700 dark:text-white font-bold tracking-widest"
      >
        <span v-show="tabs[0].active">
          {{ filterCompleted(currentTodoData, false).length }}
        </span>
        <span v-show="tabs[1].active">
          {{ filterCompleted(tomorrowTodoData, false).length }}
        </span>
        <span v-show="tabs[2].active">
          {{ filterCompleted(weeklyTodoData, false).length }}
        </span>
        <span v-show="tabs[4].active">
          {{ filterCompleted(allTodoData, false).length }}
        </span>
        <span v-show="tabs[3].active">
          {{ filterCompleted(markedTodoData, false).length }}
        </span>
        <span v-show="tabs[5].active">
          {{ filterCompleted(oldTodoData, false).length }}
        </span>
        <span class="font-thin text-lg"> TO DO {{ countText }} </span>
      </div>
      <div class="right flex items-center gap-4">
        <NavigationButton
          button-text="Ajouter une TO DO"
          class="hidden xl:block"
          @click="
            displayAside = true;
            displayAddTodo = true;
          "
        />
        <NavigationButton
          button-text="Ajouter une catégorie"
          class="hidden xl:block"
          @click="
            displayAside = true;
            displayAddCat = true;
          "
        />
        <ToggleDark />
        <ToggleEditionMode />
      </div>
    </section>
    <section
      class="home-body flex flex-col xl:flex-row xl:mt-5 w-full h-full overflow-hidden"
    >
      <!-- tabs header -->
      <div
        class="home-body__left w-full xl:w-1/3 flex flex-col gap-1 h-1/6 xl:h-full min-h-fit"
      >
        <div
          class="relative w-full flex justify-start xl:justify-center overflow-x-auto flex-row xl:flex-wrap md:gap-16 xl:gap-10 items-center mt-5 mb-1 min-h-fit"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="w-16 h-16 md:w-24 md:h-24 p-10 flex flex-col justify-center items-center gap-1 relative py-2 hover:bg-surface-100 dark:hover:bg-surfacedark-100 transition-all duration-200 ease-in-out text-gray-600 dark:text-gray-200"
            :class="{
              'border rounded-md border-green-600 dark:border-green-200 ':
                tab.active,
              '!border-red-400 !text-red-400': tab.id == 6,
              '!border-blue-400 !text-blue-400': tab.id == 1,
              '!border-green-400 !text-green-400': tab.id == 2,
              '!border-orange-400 !text-orange-400': tab.id == 3,
            }"
            @click="updateActiveTab(tab.id)"
          >
            <span class="material-symbols-outlined md:text-5xl">{{
              tab.icon
            }}</span>
          </button>
        </div>
        <div
          v-if="categoryData.length"
          class="category-container divide-y-2 hidden xl:flex flex-col h-fit overflow-y-auto"
        >
          <div
            v-for="cat in categoryData"
            :key="cat.id"
            class="category-item px-4 py-1 cursor-pointer dark:text-white text-slate-700 flex justify-between items-center"
            :class="{
              'bg-[var(--custom-color)]': filterCategory == cat.id,
            }"
            :style="{ '--custom-color': cat.color }"
          >
            <span @click="selectCat(cat.id)" class="w-3/4 h-full">
              {{ cat.label }}
            </span>
            <div class="right w-1/4 flex gap-2 items-center justify-end">
              <div v-show="isEditionMode" @click="editCat(cat)" class="edit-button relative bg-gray-200 border shadow rounded-full h-5 w-5 flex justify-center items-center cursor-pointer">
                <span class="material-symbols-outlined text-sm relative z-30">
                  edit
                </span>
                <span class="absolute top-0 left-0 z-10 w-full h-full motion-safe:animate-ping bg-gray-200 border rounded-full"></span>
              </div>
              <div @click="deleteCat(cat)" v-show="isEditionMode" class="delete-button relative bg-red-200 border shadow rounded-full h-5 w-5 flex justify-center items-center cursor-pointer">
                <span class="material-symbols-outlined text-sm relative z-30">
                  remove
                </span>
                <span class="absolute top-0 left-0 z-10 w-full h-full motion-safe:animate-ping bg-red-200 border rounded-full"></span>
              </div>
              <span class="w-10 h-3 rounded-full border-[var(--catleft-color)] bg-[var(--catleft-color)]" :style="{ '--catleft-color': cat.color }"></span>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-gray-200 xl:hidden" />
      <div
        class="separator w-1 h-full bg-gray-200 hidden xl:block rounded-full"
      ></div>
      <!-- tabs content -->
      <div
        class="flex h-5/6 w-full xl:h-full xl:w-2/3 flex-col xl:px-10 overflow-scroll pb-32 xl:pb-0"
      >
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[0].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(currentTodoData, true)"
            :todoUncompleted="filterCompleted(currentTodoData, false)"
            :displayDate="false"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[1].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(tomorrowTodoData, true)"
            :todoUncompleted="filterCompleted(tomorrowTodoData, false)"
            :displayDate="false"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[2].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(weeklyTodoData, true)"
            :todoUncompleted="filterCompleted(weeklyTodoData, false)"
            :displayDate="true"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[4].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(allTodoData, true)"
            :todoUncompleted="filterCompleted(allTodoData, false)"
            :displayDate="true"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[3].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(markedTodoData, true)"
            :todoUncompleted="filterCompleted(markedTodoData, false)"
            :displayDate="true"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
        <div
          class="py-4 transition duration-400 ease-in-out flex flex-col gap-3"
          v-show="tabs[5].active"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(oldTodoData, true)"
            :todoUncompleted="filterCompleted(oldTodoData, false)"
            :displayDate="true"
            @displayInfo="fullSelectedTodo"
            @toggleCompleted="toggleCompleted"
          />
        </div>
      </div>
    </section>
    <transition name="fade">
      <aside
        v-show="displayAside"
        v-if="windowWidth >= 1280"
        class="bgaside fixed top-0 left-0 w-full h-full backdrop-blur-sm z-20"
        @click="displayAside = false"
      ></aside>
    </transition>
    <transition name="slide-fade">
      <aside
        class="fixed h-[90%] w-2/3 right-0 top-1/2 -translate-y-1/2 rounded-l-xl bg-slate-50 dark:bg-slate-700 shadow-lg flex flex-col gap-5 z-40"
        v-show="displayAside"
        v-if="windowWidth >= 1280 && displayAside"
      >
        <div class="container-view relative w-full h-full">
          <TodoView
            v-if="displayTodoInfo"
            @close="
              displayAside = false;
              displayTodoInfo = false;
            "
          />
          <AddTodoView
            v-if="displayAddTodo"
            @close="
              displayAside = false;
              displayAddTodo = false;
            "
            @created="getTodosFromApi(); displayAddTodo = false"
          />
          <AddCatView
            v-if="displayAddCat"
            @close="
              displayAside = false;
              displayAddCat = false;
            "
            @created="getCatsFromApi(); displayAddCat = false"
            @updated="displayAddCat = false; displayAside = false"
          />
        </div>
      </aside>
    </transition>
    <router-link
      to="/add-todo"
      class="button-add fixed bottom-10 right-10 xl:hidden w-16 h-16 rounded-full bg-green-300 dark:bg-green-600 text-white flex justify-center items-center"
    >
      <span class="material-symbols-outlined text-4xl"> add_circle </span>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { Todo } from "@/entities/todo";
import Utils from "@/utils/utils";
import { useRouter } from "vue-router";
import TodoView from "./TodoView.vue";
import ListCardsTodo from "@/components/Cards/ListCardsTodo.vue";
import ToggleDark from "@/components/Buttons/ToggleDark.vue";
import ToggleEditionMode from '@/components/Buttons/ToggleEditionMode.vue'
import AddTodoView from "./AddTodoView.vue";
import AddCatView from "./AddCatView.vue";
import { Category } from "@/entities/category";

const store = useStore();
const router = useRouter();
const countText = ref("Aujourd'hui");
const windowWidth = window.innerWidth;
const utils = new Utils();

/** TABS */
const tabs = ref([
  { id: 1, text: "Aujourd'hui", icon: "today", active: true },
  { id: 2, text: "Demain", icon: "event", active: false },
  { id: 3, text: "Cette semaine", icon: "date_range", active: false },
  { id: 6, text: "Drapeaux", icon: "flag", active: false },
  { id: 4, text: "Toutes", icon: "density_small", active: false },
  { id: 5, text: "Anciennes", icon: "inventory_2", active: false },
]);

function updateActiveTab(tabId: number) {
  tabs.value.forEach((tab) => {
    if (tab.id === tabId) {
      tab.active = true;
      countText.value = tab.text;
    } else {
      tab.active = false;
    }
  });
}

/** CATS */
const filterCategory = ref(-1);
const selectCat = (cat: number): void => {
  if (cat == filterCategory.value) filterCategory.value = -1;
  else filterCategory.value = cat;
};
const filterCompleted = (data: [], completed: boolean): Todo[] => {
  return data.filter((todo: Todo) => todo.completed === completed);
};
const categoryData = computed(() => {
  return store.state.categoryStore.allCategory;
});

/** DATA */
const allTodoData = computed(() => {
  return store.state.todoStore.allTodo.data.filter((item: Todo) => {
    if (filterCategory.value === -1) return true;
    return item.category == filterCategory.value;
  });
});
const currentTodoData = computed(() => {
  return allTodoData.value.filter((item: Todo) => {
    const date = new Date(item.endDateTime);
    return utils.isToday(date);
  });
});
const tomorrowTodoData = computed(() => {
  return allTodoData.value.filter((item: Todo) => {
    const date = new Date(item.endDateTime);
    return utils.isTomorrow(date);
  });
});
const weeklyTodoData = computed(() => {
  return allTodoData.value.filter((item: Todo) => {
    const date = new Date(item.endDateTime);
    return utils.isWeekly(date);
  });
});
const markedTodoData = computed(() => {
  return allTodoData.value.filter((item: Todo) => item.marked === true);
});
const oldTodoData = computed(() => {
  return allTodoData.value.filter((item: Todo) => {
    const date = new Date(item.endDateTime);
    const today = new Date();
    return date < today;
  });
});

const toggleCompleted = (todo: Todo) => {
  store.dispatch("todoStore/updateTodo", {
    todo: todo,
    completed: true,
  });
};

/** ASIDE FOR DESKTOP FORMAT */
const displayAside = ref(false);
const displayTodoInfo = ref(false);
const displayAddTodo = ref(false);
const displayAddCat = ref(false);
const fullSelectedTodo = (todo: Todo) => {
  store.commit("SET_TODO_SELECTED", todo);
  if (windowWidth >= 1280) {
    displayAside.value = true;
    displayTodoInfo.value = true;
  } else {
    router.push("/todo");
  }
};

const getTodosFromApi = () => {
  store.dispatch("todoStore/getAllTodo");
  displayAside.value = false;
  displayAddTodo.value = false;
};
const getCatsFromApi = () => {
  store.dispatch("categoryStore/getAllCategory");
  displayAside.value = false;
  displayAddCat.value = false;
};

/** EDITION MODE */
const isEditionMode = computed(() => {
  return store.state.editionMode
})
const editCat = (cat: Category) => {
  store.commit('categoryStore/SET_SELECTED_CAT', cat)
  displayAddCat.value = true;
  displayAside.value = true;
}
const deleteCat = (cat: Category) => {
  store.dispatch('categoryStore/deteleCat', cat)
}

/** HOOKS */
onBeforeMount(() => {
  store.dispatch("todoStore/getAllTodo");
  store.dispatch("categoryStore/getAllCategory");
});
</script>

<style>
.slide-fade-enter-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 1.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(500%);
  opacity: 0;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
