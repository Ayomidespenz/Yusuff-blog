import { ref } from 'vue'
import router from '@/router' // Import the router instance directly

const isAuthenticated = ref(false)
const user = ref(null)

export function useAuth() {
  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('userData')
    
    if (token && isLoggedIn === 'true' && userData) {
      isAuthenticated.value = true
      user.value = JSON.parse(userData)
    } else {
      isAuthenticated.value = false
      user.value = null
    }
    
    return isAuthenticated.value
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
