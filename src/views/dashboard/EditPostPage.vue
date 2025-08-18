<template>
  
    <div class="edit-post-page">
      <!-- Header -->
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Edit Post</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <router-link to="/dashboard/posts" class="btn btn-outline-secondary me-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Posts
          </router-link>
        </div>
      </div>

      <!-- Content Area -->
      
      <!-- Content Area -->
      <div class="content-area">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading post...</p>
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
          <h5 class="text-danger">{{ error }}</h5>
          <button @click="loadPost" class="btn btn-primary">Try Again</button>
        </div>

        <!-- Edit Post Form -->
        <div v-else class="card border-0 shadow-sm" data-aos="fade-up">
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
                            <option v-for="category in categories" :key="category" :value="category">
                              {{ category.charAt(0).toUpperCase() + category.slice(1) }}
                            </option>
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
                          <div v-if="form.currentImageUrl" class="position-relative mb-2">
                            <img 
                              :src="form.currentImageUrl" 
                              alt="Featured Image" 
                              class="img-fluid rounded" 
                              style="max-height: 150px; width: 100%; object-fit: cover;"
                              @error="$event.target.src = '/placeholder.jpg'"
                            >
                            <button 
                              type="button"
                              class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                              @click="form.currentImageUrl = null; form.featuredImage = null"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
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

                        <!-- Post Stats -->
                        <div class="border-top pt-3">
                          <h6 class="fw-semibold mb-3">Post Statistics</h6>
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted">Views</span>
                            <span class="fw-bold">{{ postStats.views }}</span>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted">Likes</span>
                            <span class="fw-bold">{{ postStats.likes }}</span>
                          </div>
                          <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted">Comments</span>
                            <span class="fw-bold">{{ postStats.comments }}</span>
                          </div>
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
                    <button type="button" class="btn btn-outline-danger me-2" @click="deletePost">
                      Delete Post
                    </button>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="updating">
                      <span v-if="updating" class="spinner-border spinner-border-sm me-2"></span>
                      {{ updating ? 'Updating...' : 'Update Post' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { postsAPI } from '@/services/api'
import emitter from '@/utils/eventBus'

const router = useRouter()
const route = useRoute()
const updating = ref(false)
const loading = ref(true)
const error = ref(null)
const categories = ref([])

const postStats = reactive({
  views: 0,
  likes: 0,
  comments: 0
})

const form = reactive({
  title: '',
  content: '',
  status: 'draft',
  category: '',
  tags: '',
  excerpt: '',
  seoTitle: '',
  seoDescription: '',
  featuredImage: null,
  currentImageUrl: null
})

// Load post data
const loadPost = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await postsAPI.getById(route.params.id)
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to load post')
    }

    const post = response.data.data
    // Reset form to prevent any stale data
    Object.keys(form).forEach(key => {
      form[key] = null
    })
    
    // Update form with post data
    form.title = post.title || ''
    form.content = post.body || ''
    form.status = post.status || 'draft'
    form.category = post.category || ''
    form.tags = Array.isArray(post.tags) ? post.tags.join(', ') : ''
    form.excerpt = post.excerpt || ''
    form.seoTitle = post.seo_title || ''
    form.seoDescription = post.seo_description || ''
    form.currentImageUrl = post.featured_image
      ? post.featured_image.startsWith('http')
        ? post.featured_image
        : `${process.env.VUE_APP_API_URL}${post.featured_image}`
      : null

    // Update stats
    postStats.views = post.views_count || 0
    postStats.likes = post.likes_count || 0
    postStats.comments = post.comments_count || 0
  } catch (err) {
    console.error('Error loading post:', err)
    error.value = err.message || 'Failed to load post'
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    const response = await postsAPI.categories()
    if (response.data.success && response.data.data) {
      categories.value = response.data.data
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

onMounted(async () => {
  await Promise.all([
    loadPost(),
    loadCategories()
  ])
})

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file')
    event.target.value = '' // Clear the input
    return
  }

  // Check file size (2MB limit)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    alert('Image size must be less than 2MB')
    event.target.value = '' // Clear the input
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    form.currentImageUrl = e.target.result // For preview
    form.featuredImage = file // Store the file for upload
  }
  reader.onerror = () => {
    alert('Error reading file')
    form.currentImageUrl = null
    form.featuredImage = null
    event.target.value = '' // Clear the input
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async () => {
  if (updating.value) return
  updating.value = true
  
  try {
    // Create new FormData instance
    const formData = new FormData()

    // Always append all fields - Laravel will handle partial updates
    formData.append('title', form.title?.trim() || '')
    formData.append('body', form.content?.trim() || '')
    formData.append('status', form.status || 'draft')
    formData.append('category', form.category?.trim() || '')
    formData.append('excerpt', form.excerpt?.trim() || '')
    formData.append('seo_title', form.seoTitle?.trim() || '')
    formData.append('seo_description', form.seoDescription?.trim() || '')

    // Handle tags
    if (form.tags?.trim()) {
      const tags = form.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      formData.append('tags', JSON.stringify(tags))
    }
    
    // Handle featured image if a new one is selected
    if (form.featuredImage instanceof File) {
      const maxSize = 2 * 1024 * 1024 // 2MB (2048KB)
      if (form.featuredImage.size > maxSize) {
        throw new Error('Featured image must be less than 2MB')
      }
      if (!form.featuredImage.type.startsWith('image/')) {
        throw new Error('Featured image must be an image file')
      }
      formData.append('featured_image', form.featuredImage)
    }

    try {
      const response = await postsAPI.update(route.params.id, formData)
      
      // Handle Laravel validation errors
      if (response.status === 422) {
        const errors = response.data.errors
        if (errors) {
          const messages = Object.values(errors).flat().join('\n')
          throw new Error(messages)
        }
      }

      // Handle other error responses
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to update post')
      }

      // Update the form with the returned data
      const updatedPost = response.data.data
      
      // Update form state with returned data
      form.title = updatedPost.title || ''
      form.content = updatedPost.body || ''
      form.status = updatedPost.status || 'draft'
      form.category = updatedPost.category || ''
      form.excerpt = updatedPost.excerpt || ''
      form.seoTitle = updatedPost.seo_title || ''
      form.seoDescription = updatedPost.seo_description || ''
      form.tags = Array.isArray(updatedPost.tags) ? updatedPost.tags.join(', ') : ''
      
      // Handle featured image URL
      if (updatedPost.featured_image) {
        form.currentImageUrl = updatedPost.featured_image.startsWith('http') 
          ? updatedPost.featured_image 
          : `${process.env.VUE_APP_API_URL}/storage/${updatedPost.featured_image}`
      } else {
        form.currentImageUrl = null
      }
      form.featuredImage = null

      // Update stats
      postStats.views = updatedPost.views_count || 0
      postStats.likes = updatedPost.likes_count || 0
      postStats.comments = updatedPost.comments_count || 0

      // Emit update event for the posts list
      emitter.emit('post-updated', { 
        postId: route.params.id, 
        post: updatedPost 
      })

      // Show success message
      alert('Post updated successfully!')
      
      // Navigate back to posts list
      router.push('/dashboard/posts')
    } catch (error) {
      if (error.response?.data?.errors) {
        const messages = Object.values(error.response.data.errors).flat().join('\n')
        throw new Error(messages)
      }
      throw error
    }
  } catch (error) {
    console.error('Update error:', error)
    alert(error.message || 'Failed to update post. Please try again.')
  } finally {
    updating.value = false
  }
}

const saveDraft = async () => {
  form.status = 'draft'
  await handleSubmit()
}

const previewPost = () => {
  const previewWindow = window.open('', '_blank')
  previewWindow.document.write(`
    <html>
      <head>
        <title>${form.title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light p-5">
        <div class="container">
          <div class="card shadow">
            <div class="card-body">
              ${form.content}
            </div>
          </div>
        </div>
      </body>
    </html>
  `)
}

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return
  }

  try {
    const response = await postsAPI.delete(route.params.id)
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete post')
    }
    
    alert('Post deleted successfully!')
    router.push('/dashboard/posts')
  } catch (error) {
    console.error('Delete error:', error)
    alert(error.response?.data?.message || 'Failed to delete post. Please try again.')
  }
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    router.push('/')
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

.btn-outline-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: static;
    margin-bottom: 1rem;
  }
}
</style> 