
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store'
import "@/assets/tailwind.css";

import NavigationButton from './components/Buttons/NavigationButton.vue'
import ValidationButton from './components/Buttons/ValidationButton.vue'

import InputTextComponent from './components/Form/InputTextComponent.vue'
import TextAreaComponent from './components/Form/TextAreaComponent.vue'
import DatePickerComponent from './components/Form/DatePickerComponent.vue'
import CheckboxComponent from './components/Form/CheckboxComponent.vue'
import SelectComponent from './components/Form/SelectComponent.vue'
import ColorComponent from './components/Form/ColorComponent.vue'

const app = createApp(App);

app.use(store)
    .use(router)

app.component("NavigationButton", NavigationButton)
    .component("ValidationButton", ValidationButton)
    .component("InputTextComponent", InputTextComponent)
    .component("TextAreaComponent", TextAreaComponent)
    .component("DatePickerComponent", DatePickerComponent)
    .component("CheckboxComponent", CheckboxComponent)
    .component("SelectComponent", SelectComponent)
    .component("ColorComponent", ColorComponent)


app.mount('#app');