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

    <!-- Blog Post Content -->
    <div class="container pb-5" v-if="post">
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
                {{ post.date }}
              </div>
              <div class="text-muted small d-flex align-items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {{ post.views }} views
              </div>
            </div>
            
            <h1 class="display-5 fw-bold mb-4">{{ post.title }}</h1>
            
            <!-- Author Info -->
            <div class="d-flex align-items-center mb-4">
              <img :src="post.author.avatar" class="rounded-circle me-3" width="48" height="48" :alt="post.author.name">
              <div>
                <h6 class="mb-0">{{ post.author.name }}</h6>
                <p class="text-muted small mb-0">{{ post.author.bio }}</p>
              </div>
            </div>
            
            <!-- Featured Image -->
            <img :src="post.image" class="rounded-4 w-100 mb-4" :alt="post.title" style="max-height: 400px; object-fit: cover;">
          </div>

          <!-- Post Content -->
          <div class="bg-white rounded-4 shadow-sm p-4 mb-4">
            <div class="rich-text mb-4" v-html="post.content"></div>
            
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
                  :class="post.isLiked ? 'text-danger' : 'text-muted'"
                  @click="toggleLike"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span class="ms-2">{{ post.likes }} likes</span>
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

    <!-- Loading State -->
    <div v-else class="container py-5 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import CommentModal from '@/components/blog/CommentModal.vue'

export default {
  name: 'BlogPostPage',
  components: {
    CommentModal
  },
  data() {
    return {
      post: null
    }
  },
  created() {
    // In a real app, fetch post data from API using this.$route.params.id
    this.post = {
      id: this.$route.params.id,
      title: 'Getting Started with Vue.js 3',
      content: `
        <p>Vue.js 3 introduces several exciting features that make building web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how you can leverage them in your projects.</p>
        
        <h2>What's New in Vue.js 3</h2>
        <p>The latest version of Vue brings significant improvements to performance, developer experience, and reactivity. Here are the standout features:</p>
        
        <h3>1. Composition API</h3>
        <p>The Composition API provides a new way to organize component logic, making it more reusable and maintainable.</p>
        
        <h3>2. Improved TypeScript Support</h3>
        <p>Vue 3 is written in TypeScript and provides better type inference and tooling support.</p>
        
        <h3>3. Multiple Root Elements</h3>
        <p>Components can now have multiple root nodes, giving you more flexibility in component structure.</p>
        
        <h2>Getting Started</h2>
        <p>To start using Vue.js 3, create a new project using Vite:</p>
        
        <pre><code>npm create vue@latest my-app
cd my-app
npm install
npm run dev</code></pre>
        
        <p>The development server will start, and you can begin exploring Vue 3 features immediately.</p>
      `,
      category: 'Development',
      image: '/nextjs-development.png',
      date: 'Aug 15, 2025',
      views: '2.5K',
      isLiked: false,
      likes: 189,
      tags: ['Vue.js', 'JavaScript', 'Web Development'],
      author: {
        name: 'John Doe',
        avatar: '/placeholder-user.jpg',
        bio: 'Senior Frontend Developer'
      },
      comments: [
        {
          id: 1,
          content: 'Great article! The Composition API is a game-changer.',
          date: 'Aug 15, 2025',
          author: {
            name: 'Alice Johnson',
            avatar: '/placeholder-user.jpg'
          }
        }
      ]
    }
  },
  methods: {
    toggleLike() {
      const { user } = useAuth()
      if (!user.value) {
        this.$router.push('/auth/login')
        return
      }

      this.post.isLiked = !this.post.isLiked
      this.post.likes += this.post.isLiked ? 1 : -1

      // In a real app, make API call to update like status
    },
    addComment(comment) {
      if (!this.post.comments) {
        this.post.comments = []
      }
      this.post.comments.unshift(comment)

      // In a real app, make API call to save comment
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