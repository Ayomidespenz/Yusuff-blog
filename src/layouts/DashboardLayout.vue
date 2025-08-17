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
          <!-- User Menu -->
          <div class="nav-item position-relative">
            <button 
              @click="isMenuOpen = !isMenuOpen"
              class="btn btn-link nav-link text-white border-0 d-flex align-items-center gap-2"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="10" r="3"/>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
              </svg>
              {{ userData.name || 'User' }}
            </button>
            
            <!-- Menu -->
            <div v-if="isMenuOpen" class="position-absolute end-0 mt-2 py-2 bg-white rounded-3 shadow-sm" style="min-width: 200px; z-index: 1000;">
              <router-link @click="isMenuOpen = false" to="/dashboard/profile" class="d-block px-4 py-2 text-decoration-none text-dark hover-bg-light">
                Profile
              </router-link>
              <router-link @click="isMenuOpen = false" to="/dashboard/settings" class="d-block px-4 py-2 text-decoration-none text-dark hover-bg-light">
                Settings
              </router-link>
              <router-link @click="isMenuOpen = false" to="/" class="d-block px-4 py-2 text-decoration-none text-dark hover-bg-light">
                Visit Homepage
              </router-link>
              <hr class="my-2">
              <button 
                @click="handleLogout"
                class="d-block w-100 px-4 py-2 text-start text-danger border-0 bg-transparent hover-bg-light" 
                type="button"
              >
                Logout
              </button>
            </div>
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
      isMenuOpen: false,
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

  mounted() {
    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside)
  },

  unmounted() {
    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    handleLogout() {
      const { clearAuth } = useAuth()
      clearAuth()
      // Clear any stored user data
      localStorage.removeItem('user')
      this.isMenuOpen = false
      this.$router.push('/auth/login')
    },

    handleClickOutside(event) {
      const menu = this.$el.querySelector('.nav-item.position-relative')
      if (menu && !menu.contains(event.target)) {
        this.isMenuOpen = false
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

.dropdown-menu {
  margin-top: 0.5rem;
}

.nav-link.dropdown-toggle::after {
  margin-left: 0.5rem;
}

.btn-link.nav-link {
  text-decoration: none;
}

.dropdown-item:active {
  background-color: #667eea;
}

.hover-bg-light:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .sidebar {
    position: static;
    margin-bottom: 1rem;
  }
}
</style>
