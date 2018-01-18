<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.directive('focus', {
  // https://jsfiddle.net/LukaszWiktor/cap43pdn/
  inserted: (element, binding, vnode) => {
    element.focus()
  },
  update: (element, binding, vnode, oldVnode) => {
    Vue.nextTick(() => element.focus())
  }
})

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 66%;
}
</style>
