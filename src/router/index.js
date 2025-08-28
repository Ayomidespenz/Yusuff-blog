import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import ForgotPasswordPage from '@/views/auth/ForgotPasswordPage.vue'
import BlogPage from '@/views/blog/BlogPage.vue'
import BlogPostPage from '@/views/blog/BlogPostPage.vue'
import UserProfilePage from '@/views/blog/UserProfilePage.vue'
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import CreatePostPage from '@/views/dashboard/CreatePostPage.vue'
import PostsPage from '@/views/dashboard/PostsPage.vue'
import EditPostPage from '@/views/dashboard/EditPostPage.vue'
import ProfilePage from '@/views/dashboard/ProfilePage.vue'
import SettingsPage from '@/views/dashboard/SettingsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/blog/profile/:username',
    name: 'UserProfile',
    component: UserProfilePage
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostPage
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardPage.vue')
      },
      {
        path: 'create',
        name: 'CreatePost',
        component: () => import('@/views/dashboard/CreatePostPage.vue')
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/views/dashboard/PostsPage.vue')
      },
      {
        path: 'posts/:id/edit',
        name: 'EditPost',
        component: () => import('@/views/dashboard/EditPostPage.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  try {
    // Initialize auth state
    const auth = useAuth()
    let isAuthenticated = false

    try {
      // Check authentication status
      isAuthenticated = auth.checkAuth()
    } catch (authError) {
      console.error('Auth check failed:', authError)
      auth.clearAuth() // Reset auth state on error
    }

    // Handle protected routes
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next({
          path: '/auth/login',
          query: { redirect: to.fullPath }
        })
        return
      }
    }

    // Handle guest-only routes
    if (to.matched.some(record => record.meta.requiresGuest)) {
      if (isAuthenticated) {
        next('/dashboard')
        return
      }
    }

    // Default: allow navigation
    next()
  } catch (error) {
    console.error('Router navigation error:', error)
    next('/auth/login') // Fallback to login page
  }
})

export default router
