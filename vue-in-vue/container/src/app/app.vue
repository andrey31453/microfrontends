<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { app1 } from 'app1/app1init'

const menu = ref([])

onMounted(() => {
  console.log('onMounted')
  app1('#main', (menu_data) => (menu.value = menu_data))
})
</script>

<template>
  <div class="cont">
    <div class="menu">
      <h1>menu</h1>
      <div
        v-for="menu_el in menu"
        :key="menu_el"
      >
        {{ menu_el }}
      </div>
    </div>

    <div class="main">
      <div id="main"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cont {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;
}

.menu {
  padding: 10px;
  color: white;
  background-color: black;
}

.main {
  padding: 10px;
}
</style>
