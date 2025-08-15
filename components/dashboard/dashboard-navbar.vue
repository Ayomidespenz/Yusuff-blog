<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <div class="navbar-brand d-flex align-items-center">
        <div class="bg-white bg-opacity-20 rounded-3 p-2 me-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10,17 15,12 10,7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>
        <span class="h4 mb-0 fw-bold text-white">BlogCraft</span>
      </div>
      
      <div class="navbar-nav ms-auto">
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
            </svg>
            {{ user.username }}
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/dashboard/profile">Profile</router-link></li>
            <li><router-link class="dropdown-item" to="/dashboard/settings">Settings</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="handleLogout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'DashboardNavbar',
  
  setup() {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    
    return {
      user,
      userStore
    }
  },

  methods: {
    handleLogout() {
      // Use the store's logout action
      this.userStore.logout()
      // Clear any additional auth data
      localStorage.removeItem('token')
      localStorage.removeItem('isLoggedIn')
      
      // Redirect to login
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.dropdown-menu {
  min-width: 200px;
}

.dropdown-item:active {
  background-color: #667eea;
}
</style>
