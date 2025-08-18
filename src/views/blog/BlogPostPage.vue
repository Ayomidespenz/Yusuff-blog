<template>
  <div class="min-vh-100 bg-light">
    <!-- Navigation -->
    <header class="bg-white shadow-sm py-3 mb-4">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light px-0">
          <div class="container-fluid px-0">
            <router-link to="/blog" class="navbar-brand d-flex align-items-center">
              <div class="bg-primary rounded-3 p-2 me-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </div>
              <span class="h5 mb-0">Back to Blog</span>
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <!-- Error State -->
    <div v-if="error" class="container py-5 text-center">
      <div class="text-danger mb-3">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h5 class="text-danger">{{ error }}</h5>
      <button @click="loadPost" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="container py-5 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Blog Post Content -->
    <div class="container pb-5" v-else-if="post">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Post Header -->
          <div class="bg-white rounded-4 shadow-sm p-4 mb-4">
            <div class="d-flex flex-wrap gap-3 mb-3">
              <span class="badge bg-primary">{{ post.category }}</span>
              <div class="text-muted small d-flex align-items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ formatDate(post.created_at) }}
              </div>
              <div class="text-muted small d-flex align-items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {{ post.views_count || 0 }} views
              </div>
            </div>
            
            <h1 class="display-5 fw-bold mb-4">{{ post.title }}</h1>
            
            <!-- Author Info -->
            <div class="d-flex align-items-center mb-4" v-if="post.author">
              <img 
                :src="getImageUrl(post.author.avatar)" 
                class="rounded-circle me-3" 
                width="48" 
                height="48" 
                :alt="post.author.name"
                @error="$event.target.src = '/placeholder-user.jpg'"
              >
              <div>
                <h6 class="mb-0">{{ post.author.name }}</h6>
                <p class="text-muted small mb-0">{{ post.author.bio || '' }}</p>
              </div>
            </div>
            <div class="d-flex align-items-center mb-4" v-else>
              <img 
                src="/placeholder-user.jpg" 
                class="rounded-circle me-3" 
                width="48" 
                height="48" 
                alt="Anonymous"
              >
              <div>
                <h6 class="mb-0">Anonymous</h6>
              </div>
            </div>
            
            <!-- Featured Image -->
                        <!-- Featured Image -->
            <img 
              :src="getImageUrl(post.featured_image)"  
              class="rounded-4 w-100 mb-4" 
              :alt="post.title" 
              style="max-height: 400px; object-fit: cover;"
              @error="$event.target.src = '/placeholder.jpg'"
            >
          </div>

          <!-- Post Content -->
          <div class="bg-white rounded-4 shadow-sm p-4 mb-4">
            <div class="rich-text mb-4" v-html="post.body"></div>
            
            <!-- Tags -->
            <div class="d-flex flex-wrap gap-2 mb-4">
              <span v-for="tag in post.tags" :key="tag" class="badge bg-light text-dark">
                #{{ tag }}
              </span>
            </div>

            <!-- Engagement -->
            <div class="d-flex align-items-center justify-content-between border-top pt-4">
              <div class="d-flex align-items-center gap-4">
                <button 
                  class="btn btn-link p-0 text-decoration-none"
                  :class="post.liked ? 'text-danger' : 'text-muted'"
                  @click="toggleLike"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24"                   :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span class="ms-2">{{ post.likes_count }} likes</span>
                </button>
                
                <button 
                  class="btn btn-link p-0 text-decoration-none text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#commentsModal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span class="ms-2">{{ post.comments?.length || 0 }} comments</span>
                </button>
              </div>

              <button class="btn btn-outline-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Share Post
              </button>
            </div>
          </div>

          <!-- Comments Section -->
          <CommentModal 
            modal-id="commentsModal"
            :post-id="post.id"
            :comments="post.comments || []"
            @add-comment="addComment"
          />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="container py-5 text-center">
      <div class="text-danger mb-3">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h5 class="text-danger">{{ error }}</h5>
      <button @click="loadPost" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="container py-5 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import CommentModal from '@/components/blog/CommentModal.vue'
import { postsAPI, likesAPI, commentsAPI } from '@/services/api'

export default {
  name: 'BlogPostPage',
  components: {
    CommentModal
  },
  data() {
    return {
      post: null,
      loading: false,
      error: null
    }
  },
  async created() {
    await this.loadPost()
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    getImageUrl(imageUrl) {
      if (!imageUrl) return '/placeholder.jpg'
      if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) return imageUrl
      if (imageUrl.startsWith('/')) {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
        return `${apiUrl}${imageUrl}`
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      return `${apiUrl}/storage/${imageUrl}`
    },
    async loadPost() {
      this.loading = true
      this.error = null
      this.post = null  // Reset post data
      
      try {
        console.log('Post ID from route:', this.$route.params.id)
        const response = await postsAPI.getById(this.$route.params.id)
        console.log('API Response:', response.data)

        if (!response.data?.success || !response.data?.data) {
          throw new Error('Invalid post data received')
        }

        const postData = response.data.data
        this.post = {
          ...postData,
          author: postData.user || postData.author || null, // Try both user and author fields
          featured_image: postData.featured_image || postData.image || null,
          body: postData.body || postData.content || '',
          views_count: postData.views_count || 0,
          likes_count: postData.likes_count || 0,
          comments: postData.comments || []
        }
        
        // Load comments if not included in post data
        if (!this.post.comments) {
          await this.loadComments()
        }
      } catch (error) {
        console.error('Error loading post:', error)
        this.error = error.response?.data?.message || error.message || 'Failed to load post. Please try again.'
      } finally {
        this.loading = false
      }
    },
    async loadComments() {
      try {
        const response = await commentsAPI.getByPost(this.post.id)
        if (response.data?.success) {
          this.post.comments = response.data.data.map(comment => ({
            id: comment.id,
            content: comment.content,
            date: this.formatDate(comment.created_at),
            author: {
              name: comment.user?.name || 'Anonymous',
              avatar: comment.user?.avatar
            }
          }))
        }
      } catch (error) {
        console.error('Error loading comments:', error)
        this.post.comments = []
      }
    },
    async toggleLike() {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      try {
        if (this.post.liked) {
          await likesAPI.unlike(this.post.id)
          this.post.likes_count--
        } else {
          await likesAPI.like(this.post.id)
          this.post.likes_count++
        }
        this.post.liked = !this.post.liked
      } catch (error) {
        console.error('Error toggling like:', error)
      }
    },
    async addComment(content) {
      try {
        const response = await commentsAPI.create(this.post.id, { content })
        if (response.data?.success) {
          const comment = response.data.data
          if (!this.post.comments) {
            this.post.comments = []
          }
          this.post.comments.unshift({
            id: comment.id,
            content: comment.content,
            date: this.formatDate(comment.created_at),
            author: {
              name: comment.user.name,
              avatar: comment.user.avatar
            }
          })
        }
      } catch (error) {
        console.error('Error adding comment:', error)
        alert(error.response?.data?.message || 'Failed to add comment. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.rich-text h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.rich-text h3 {
  font-size: 1.5rem;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.rich-text p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.rich-text pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.rich-text code {
  font-family: monospace;
  color: #666;
}

.rich-text ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.rich-text ul li {
  margin-bottom: 0.5rem;
}
</style>