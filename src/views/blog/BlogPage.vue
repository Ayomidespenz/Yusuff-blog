<template>
  <div class="blog-page bg-light min-vh-100">
    <!-- Blog Header -->
    <header class="bg-white shadow-sm py-4 mb-4">
      <div class="container">
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-light px-0 mb-3">
          <div class="container-fluid px-0">
            <button @click="goToHome" class="navbar-brand d-flex align-items-center btn btn-link border-0 p-0">
              <div class="bg-primary rounded-3 p-2 me-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span class="h5 mb-0">Back to Home</span>
            </button>
          </div>
        </nav>

        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="mb-2">Blog Posts</h1>
            <p class="text-muted mb-0">Discover stories, insights, and knowledge</p>
          </div>
          <div class="col-lg-6">
            <div class="d-flex gap-3 justify-content-lg-end mt-3 mt-lg-0">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search posts..." 
                  v-model="searchQuery"
                  @input="filterPosts"
                >
                <button class="btn btn-outline-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>
              <select class="form-select w-auto" v-model="selectedCategory" @change="filterPosts">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Blog Posts -->
    <div class="container pb-5">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading posts...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-5">
        <div class="text-danger mb-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h5 class="text-danger">Failed to load posts</h5>
        <p class="text-muted">{{ error }}</p>
        <button @click="loadPosts" class="btn btn-primary">Try Again</button>
      </div>

      <!-- Posts Grid -->
      <div v-else class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="post in filteredPosts" :key="post.id">
          <div class="card h-100 border-0 shadow-sm">
            <router-link :to="'/blog/' + post.id" class="text-decoration-none">
              <div class="position-relative">
                <img 
                  :src="post.featured_image"
                  class="card-img-top" 
                  :alt="post.title" 
                  style="height: 200px; object-fit: cover;"
                  @error="$event.target.src = '/placeholder.jpg'"
                >
                <span class="position-absolute top-0 end-0 bg-primary text-white px-3 py-2 m-3 rounded-pill">
                  {{ post.category }}
                </span>
              </div>
            </router-link>
            <div class="card-body">
              <router-link :to="'/blog/' + post.id" class="text-decoration-none">
                <h5 class="card-title text-dark fw-bold mb-3">{{ post.title }}</h5>
              </router-link>
              <p class="card-text text-muted mb-3">{{ post.excerpt }}</p>
              
              <!-- Author Info -->
              <div class="d-flex align-items-center mb-3">
                <div v-if="post.author.avatar" class="rounded-circle me-2 overflow-hidden" style="width: 32px; height: 32px;">
                  <img :src="post.author.avatar" class="w-100 h-100" style="object-fit: cover" :alt="post.author.name">
                </div>
                <div v-else class="rounded-circle me-2 bg-secondary d-flex align-items-center justify-content-center text-white" style="width: 32px; height: 32px;">
                  {{ post.author.name ? post.author.name.charAt(0).toUpperCase() : '?' }}
                </div>
                <div class="small">
                  <div class="fw-bold text-dark">{{ post.author.name || 'Unknown Author' }}</div>
                  <div class="text-muted">{{ post.date }}</div>
                </div>
              </div>
              
              <!-- Post Stats -->
              <div class="d-flex align-items-center text-muted small">
                <div class="me-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {{ post.views }}
                </div>
                <div class="me-3">
                  <button 
                    class="btn btn-link btn-sm p-0 text-muted text-decoration-none"
                    @click="openComments(post)"
                    data-bs-toggle="modal" 
                    :data-bs-target="'#commentsModal-' + post.id"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {{ post.commentsCount }}
                  </button>
                </div>
                <div>
                  <button 
                    class="btn btn-link btn-sm p-0 text-decoration-none"
                    :class="post.isLiked ? 'text-danger' : 'text-muted'"
                    @click="toggleLike(post)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" class="me-1">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    {{ post.likes }}
                  </button>
                </div>
              </div>

              <!-- Comments Modal -->
              <CommentModal 
                :modal-id="'commentsModal-' + post.id"
                :post-id="post.id"
                :comments="post.comments || []"
                @add-comment="addComment(post.id, $event)"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="col-12 text-center py-5">
          <div class="text-muted">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mb-3">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <h5>No posts found</h5>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { postsAPI, likesAPI, commentsAPI } from '@/services/api'
import CommentModal from '@/components/blog/CommentModal.vue'

export default {
  name: 'BlogPage',
  components: {
    CommentModal
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      categories: [],
      posts: [],
      isLoading: false,
      error: null
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            (post.body && post.body.toLowerCase().includes(this.searchQuery.toLowerCase()))
        const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory
        return matchesSearch && matchesCategory
      })
    }
  },
  async mounted() {
    await Promise.all([
      this.loadPosts().catch(error => {
        console.error('Error loading posts:', error)
      }),
      this.loadCategories().catch(error => {
        console.error('Error loading categories:', error)
      })
    ])
  },
  methods: {
    getImageUrl(imageUrl) {
      if (!imageUrl) return '/placeholder.jpg'
      if (imageUrl.startsWith('http')) return imageUrl
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      return `${apiUrl}/storage/${imageUrl}`
    },
    goToHome() {
      this.$router.push('/')
    },
    
    async loadPosts() {
      if (this.isLoading) return; // Prevent multiple simultaneous calls
      
      this.isLoading = true
      this.error = null
      try {
        // Get all published posts
        const response = await postsAPI.getAll({
          per_page: 50,
          status: 'published',
          sort: 'latest' // Get latest posts first
        })
        
        // Check if we have a valid response
        if (!response?.data?.success) {
          throw new Error('Failed to load posts')
        }

        const postsData = response.data.data?.data
        if (!Array.isArray(postsData)) {
          throw new Error('Invalid posts data received')
        }

        this.posts = postsData.map(post => {
          const excerpt = post.body 
            ? post.body.length > 150 
              ? post.body.substring(0, 150) + '...'
              : post.body
            : ''

          return {
            id: post.id,
            title: post.title,
            body: post.body,
            excerpt: excerpt,
            featured_image: post.featured_image,
            category: post.category || 'Uncategorized',
            author: {
              name: post.user?.name,
              avatar: post.user?.avatar
                ? post.user.avatar.startsWith('http')
                  ? post.user.avatar
                  : `${process.env.VUE_APP_API_URL}${post.user.avatar}`
                : null
            },
            date: post.created_at 
              ? new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : 'No date',
            views: post.views_count || 0,
            likes: post.likes_count || 0,
            comments: Array.isArray(post.comments) ? post.comments : [],
            commentsCount: post.comments_count || 0,
            isLiked: post.liked || false
          }
        })

        if (this.posts.length === 0) {
          this.error = 'No posts found'
        }
      } catch (error) {
        console.error('Error loading posts:', error)
        if (error.response?.status === 401) {
          this.error = 'Please log in to view posts'
          this.$router.push('/auth/login')
        } else if (error.response?.status === 404) {
          this.error = 'No posts found'
        } else if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'Failed to load posts. Please check your internet connection and try again.'
        }
      } finally {
        this.isLoading = false
      }
    },

    async loadCategories() {
      try {
        const response = await postsAPI.categories()
        if (response.data.success && response.data.data) {
          this.categories = response.data.data
        }
      } catch (error) {
        console.error('Error loading categories:', error)
        // Categories are not critical, so we don't show an error
      }
    },

    filterPosts() {
      // The filtering is handled by the computed property
    },
    async toggleLike(post) {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      try {
        if (post.isLiked) {
          await likesAPI.unlike(post.id)
          post.likes--
        } else {
          await likesAPI.like(post.id)
          post.likes++
        }
        post.isLiked = !post.isLiked
      } catch (error) {
        console.error('Error toggling like:', error)
        // Revert the UI change if API call failed
        post.isLiked = !post.isLiked
        if (post.isLiked) {
          post.likes++
        } else {
          post.likes--
        }
      }
    },
    async addComment(postId, commentContent) {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      try {
        const response = await commentsAPI.create(postId, { content: commentContent })
        
        if (response.data && response.data.data) {
          const newComment = response.data.data
          const post = this.posts.find(p => p.id === postId)
          
          if (post) {
            if (!Array.isArray(post.comments)) {
              post.comments = []
            }
            
            post.comments.unshift({
              id: newComment.id,
              content: newComment.content,
              date: 'Just now',
              author: {
                name: user.value.name,
                avatar: user.value.avatar
                  ? user.value.avatar.startsWith('http')
                    ? user.value.avatar
                    : `${process.env.VUE_APP_API_URL}${user.value.avatar}`
                  : null
              }
            })
            
            // Update the comments count
            post.commentsCount = (post.commentsCount || 0) + 1
          }
        } else {
          throw new Error('Invalid response from server')
        }
      } catch (error) {
        console.error('Error adding comment:', error)
        const errorMessage = error.response?.data?.message || 'Failed to add comment. Please try again.'
        alert(errorMessage)
      }
    },
    async openComments(post) {
      if (!post.comments) {
        post.comments = []
      }
      
      try {
        const response = await commentsAPI.getByPost(post.id)
        if (response?.data?.success) {
          post.comments = (response.data.data || []).map(comment => ({
            id: comment.id,
            content: comment.content,
            date: new Date(comment.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            author: {
              name: comment.user?.name,
              avatar: comment.user?.avatar
                ? comment.user.avatar.startsWith('http')
                  ? comment.user.avatar
                  : `${process.env.VUE_APP_API_URL}${comment.user.avatar}`
                : null
            }
          }))
        }
      } catch (error) {
        console.error('Error loading comments:', error)
        post.comments = []
      }
    }
  }
}
</script>

<style scoped>
.btn-link {
  text-decoration: none;
}

.btn-link:hover {
  opacity: 0.85;
}

.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style>