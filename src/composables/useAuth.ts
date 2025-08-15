import { ref } from 'vue'

const isAuthenticated = ref(false)

export function useAuth() {
  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    isAuthenticated.value = Boolean(token && isLoggedIn === 'true')
    return isAuthenticated.value
  }

  const setAuth = (token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isLoggedIn', 'true')
    isAuthenticated.value = true
  }

  const clearAuth = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    checkAuth,
    setAuth,
    clearAuth
  }
}
