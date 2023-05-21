<template>
  <div class="home relative w-full h-full flex flex-col">
    <section
      class="home-header gap-2 md:gap-0 flex flex-col-reverse md:flex-row w-full h-fit min-h-[5rem] justify-between items-start md:items-center relative z-0 px-4 py-2"
    >
      <div
        class="count-todos flex gap-2 items-baseline text-xl text-slate-700 dark:text-white font-bold tracking-widest w-full xl:w-1/3 h-full relative"
      >
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-full"
        >
          <span v-show="tab.id === selectedTabId" class="w-full flex gap-2">
            {{ tab.counter }}
            <span class="font-thin text-lg"> TO DO {{ tab.text }} </span>
          </span>
        </div>
      </div>
      <div class="right flex justify-end items-center gap-4 xl:w-2/3">
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
        <ToggleDark class="hidden xl:flex" />
        <ToggleEditionMode class="hidden xl:flex" />
      </div>
    </section>
    <section
      class="home-body flex flex-col xl:flex-row xl:mt-5 w-full h-full overflow-hidden"
    >
      <!-- tabs header -->
      <div
        class="home-body__left w-full xl:w-1/3 flex flex-col divide-y gap-1 xl:h-full min-h-fit"
      >
        <div
          class="relative w-full flex justify-start xl:justify-center overflow-x-auto flex-row xl:flex-wrap md:gap-16 xl:gap-10 items-center mt-5 mb-1 h-fit xl:h-1/2 2xl:h-1/3 pt-5"
        >
          <PeriodButton
            v-for="tab in tabs"
            :key="tab.id"
            :id="tab.id"
            :text="tab.text"
            :icon="tab.icon"
            :counter="tab.counter"
            :active="tab.id === selectedTabId"
            @click="updateActiveTab(tab.id)"
          />
        </div>
        <div
          v-if="categoryData.length"
          class="category-container divide-y-2 flex flex-col h-fit xl:h-1/2 2xl:h-2/3"
        >
          <h4
            class="flex items-center py-3 pl-4 gap-5 text-slate-700 font-semibold dark:text-white md:text-2xl"
          >
            <div class="flex items-center gap-2 w-full cursor-pointer" @click="displayCats = !displayCats">
              <span class="material-symbols-outlined">
                tune 
              </span>
              <span>
                Filtres
              </span>
            </div>
            <div class="flex w-full pr-6 gap-4 items-center justify-between">
              <span v-show="filterCategory != -1" class="material-symbols-outlined animate-bounce">
                check
              </span>
              <span @click="filterCategory = -1" v-show="filterCategory != -1" class="material-symbols-outlined hover:animate-spin cursor-pointer">
                restart_alt
              </span>
            </div>
          </h4>
          <ul
            class="xl:divide-y divide-gray-200 h-full overflow-y-scroll grid grid-cols-2 xl:flex xl:flex-col"
            v-show="displayCats"
          >
            <li v-for="cat in categoryData" :key="cat.id">
              <CategoryButton
                @edit="editCat"
                @select="selectCat"
                :filter-category="filterCategory"
                :cat="cat"
                :is-edition-mode="isEditionMode"
              />
            </li>
          </ul>
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
          class="py-4 px-4 xl:px-0 transition duration-400 ease-in-out flex flex-col gap-3"
          v-for="tab in tabs"
          :key="tab.id"
          v-show="tab.id === selectedTabId"
        >
          <ListCardsTodo
            :todoCompleted="filterCompleted(tab.data, true)"
            :todoUncompleted="filterCompleted(tab.data, false)"
            :displayDate="tab.displayDate"
            @displayInfo="fullSelectedTodo"
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
            @created="
              getTodosFromApi();
              displayAddTodo = false;
            "
          />
          <AddCatView
            v-if="displayAddCat"
            @close="
              displayAside = false;
              displayAddCat = false;
            "
            @created="
              getCatsFromApi();
              displayAddCat = false;
            "
            @updated="
              displayAddCat = false;
              displayAside = false;
            "
          />
        </div>
      </aside>
    </transition>
    <div
      class="container-add-elements fixed bottom-10 left-10 xl:hidden flex flex-col-reverse"
    >
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-44 justify-between"
        @click="displaySettings = !displaySettings"
      >
        Settings
        <span class="material-symbols-outlined text-4xl"> settings </span>
      </button>
      <!-- Dropdown menu -->
      <transition name="dropup-button">
        <div
          id="dropdown"
          class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow h-48 w-44 dark:bg-gray-700"
          v-show="displaySettings"
        >
          <ul
            class="py-2 px-4 flex flex-col gap-5 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <ToggleDark class="xl:hidden block" />
            </li>
            <li>
              <ToggleEditionMode class="xl:hidden block" />
            </li>
            <li>
              <NavigationButton
                routerTo="/category/add"
                button-text="Ajouter une catégorie"
                class="xl:hidden block"
              />
            </li>
          </ul>
        </div>
      </transition>
    </div>
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
import { useRouter } from "vue-router";

import { Todo } from "@/entities/todo";
import { Category } from "@/entities/category";

import Utils from "@/utils/utils";

import AddTodoView from "./AddTodoView.vue";
import AddCatView from "./AddCatView.vue";
import TodoView from "./TodoView.vue";

import ListCardsTodo from "@/components/Cards/ListCardsTodo.vue";
import ToggleDark from "@/components/Buttons/ToggleDark.vue";
import ToggleEditionMode from "@/components/Buttons/ToggleEditionMode.vue";
import PeriodButton from "@/components/Buttons/PeriodButton.vue";
import CategoryButton from "@/components/Buttons/CategoryButton.vue";

const store = useStore();
const router = useRouter();
const countText = ref("Aujourd'hui");
const windowWidth = window.innerWidth;
const utils = new Utils();

const displaySettings = ref(false);

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
const displayCats = ref(false);

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

/** TABS */
const selectedTabId = ref(1);
const tabs = computed(() => {
  return [
    {
      id: 1,
      text: "Aujourd'hui",
      icon: "today",
      counter: filterCompleted(currentTodoData.value, false).length,
      data: currentTodoData.value,
      displayDate: false,
    },
    {
      id: 2,
      text: "Demain",
      icon: "event",
      counter: filterCompleted(tomorrowTodoData.value, false).length,
      data: tomorrowTodoData.value,
      displayDate: false,
    },
    {
      id: 3,
      text: "Cette semaine",
      icon: "date_range",
      counter: filterCompleted(weeklyTodoData.value, false).length,
      data: weeklyTodoData.value,
      displayDate: true,
    },
    {
      id: 6,
      text: "Drapeaux",
      icon: "flag",
      counter: filterCompleted(markedTodoData.value, false).length,
      data: markedTodoData.value,
      displayDate: true,
    },
    {
      id: 4,
      text: "Toutes",
      icon: "density_small",
      counter: filterCompleted(allTodoData.value, false).length,
      data: allTodoData.value,
      displayDate: true,
    },
    {
      id: 5,
      text: "Anciennes",
      icon: "inventory_2",
      counter: filterCompleted(oldTodoData.value, false).length,
      data: oldTodoData.value,
      displayDate: true,
    },
  ];
});

function updateActiveTab(tabId: number) {
  selectedTabId.value = tabId;
  tabs.value.forEach((tab) => {
    if (tab.id === tabId) {
      countText.value = tab.text;
    }
  });
}

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
  return store.state.editionMode;
});
const editCat = (cat: Category) => {
  store.commit("categoryStore/SET_SELECTED_CAT", cat);
  displayAddCat.value = true;
  displayAside.value = true;
};
const deleteCat = (cat: Category) => {
  store.dispatch("categoryStore/deteleCat", cat);
};

/** HOOKS */
onBeforeMount(() => {
  store.dispatch("todoStore/getAllTodo");
  store.dispatch("categoryStore/getAllCategory");
  if (windowWidth >= 1280) {
    displayCats.value = true
  }
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

.dropup-button-enter-active,
.dropup-button-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.dropup-button-enter-from,
.dropup-button-leave-to {
  height: 0px !important;
}
</style>
