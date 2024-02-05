import { createApp } from 'vue'
import app from './app.vue'

declare global {
  interface Window {
    container: Function
  }
}

export const app1 = (id, container) => {
  createApp(app).mount(id)

  window.container = container
}

app1('#container', () => {
  console.log('inner')
})
