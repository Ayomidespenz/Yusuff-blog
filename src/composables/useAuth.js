import { ref } from 'vue'
import router from '@/router' // Import the router instance directly

const isAuthenticated = ref(false)
const user = ref(null)

export function useAuth() {
  const checkAuth = () => {
    try {
      const token = localStorage.getItem('authToken')
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('userData')
      
      // First clear the current state
      isAuthenticated.value = false
      user.value = null

      // Only try to parse userData if all required data exists
      if (token && isLoggedIn === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          if (parsedUser) {
            isAuthenticated.value = true
            user.value = parsedUser
          }
        } catch (parseError) {
          console.error('Failed to parse user data:', parseError)
          // Clear invalid data
          localStorage.removeItem('authToken')
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('userData')
        }
      }
      
      return isAuthenticated.value
    } catch (error) {
      console.error('Auth check failed:', error)
      return false
    }
  }

  const setAuth = (token, userData) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userData', JSON.stringify(userData))
    isAuthenticated.value = true
    user.value = userData
  }

  const clearAuth = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    isAuthenticated.value = false
    user.value = null
    router.push('/') // Redirect to homepage instead of login
  }

  return {
    isAuthenticated,
    user,
    checkAuth,
    setAuth,
    clearAuth
  }
}
