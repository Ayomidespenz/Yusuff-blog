<template>
  <div class="container-fluid">
    <div class="py-4">
      <!-- Main Content -->
          <!-- Header -->
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Create New Post</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <router-link to="/dashboard" class="btn btn-outline-secondary me-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back to Dashboard
              </router-link>
            </div>
          </div>

          <!-- Create Post Form -->
          <div class="card border-0 shadow-sm" data-aos="fade-up">
            <div class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-md-8">
                    <!-- Title -->
                    <div class="mb-4">
                      <label for="title" class="form-label fw-semibold">Post Title *</label>
                      <input 
                        type="text" 
                        class="form-control form-control-lg" 
                        id="title" 
                        v-model="form.title"
                        placeholder="Enter your post title"
                        required
                      >
                    </div>

                    <!-- Content -->
                    <div class="mb-4">
                      <label for="content" class="form-label fw-semibold">Content *</label>
                      <textarea 
                        class="form-control" 
                        id="content" 
                        v-model="form.content"
                        rows="15"
                        placeholder="Write your post content here..."
                        required
                      ></textarea>
                      <div class="form-text">You can use Markdown formatting</div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <!-- Publish Settings -->
                    <div class="card border-0 bg-light">
                      <div class="card-body">
                        <h6 class="fw-semibold mb-3">Publish Settings</h6>
                        
                        <!-- Status -->
                        <div class="mb-3">
                          <label for="status" class="form-label fw-medium">Status</label>
                          <select class="form-select" id="status" v-model="form.status">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="scheduled">Scheduled</option>
                          </select>
                        </div>

                        <!-- Category -->
                        <div class="mb-3">
                          <label for="category" class="form-label fw-medium">Category</label>
                          <select class="form-select" id="category" v-model="form.category">
                            <option value="">Select category</option>
                            <option value="technology">Technology</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="travel">Travel</option>
                            <option value="food">Food</option>
                            <option value="business">Business</option>
                          </select>
                        </div>

                        <!-- Tags -->
                        <div class="mb-3">
                          <label for="tags" class="form-label fw-medium">Tags</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="tags" 
                            v-model="form.tags"
                            placeholder="Enter tags separated by commas"
                          >
                          <div class="form-text">Separate tags with commas</div>
                        </div>

                        <!-- Featured Image -->
                        <div class="mb-3">
                          <label for="featuredImage" class="form-label fw-medium">Featured Image</label>
                          <input 
                            type="file" 
                            class="form-control" 
                            id="featuredImage" 
                            @change="handleImageUpload"
                            accept="image/*"
                          >
                        </div>

                        <!-- Excerpt -->
                        <div class="mb-3">
                          <label for="excerpt" class="form-label fw-medium">Excerpt</label>
                          <textarea 
                            class="form-control" 
                            id="excerpt" 
                            v-model="form.excerpt"
                            rows="3"
                            placeholder="Brief description of your post"
                          ></textarea>
                          <div class="form-text">This will appear in post previews</div>
                        </div>

                        <!-- SEO Settings -->
                        <div class="mb-3">
                          <label for="seoTitle" class="form-label fw-medium">SEO Title</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="seoTitle" 
                            v-model="form.seoTitle"
                            placeholder="SEO optimized title"
                          >
                        </div>

                        <div class="mb-3">
                          <label for="seoDescription" class="form-label fw-medium">SEO Description</label>
                          <textarea 
                            class="form-control" 
                            id="seoDescription" 
                            v-model="form.seoDescription"
                            rows="2"
                            placeholder="SEO meta description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <div>
                    <button type="button" class="btn btn-outline-secondary me-2" @click="saveDraft">
                      Save Draft
                    </button>
                    <button type="button" class="btn btn-outline-primary me-2" @click="previewPost">
                      Preview
                    </button>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                      {{ loading ? 'Publishing...' : 'Publish Post' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePostPage',
  data() {
    return {
      form: {
        title: '',
        content: '',
        status: 'draft',
        category: '',
        tags: '',
        excerpt: '',
        seoTitle: '',
        seoDescription: '',
        featuredImage: null
      },
      loading: false
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.featuredImage = file
        // In a real app, you would upload the image to your server
        console.log('Image selected:', file.name)
      }
    },
    
    async handleSubmit() {
      this.loading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Show success message
        alert('Post published successfully!')
        
        // Redirect to posts list
        this.$router.push('/dashboard/posts')
        
      } catch (error) {
        console.error('Publish error:', error)
        alert('Failed to publish post. Please try again.')
      } finally {
        this.loading = false
      }
    },
    
    saveDraft() {
      // Simulate saving draft
      alert('Draft saved successfully!')
    },
    
    previewPost() {
      // In a real app, this would open a preview modal or new tab
      alert('Preview functionality coming soon!')
    },
    
    handleLogout() {
      if (confirm('Are you sure you want to logout?')) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 72px;
}

.sidebar .nav-link {
  color: #6c757d;
  border-radius: 8px;
  margin: 2px 0;
  transition: all 0.3s ease;
}

.sidebar .nav-link:hover {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

.sidebar .nav-link.active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
  font-weight: 600;
}

.card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form-control, .form-select {
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:disabled {
  background: #6c757d;
  transform: none;
  box-shadow: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: static;
    margin-bottom: 1rem;
  }
}
</style> 