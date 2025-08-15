<template>
  <nav class="col-md-3 col-lg-2 d-md-block bg-white sidebar shadow-sm">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <router-link 
            :to="item.path" 
            class="nav-link d-flex align-items-center"
            :class="{ active: isActive(item.path) }"
          >
            <component :is="item.icon" class="me-2" />
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  Settings
} from 'lucide-vue-next'

export default {
  name: 'DashboardSidebar',
  
  data() {
    return {
      menuItems: [
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

  methods: {
    isActive(path) {
      return this.$route.path === path || this.$route.path.startsWith(path + '/')
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: calc(100vh - 72px);
}

.nav-link {
  color: #6c757d;
  border-radius: 8px;
  margin: 2px 0;
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
}

.nav-link:hover {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

.nav-link.active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
  font-weight: 600;
}
</style>
