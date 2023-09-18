import { createApp } from 'vue'
import App from './App.vue'
import components from '../src/components/UI'
import router from '../src/router/router'
import directives from '../src/directives'
import store from '../src/store'
import './style.css'

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
