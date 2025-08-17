import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { postsAPI } from '@/services/api'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const loadPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.userPosts()
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to load posts')
      }
      posts.value = response.data.data
    } catch (err) {
      console.error('Error loading posts:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updatePost = (updatedPost) => {
    posts.value = posts.value.map(post => 
      post.id === updatedPost.id ? { ...post, ...updatedPost } : post
    )
  }

  // Getters
  const getPostById = computed(() => (id) => {
    return posts.value.find(post => post.id === id)
  })

  return {
    posts,
    loading,
    error,
    loadPosts,
    updatePost,
    getPostById
  }
})
