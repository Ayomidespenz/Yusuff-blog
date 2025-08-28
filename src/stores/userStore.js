import { defineStore } from 'pinia'
import api, { authAPI } from '@/services/api' // Import both default and named export

export const useUserStore = defineStore('user', {
  state: () => {
    // Only use token to determine auth state initially
    const token = localStorage.getItem('authToken')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    return {
      user: null,
      isAuthenticated: !!(token && isLoggedIn),
      loading: false,
      error: null
    }
  },

  actions: {
    async setAuthData(token, userData) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userData', JSON.stringify(userData))
      this.isAuthenticated = true
      this.user = userData
    },

    async fetchProfile() {
      this.loading = true
      this.error = null
      try {
        const response = await authAPI.profile()
        if (response.data.success) {
          this.user = response.data.data
          return this.user
        }
        throw new Error(response.data?.message || 'Failed to fetch profile')
      } catch (error) {
        console.error('Profile fetch error:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(profileData) {
      this.loading = true
      this.error = null
      try {
        // Use FormData if we have file uploads, otherwise use regular object
        const hasFiles = profileData instanceof FormData
        const response = await api.put('/user/profile', profileData, {
          headers: hasFiles ? {
            'Content-Type': 'multipart/form-data'
          } : {
            'Content-Type': 'application/json'
          }
        })

        if (response.data.success) {
          const userData = response.data.data
          this.user = {
            ...this.user,
            ...userData
          }
          // Update localStorage
          localStorage.setItem('userData', JSON.stringify(this.user))
          return { success: true, data: userData }
        }
        throw new Error(response.data?.message || 'Failed to update profile')
      } catch (error) {
        console.error('Profile update error:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAvatar(formData) {
      this.loading = true
      this.error = null
      try {
        const response = await authAPI.updateAvatar(formData)
        if (response.data.success) {
          this.user = {
            ...this.user,
            avatar: response.data.data.avatar
          }
          // Update localStorage
          localStorage.setItem('userData', JSON.stringify(this.user))
          return { success: true, data: response.data.data }
        }
        throw new Error(response.data?.message || 'Failed to update avatar')
      } catch (error) {
        console.error('Avatar update error:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword(passwordData) {
      this.loading = true;
      this.error = null;
      try {
        // Laravel expects 'current_password', 'password', and 'password_confirmation'
        const payload = {
          current_password: passwordData.current_password,
          password: passwordData.new_password,
          password_confirmation: passwordData.new_password_confirmation
        };
        
        const response = await authAPI.updatePassword(payload);
        
        if (response.data.success) {
          return { success: true, data: response.data.data };
        }
        throw new Error(response.data?.message || 'Failed to change password');
      } catch (error) {
        console.error('Password change error:', error);
        const message = error.response?.data?.message || error.message;
        this.error = message;
        throw new Error(message);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authAPI.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('authToken')
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userData')
        this.user = null
        this.isAuthenticated = false
      }
    }
  },

  getters: {
    getUsername: (state) => state.user.username,
    getUserProfile: (state) => state.user
  }
})
