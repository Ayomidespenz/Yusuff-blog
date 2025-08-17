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
    component: LoginPage
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterPage
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
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostPage
  },
  {
    path: '/blog/profile/:username',
    name: 'UserProfile',
    component: UserProfilePage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/dashboard/create',
    name: 'CreatePost',
    component: CreatePostPage
  },
  {
    path: '/dashboard/posts',
    name: 'Posts',
    component: PostsPage
  },
  {
    path: '/dashboard/posts/:id/edit',
    name: 'EditPost',
    component: EditPostPage
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/dashboard/settings',
    name: 'Settings',
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication for protected routes
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth()
  const isAuthenticated = checkAuth()
  
  // List of routes that require authentication
  const requiresAuth = [
    '/dashboard',
    '/dashboard/create',
    '/dashboard/posts',
    '/dashboard/profile',
    '/dashboard/settings'
  ]

  if (requiresAuth.some(path => to.path.startsWith(path)) && !isAuthenticated) {
    // Redirect to login if trying to access protected route while not authenticated
    next({ path: '/auth/login', query: { redirect: to.fullPath } })
  } else if (to.path === '/auth/login' && isAuthenticated) {
    // Redirect to dashboard if trying to access login while already authenticated
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router 