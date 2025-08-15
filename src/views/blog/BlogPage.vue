<template>
  <div class="blog-page bg-light min-vh-100">
    <!-- Blog Header -->
    <header class="bg-white shadow-sm py-4 mb-4">
      <div class="container">
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-light px-0 mb-3">
          <div class="container-fluid px-0">
            <router-link to="/" class="navbar-brand d-flex align-items-center">
              <div class="bg-primary rounded-3 p-2 me-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span class="h5 mb-0">Back to Home</span>
            </router-link>
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
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="post in filteredPosts" :key="post.id">
          <div class="card h-100 border-0 shadow-sm">
            <router-link :to="'/blog/' + post.id" class="text-decoration-none">
              <div class="position-relative">
                <img :src="post.image" class="card-img-top" :alt="post.title" style="height: 200px; object-fit: cover;">
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
                <img :src="post.author.avatar" class="rounded-circle me-2" width="32" height="32" :alt="post.author.name">
                <div class="small">
                  <div class="fw-bold text-dark">{{ post.author.name }}</div>
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
                    {{ post.comments?.length || 0 }}
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
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
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
      categories: ['Technology', 'Design', 'Development', 'Business', 'Lifestyle'],
      posts: [
        {
          id: 1,
          title: 'Getting Started with Vue.js 3',
          excerpt: 'Learn the fundamentals of Vue.js 3 and build modern web applications with the Composition API.',
          image: '/nextjs-development.png',
          category: 'Development',
          author: {
            name: 'John Doe',
            avatar: '/placeholder-user.jpg'
          },
          date: 'Aug 15, 2025',
          views: '2.5K',
          isLiked: false,
          likes: 189,
          comments: [
            {
              id: 1,
              content: 'Great article! Really helped me understand Vue 3 better.',
              date: 'Aug 15, 2025',
              author: {
                name: 'Alice Johnson',
                avatar: '/placeholder-user.jpg'
              }
            },
            {
              id: 2,
              content: 'Looking forward to more content like this!',
              date: 'Aug 15, 2025',
              author: {
                name: 'Bob Smith',
                avatar: '/placeholder-user.jpg'
              }
            }
          ]
        },
        {
          id: 2,
          title: 'Design Systems in 2025',
          excerpt: 'Explore the latest trends and best practices in creating scalable design systems.',
          image: '/react-components.png',
          category: 'Design',
          author: {
            name: 'Sarah Wilson',
            avatar: '/placeholder-user.jpg'
          },
          date: 'Aug 14, 2025',
          views: '1.8K',
          comments: 16,
          likes: 145
        },
        {
          id: 3,
          title: 'The Future of Web Development',
          excerpt: 'Discover upcoming technologies and trends that will shape the future of web development.',
          image: '/future-web-development.png',
          category: 'Technology',
          author: {
            name: 'Michael Chen',
            avatar: '/placeholder-user.jpg'
          },
          date: 'Aug 13, 2025',
          views: '3.2K',
          comments: 32,
          likes: 267
        },
        {
          id: 4,
          title: 'Building a Developer Portfolio',
          excerpt: 'Tips and strategies for creating an impressive developer portfolio that stands out.',
          image: '/developer-journey.png',
          category: 'Development',
          author: {
            name: 'Emily Rodriguez',
            avatar: '/placeholder-user.jpg'
          },
          date: 'Aug 12, 2025',
          views: '1.5K',
          comments: 18,
          likes: 134
        }
      ]
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory
        return matchesSearch && matchesCategory
      })
    }
  },
  created() {
    // Initialize posts with stored likes and comments
    this.posts.forEach(post => {
      // Load like state
      const isLiked = localStorage.getItem(`post_${post.id}_liked`) === 'true'
      post.isLiked = isLiked

      // Load likes count
      const storedLikes = localStorage.getItem(`post_${post.id}_likes`)
      if (storedLikes) {
        const likesCount = parseInt(storedLikes, 10)
        post.likes = likesCount >= 1000 ? (likesCount / 1000).toFixed(1) + 'K' : likesCount
      }

      // Load comments
      const storedComments = localStorage.getItem(`post_${post.id}_comments`)
      if (storedComments) {
        post.comments = JSON.parse(storedComments)
      } else {
        post.comments = []
      }
    })
  },
  methods: {
    filterPosts() {
      // The filtering is handled by the computed property
    },
    toggleLike(post) {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      // Toggle like state and update count
      if (typeof post.isLiked === 'undefined') {
        post.isLiked = false
      }
      post.isLiked = !post.isLiked

      // Handle likes count
      let likesCount = 0
      if (typeof post.likes === 'string') {
        // Convert "2.5K" to 2500
        likesCount = parseFloat(post.likes.replace('K', '')) * 1000
      } else {
        likesCount = post.likes
      }

      likesCount += post.isLiked ? 1 : -1

      // Format likes for display
      if (likesCount >= 1000) {
        post.likes = (likesCount / 1000).toFixed(1) + 'K'
      } else {
        post.likes = likesCount
      }

      // Store like state in localStorage
      localStorage.setItem(`post_${post.id}_liked`, post.isLiked.toString())
      localStorage.setItem(`post_${post.id}_likes`, String(likesCount))
    },
    addComment(postId, comment) {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      const post = this.posts.find(p => p.id === postId)
      if (post) {
        if (!Array.isArray(post.comments)) {
          post.comments = []
        }
        
        // Add the new comment
        const newComment = {
          id: Date.now(),
          content: comment,
          date: 'Just now',
          author: {
            name: user.value.name,
            avatar: user.value.avatar || '/placeholder-user.jpg'
          }
        }
        
        post.comments.unshift(newComment)
        
        // Store comments in localStorage
        localStorage.setItem(`post_${post.id}_comments`, JSON.stringify(post.comments))
      }
    },
    openComments(post) {
      if (!Array.isArray(post.comments)) {
        // Initialize comments array if it doesn't exist
        post.comments = JSON.parse(localStorage.getItem(`post_${post.id}_comments`) || '[]')
      }
    }
  }
}
</script>

<style scoped>
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