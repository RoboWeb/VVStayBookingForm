<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <icon-arrow></icon-arrow>
  <icon-chevron chevron="left"  ></icon-chevron>
  <icon-star fill="green" filled="empty"></icon-star>
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
