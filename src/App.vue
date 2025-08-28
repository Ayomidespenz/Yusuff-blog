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
      auth: useAuth(), // keep composable instance here
    }
  },

  created() {
    try {
      this.auth.checkAuth()
    } catch (error) {
      console.error('Auth check failed:', error)
      // Reset auth state
      this.auth.clearAuth()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
