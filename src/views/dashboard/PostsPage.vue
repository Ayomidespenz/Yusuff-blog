<template>
  <div class="container-fluid">
    <!-- Main Content -->
    <div class="py-4">
          <!-- Header -->
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Posts Management</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <router-link to="/dashboard/create" class="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Post
              </router-link>
            </div>
          </div>

          <!-- Filters and Search -->
          <div class="card border-0 shadow-sm mb-4" data-aos="fade-up">
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <label for="search" class="form-label fw-medium">Search Posts</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="search" 
                    v-model="filters.search"
                    placeholder="Search by title, content, or tags..."
                  >
                </div>
                <div class="col-md-3">
                  <label for="status" class="form-label fw-medium">Status</label>
                  <select class="form-select" id="status" v-model="filters.status">
                    <option value="">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="category" class="form-label fw-medium">Category</label>
                  <select class="form-select" id="category" v-model="filters.category">
                    <option value="">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label class="form-label fw-medium">&nbsp;</label>
                  <button class="btn btn-outline-secondary w-100" @click="clearFilters">
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts Table -->
          <div class="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="200">
            <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-bold">All Posts ({{ filteredPosts.length }})</h5>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" @click="bulkPublish" :disabled="!selectedPosts.length">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Publish Selected
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="bulkDelete" :disabled="!selectedPosts.length">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  Delete Selected
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">
                        <div class="form-check">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="selectAll"
                            @change="toggleSelectAll"
                            :checked="selectedPosts.length === filteredPosts.length && filteredPosts.length > 0"
                          >
                        </div>
                      </th>
                      <th class="border-0">Post</th>
                      <th class="border-0">Status</th>
                      <th class="border-0">Category</th>
                      <th class="border-0">Views</th>
                      <th class="border-0">Likes</th>
                      <th class="border-0">Date</th>
                      <th class="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in paginatedPosts" :key="post.id" :class="{ 'table-active': selectedPosts.includes(post.id) }">
                      <td>
                        <div class="form-check">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            :value="post.id"
                            v-model="selectedPosts"
                          >
                        </div>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="bg-primary bg-opacity-10 rounded-2 p-2 me-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            </svg>
                          </div>
                          <div>
                            <h6 class="mb-0 fw-semibold">{{ post.title }}</h6>
                            <small class="text-muted">{{ post.excerpt }}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span :class="getStatusBadgeClass(post.status)">{{ post.status }}</span>
                      </td>
                      <td>
                        <span class="badge bg-secondary">{{ post.category }}</span>
                      </td>
                      <td>{{ formatNumber(post.views) }}</td>
                      <td>{{ formatNumber(post.likes) }}</td>
                      <td>{{ formatDate(post.date) }}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <router-link :to="`/dashboard/posts/${post.id}/edit`" class="btn btn-outline-primary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </router-link>
                          <button class="btn btn-outline-info" @click="viewPost(post.id)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          <button class="btn btn-outline-danger" @click="deletePost(post.id)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <nav v-if="totalPages > 1" class="mt-4" data-aos="fade-up" data-aos-delay="300">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </a>
              </li>
              <li 
                v-for="page in visiblePages" 
                :key="page" 
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsPage',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Getting Started with Vue.js 3',
          excerpt: 'A comprehensive guide to modern Vue development',
          status: 'published',
          category: 'technology',
          views: 2300,
          likes: 89,
          date: '2024-01-15'
        },
        {
          id: 2,
          title: 'Bootstrap 5 Best Practices',
          excerpt: 'Tips and tricks for better Bootstrap development',
          status: 'draft',
          category: 'technology',
          views: 0,
          likes: 0,
          date: '2024-01-10'
        },
        {
          id: 3,
          title: 'Modern CSS Techniques',
          excerpt: 'Exploring advanced CSS features and animations',
          status: 'published',
          category: 'technology',
          views: 1800,
          likes: 67,
          date: '2024-01-08'
        },
        {
          id: 4,
          title: 'Healthy Meal Prep Guide',
          excerpt: 'Simple and nutritious meal preparation tips',
          status: 'published',
          category: 'lifestyle',
          views: 3200,
          likes: 124,
          date: '2024-01-05'
        },
        {
          id: 5,
          title: 'Travel Photography Tips',
          excerpt: 'Capture amazing moments during your travels',
          status: 'scheduled',
          category: 'travel',
          views: 0,
          likes: 0,
          date: '2024-01-20'
        }
      ],
      filters: {
        search: '',
        status: '',
        category: ''
      },
      selectedPosts: [],
      currentPage: 1,
      postsPerPage: 10
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const matchesSearch = !this.filters.search || 
          post.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(this.filters.search.toLowerCase())
        
        const matchesStatus = !this.filters.status || post.status === this.filters.status
        const matchesCategory = !this.filters.category || post.category === this.filters.category
        
        return matchesSearch && matchesStatus && matchesCategory
      })
    },
    
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },
    
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.filteredPosts.slice(start, end)
    },
    
    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      const classes = {
        published: 'badge bg-success',
        draft: 'badge bg-warning',
        scheduled: 'badge bg-info'
      }
      return classes[status] || 'badge bg-secondary'
    },
    
    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toString()
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    },
    
    clearFilters() {
      this.filters = {
        search: '',
        status: '',
        category: ''
      }
      this.currentPage = 1
    },
    
    toggleSelectAll() {
      if (this.selectedPosts.length === this.filteredPosts.length) {
        this.selectedPosts = []
      } else {
        this.selectedPosts = this.filteredPosts.map(post => post.id)
      }
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    
    viewPost(id) {
      // In a real app, this would open the post in a new tab or modal
      alert(`Viewing post ${id}`)
    },
    
    deletePost(id) {
      if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        this.posts = this.posts.filter(post => post.id !== id)
        this.selectedPosts = this.selectedPosts.filter(postId => postId !== id)
        alert('Post deleted successfully!')
      }
    },
    
    bulkPublish() {
      if (confirm(`Are you sure you want to publish ${this.selectedPosts.length} selected posts?`)) {
        this.posts.forEach(post => {
          if (this.selectedPosts.includes(post.id)) {
            post.status = 'published'
          }
        })
        this.selectedPosts = []
        alert('Selected posts published successfully!')
      }
    },
    
    bulkDelete() {
      if (confirm(`Are you sure you want to delete ${this.selectedPosts.length} selected posts? This action cannot be undone.`)) {
        this.posts = this.posts.filter(post => !this.selectedPosts.includes(post.id))
        this.selectedPosts = []
        alert('Selected posts deleted successfully!')
      }
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

.table th {
  border-top: none;
  font-weight: 600;
  color: #6c757d;
}

.badge {
  font-size: 0.75rem;
  padding: 0.5em 0.75em;
}

.btn-group-sm .btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

.pagination .page-link {
  border-radius: 8px;
  margin: 0 2px;
  border: 2px solid #e9ecef;
  color: #667eea;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background-color: #667eea;
  border-color: #667eea;
  color: white;
  transform: translateY(-2px);
}

.pagination .page-item.active .page-link {
  background-color: #667eea;
  border-color: #667eea;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: static;
    margin-bottom: 1rem;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
}
</style> 