<template>
  <div class="min-vh-100 bg-light">
    <!-- Dashboard Header -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <div class="navbar-brand d-flex align-items-center">
          <div class="bg-white bg-opacity-20 rounded-3 p-2 me-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </div>
          <router-link to="/dashboard" class="text-decoration-none">
            <span class="h4 mb-0 fw-bold text-white">Mishary-Hub Dashboard</span>
          </router-link>
        </div>
        
        <div class="navbar-nav ms-auto">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="10" r="3"/>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
              </svg>
              {{ userData.name || 'User' }}
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/dashboard/profile">Profile</router-link></li>
              <li><router-link class="dropdown-item" to="/dashboard/settings">Settings</router-link></li>
              <li><router-link class="dropdown-item" to="/">Visit Homepage</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" @click="handleLogout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block bg-white sidebar shadow-sm" style="min-height: calc(100vh - 72px);">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li v-for="item in menuItems" :key="item.path" class="nav-item">
                <router-link 
                  :to="item.path" 
                  class="nav-link d-flex align-items-center" 
                  :class="{ active: isActiveRoute(item.path) }"
                >
                  <component :is="item.icon" class="me-2" />
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-9 ms-sm-auto col-lg-10">
          <slot>
            <router-view />
          </slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  Settings,
  Home
} from 'lucide-vue-next'

export default {
  name: 'DashboardLayout',

  data() {
    return {
      userData: {},
      menuItems: [
        {
          label: 'Home',
          path: '/',
          icon: Home
        },
        {
          label: 'Dashboard',
          path: '/dashboard',
          icon: LayoutDashboard
        },
        {
          label: 'Posts',
          path: '/dashboard/posts',
          icon: FileText
        },
        {
          label: 'Create Post',
          path: '/dashboard/create',
          icon: PlusCircle
        },
        {
          label: 'Profile',
          path: '/dashboard/profile',
          icon: User
        },
        {
          label: 'Settings',
          path: '/dashboard/settings',
          icon: Settings
        }
      ]
    }
  },

  created() {
    // Load user data from localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        this.userData = JSON.parse(userStr)
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }

    // Check authentication
    const { checkAuth } = useAuth()
    if (!checkAuth()) {
      this.$router.push('/auth/login')
    }
  },

  methods: {
    handleLogout() {
      if (confirm('Are you sure you want to logout?')) {
        const { clearAuth } = useAuth()
        clearAuth()
        this.$router.push('/auth/login')
      }
    },

    isActiveRoute(path) {
      return this.$route.path === path || 
             (path !== '/dashboard' && this.$route.path.startsWith(path))
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 72px;
}

.sidebar .nav-link {
  color: #6c757d;
  border-radius: 8px;
  margin: 2px 0;
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
}

.sidebar .nav-link:hover {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

.sidebar .nav-link.active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
  font-weight: 600;
}

@media (max-width: 768px) {
  .sidebar {
    position: static;
    margin-bottom: 1rem;
  }
}
</style>
