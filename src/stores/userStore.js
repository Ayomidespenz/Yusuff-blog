// Using Pinia for state management
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    // Try to get auth data first (from registration/login)
    const authData = JSON.parse(localStorage.getItem('auth')) || {}
    // Then get any additional profile data
    const profileData = JSON.parse(localStorage.getItem('userProfile')) || {}
    
    return {
      user: {
        // Auth data takes precedence
        username: authData.username || profileData.username || 'User',
        email: authData.email || profileData.email || '',
        // Additional profile fields
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        bio: profileData.bio || '',
        website: profileData.website || '',
        location: profileData.location || '',
        avatar: profileData.avatar || '',
        twitter: profileData.twitter || '',
        linkedin: profileData.linkedin || '',
        github: profileData.github || '',
        // Keep track of auth state
        isAuthenticated: !!authData.username
      }
    }
  },

  actions: {
    setAuthData(authData) {
      // Update auth-related fields
      this.user.username = authData.username
      this.user.email = authData.email
      this.user.isAuthenticated = true
      // Save to auth storage
      localStorage.setItem('auth', JSON.stringify({
        username: authData.username,
        email: authData.email
      }))
    },

    updateProfile(profileData) {
      // Update profile-related fields
      this.user = { 
        ...this.user,
        ...profileData,
        // Preserve auth data
        username: this.user.username,
        email: this.user.email,
        isAuthenticated: this.user.isAuthenticated
      }
      // Save to profile storage
      localStorage.setItem('userProfile', JSON.stringify(profileData))
    },

    logout() {
      localStorage.removeItem('auth')
      localStorage.removeItem('userProfile')
      this.user = {
        username: 'User',
        email: '',
        firstName: '',
        lastName: '',
        bio: '',
        website: '',
        location: '',
        avatar: '',
        twitter: '',
        linkedin: '',
        github: '',
        isAuthenticated: false
      }
    }
  },

  getters: {
    getUsername: (state) => state.user.username,
    getUserProfile: (state) => state.user
  }
})
