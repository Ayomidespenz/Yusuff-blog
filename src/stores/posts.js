import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { postsAPI } from '@/services/api'

export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const totalPosts = ref(0)
  const currentPage = ref(1)

  // Actions
  const loadPosts = async (page = 1, limit = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.userPosts({ page, limit })
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to load posts')
      }
      posts.value = response.data.data
      totalPosts.value = response.data.total || posts.value.length
      currentPage.value = page
    } catch (err) {
      console.error('Error loading posts:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const loadPost = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.getPost(id)
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to load post')
      }
      currentPost.value = response.data.data
      return response.data.data
    } catch (err) {
      console.error('Error loading post:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const createPost = async (postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.createPost(postData)
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create post')
      }
      posts.value.unshift(response.data.data)
      return response.data.data
    } catch (err) {
      console.error('Error creating post:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id, postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.updatePost(id, postData)
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update post')
      }
      const updatedPost = response.data.data
      posts.value = posts.value.map(post => 
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
      if (currentPost.value?.id === updatedPost.id) {
        currentPost.value = updatedPost
      }
      return updatedPost
    } catch (err) {
      console.error('Error updating post:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await postsAPI.deletePost(id)
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete post')
      }
      posts.value = posts.value.filter(post => post.id !== id)
      if (currentPost.value?.id === id) {
        currentPost.value = null
      }
      return true
    } catch (err) {
      console.error('Error deleting post:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const setCurrentPost = (post) => {
    currentPost.value = post
  }

  const clearError = () => {
    error.value = null
  }

  // Getters
  const getPostById = computed(() => (id) => {
    return posts.value.find(post => post.id === id)
  })

  const publishedPosts = computed(() => {
    return posts.value.filter(post => post.status === 'published')
  })

  const draftPosts = computed(() => {
    return posts.value.filter(post => post.status === 'draft')
  })

  return {
    // State
    posts,
    currentPost,
    loading,
    error,
    totalPosts,
    currentPage,

    // Actions
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    deletePost,
    setCurrentPost,
    clearError,

    // Getters
    getPostById,
    publishedPosts,
    draftPosts
  }
})
