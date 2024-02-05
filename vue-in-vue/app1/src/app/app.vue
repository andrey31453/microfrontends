<script setup lang="ts">
declare global {
  interface Window {
    container: Function
  }
}

const on_click = () => {
  window.container(['1', '2', '3', '4'])
}
</script>

<template>
  <div>
    <h1>main</h1>

    <button @click="on_click">click</button>
  </div>
</template>
