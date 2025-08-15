<template>
  <DashboardLayout>
    <template #default>
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

      <!-- Edit Post Form -->
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
                          <div v-if="form.featuredImage" class="mb-2">
                            <img 
                              :src="form.featuredImage" 
                              alt="Featured Image" 
                              class="img-fluid rounded"
                              style="max-height: 100px;"
                            >
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
    </template>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = useRouter()
const updating = ref(false)
const postStats = reactive({
  views: 2300,
  likes: 89,
  comments: 23
})

const form = reactive({
  title: 'Getting Started with Vue.js 3',
  content: 
`# Getting Started with Vue.js 3

Vue.js 3 is the latest major version of the progressive JavaScript framework. It brings significant improvements in performance, TypeScript support, and developer experience.

## Key Features

- **Composition API**: A new way to organize component logic
- **Better TypeScript Support**: Built with TypeScript from the ground up
- **Improved Performance**: Faster rendering and smaller bundle sizes
- **Tree Shaking**: Better tree shaking for smaller production builds

## Installation

\`\`\`javascript
// Example Vue 3 Component
import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello Vue 3!')
    
    const reverseMessage = () => {
      message.value = message.value.split('').reverse().join('')
    }
    
    return {
      message,
      reverseMessage
    }
  }
}
\`\`\`

## Next Steps

This is just the beginning of your Vue.js 3 journey. Explore the official documentation to learn more about:

- Components and Props
- Reactivity and State Management
- Routing with Vue Router
- State Management with Pinia
- Testing with Vue Test Utils

Happy coding! 🚀`,
  status: 'published',
  category: 'technology',
  tags: 'vue, javascript, frontend, framework',
  excerpt: 'A comprehensive guide to modern Vue development with the latest features and best practices.',
  seoTitle: 'Vue.js 3 Tutorial: Complete Guide for Beginners',
  seoDescription: 'Learn Vue.js 3 from scratch with this comprehensive tutorial. Master the Composition API, TypeScript support, and modern development practices.',
  featuredImage: '/nextjs-development.png'
})

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real app, you would upload the image to your server
    const reader = new FileReader()
    reader.onload = (e) => {
      form.featuredImage = e.target.result
    }
    reader.readAsDataURL(file)
    console.log('Image selected:', file.name)
  }
}

const handleSubmit = async () => {
  updating.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    alert('Post updated successfully!')
    
    // Redirect to posts list
    router.push('/dashboard/posts')
    
  } catch (error) {
    console.error('Update error:', error)
    alert('Failed to update post. Please try again.')
  } finally {
    updating.value = false
  }
}

const saveDraft = () => {
  form.status = 'draft'
  // Simulate saving draft
  alert('Draft saved successfully!')
}

const previewPost = () => {
  // In a real app, this would open a preview modal or new tab
  alert('Preview functionality coming soon!')
}

const deletePost = () => {
  if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    if (confirm('This is your final warning. Are you absolutely sure?')) {
      alert('Post deleted successfully!')
      router.push('/dashboard/posts')
    }
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