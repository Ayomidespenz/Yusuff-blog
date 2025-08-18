<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'App',

  data() {
    return {
      auth: null, // we'll store useAuth here
    }
  },

  created() {
    // initialize the composable here
    this.auth = useAuth()

    // now we can call its methods
    this.auth.checkAuth()
  }
}
</script>

<style>
#app {
  font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
