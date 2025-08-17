import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)

export function useAuth() {
  const router = useRouter()

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    isAuthenticated.value = Boolean(token && isLoggedIn === 'true')
    return isAuthenticated.value
  }

  const setAuth = (token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isLoggedIn', 'true')
    isAuthenticated.value = true
  }

  const clearAuth = () => {
    // Clear all auth-related data
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    isAuthenticated.value = false
    
    // Redirect to login page
    router.push('/auth/login')
  }

  // Initialize authentication state
  checkAuth()

  return {
    isAuthenticated,
    checkAuth,
    setAuth,
    clearAuth
  }
}
