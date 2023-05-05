<template>
  <main class="bg-white dark:bg-slate-700 h-full relative w-full box-border flex flex-col">
    <router-view/>
    <div class="container-snackbar cursor-pointer top-10 xl:bottom-10 xl:top-auto right-5 fixed min-h-[3rem] min-w-[50%] md:min-w-fit h-fit w-fit">
      <SnackbarValidation @click="resetSnackbar" v-show="isValidationSnack" :text="textSnackbar"/>
      <SnackbarInformation @click="resetSnackbar" v-show="isInfoSnack" :text="textSnackbar" />
      <SnackbarError @click="resetSnackbar" v-show="isErrorSnack" :text="textSnackbar" />
      <SnackbarWarning @click="resetSnackbar" v-show="isWarningSnack" :text="textSnackbar" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import SnackbarValidation from './components/Snackbar/SnackbarValidation.vue'
import SnackbarInformation from './components/Snackbar/SnackbarInformation.vue'
import SnackbarWarning from './components/Snackbar/SnackbarWarning.vue'
import SnackbarError from './components/Snackbar/SnackbarError.vue'
import { computed, Ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const resetSnackbar = () => {
  store.commit('RESET_SNACK');
}

const textSnackbar: Ref<string> = computed(() => {
  return store.state.snackbar.text
})

const isValidationSnack: Ref<boolean> = computed(() => {
  return store.state.snackbar.success
})
const isErrorSnack: Ref<boolean> = computed(() => {
  return store.state.snackbar.error
})
const isWarningSnack: Ref<boolean> = computed(() => {
  return store.state.snackbar.warning
})
const isInfoSnack: Ref<boolean> = computed(() => {
  return store.state.snackbar.info
})

watch([isValidationSnack, isErrorSnack, isWarningSnack, isInfoSnack], ([newValueValid, newValueError, newValueWarn, newValueInfo ]) => {
  if ((newValueValid || newValueError || newValueWarn || newValueInfo ) === true) {    
    setTimeout(() => {
      console.log('closing');
      resetSnackbar();
    }, 3000)
  }
})


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

#app > main > * {
  box-sizing: border-box;
  flex-shrink: 0; /* Prevents child elements from shrinking to fit within the main element */
  overflow: auto; /* Adds a scrollbar to child elements that overflow the main element */
}

ul {
  margin: 0;
  padding: 0
}

ul li {
  list-style-type: none;
  margin: 0;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
