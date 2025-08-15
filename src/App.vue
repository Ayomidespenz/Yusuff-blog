<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'App',
  setup() {
    const { checkAuth } = useAuth()
    // Check authentication state when app loads
    checkAuth()
  }
}
</script>

<style>
#app {
  font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style> 