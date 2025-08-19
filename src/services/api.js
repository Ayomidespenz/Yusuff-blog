import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // Set timeout to 10 seconds
  validateStatus: status => status >= 200 && status < 500 // Handle all responses
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userData')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  profile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  updateAvatar: (data) => api.post('/user/avatar', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updatePassword: (data) => api.post('/user/password', data),
  forgotPassword: (data) => api.post('/forgot-password', data),
  resetPassword: (data) => api.post('/reset-password', data),
}

// Posts API
export const postsAPI = {
  getAll: (params = {}) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => {
    return api.post(`/posts/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { _method: 'PUT' }  // Use POST with _method=PUT for proper FormData handling
    });
  },
  delete: (id) => api.delete(`/posts/${id}`),
  search: (params = {}) => api.get('/posts/search', { params }),
  categories: () => api.get('/categories'),
  userPosts: (params = {}) => api.get('/user/posts', { params }),
  userStats: () => api.get('/user/stats'),
}

// Comments API
export const commentsAPI = {
  getByPost: (postId) => api.get(`/posts/${postId}/comments`),
  create: (postId, data) => api.post(`/posts/${postId}/comments`, data),
}

// Likes API
export const likesAPI = {
  like: (postId) => api.post(`/posts/${postId}/like`),
  unlike: (postId) => api.delete(`/posts/${postId}/like`),
}

export default api
