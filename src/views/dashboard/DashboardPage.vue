<template>
  <div class="dashboard-container">

    <!-- Page Content Wrapper -->
    <div class="container-fluid" style="margin-top: 72px;">
      <div class="row">
        <!-- Sidebar -->
        <!-- <nav class="col-md-3 col-lg-2 d-md-block bg-white sidebar shadow-sm" style="min-height: calc(100vh - 72px);">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link active" to="/dashboard">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard/posts">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard/create">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Create Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard/profile">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard/settings">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  Settings
                </router-link>
              </li>
            </ul>
          </div>
        </nav> -->

        <!-- Main Content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <!-- Welcome Section -->
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Welcome back, {{ authUser ? authUser.name : 'User' }}! 👋</h1>
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

          <!-- Stats Cards -->
          <div class="row g-4 mb-4" data-aos="fade-up">
            <div class="col-xl-3 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <div class="bg-primary bg-opacity-10 rounded-3 p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14,2 14,8 20,8"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="card-title text-muted mb-1">Total Posts</h6>
                      <h3 class="mb-0 fw-bold">{{ userData.stats.totalPosts }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <div class="bg-success bg-opacity-10 rounded-3 p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-success">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="card-title text-muted mb-1">Total Views</h6>
                      <h3 class="mb-0 fw-bold">{{ formatNumber(userData.stats.totalViews) }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <div class="bg-warning bg-opacity-10 rounded-3 p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-warning">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="card-title text-muted mb-1">Total Likes</h6>
                      <h3 class="mb-0 fw-bold">{{ formatNumber(userData.stats.totalLikes) }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <div class="bg-info bg-opacity-10 rounded-3 p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-info">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="card-title text-muted mb-1">Comments</h6>
                      <h3 class="mb-0 fw-bold">{{ formatNumber(userData.stats.totalComments) }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Posts -->
          <div class="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="200">
            <div class="card-header bg-white border-0">
              <h5 class="mb-0 fw-bold">Recent Posts</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Views</th>
                      <th>Likes</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in userData.recentPosts" :key="post.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <div :class="['bg-opacity-10', 'rounded-2', 'p-2', 'me-3', 
                            post.status === 'published' ? 'bg-success' : 'bg-warning']">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                              :class="post.status === 'published' ? 'text-success' : 'text-warning'">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            </svg>
                          </div>
                          <div>
                            <h6 class="mb-0 fw-semibold">{{ post.title }}</h6>
                            <small class="text-muted">{{ post.description }}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span :class="['badge', post.status === 'published' ? 'bg-success' : 'bg-warning']">
                          {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
                        </span>
                      </td>
                      <td>{{ formatNumber(post.views) }}</td>
                      <td>{{ post.likes }}</td>
                      <td>{{ post.date }}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <router-link :to="`/dashboard/posts/${post.id}/edit`" class="btn btn-outline-primary">Edit</router-link>
                          <button @click="deletePost(post.id)" class="btn btn-outline-danger">Delete</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="row g-4 mt-4" data-aos="fade-up" data-aos-delay="300">
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body text-center">
                  <div class="bg-primary bg-opacity-10 rounded-3 p-4 mb-3 d-inline-block">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                  <h5 class="fw-bold mb-2">Create New Post</h5>
                  <p class="text-muted mb-3">Start writing your next amazing blog post</p>
                  <router-link to="/dashboard/create" class="btn btn-primary">Start Writing</router-link>
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body text-center">
                  <div class="bg-success bg-opacity-10 rounded-3 p-4 mb-3 d-inline-block">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-success">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <h5 class="fw-bold mb-2">View Analytics</h5>
                  <p class="text-muted mb-3">Check your blog's performance and insights</p>
                  <button class="btn btn-success" @click="viewAnalytics">View Analytics</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import { Modal } from 'bootstrap'
const { user: authUser, clearAuth } = useAuth()

export default {
  name: 'DashboardPage',
  data() {
    return {
      stats: {
        totalPosts: 24,
        totalViews: 12500,
        totalLikes: 847,
        totalComments: 156
      },
      recentPosts: [
        {
          id: 1,
          title: 'Getting Started with Vue.js 3',
          description: 'A comprehensive guide to modern Vue development',
          status: 'published',
          views: 2300,
          likes: 89,
          date: '2 days ago'
        },
        {
          id: 2,
          title: 'Bootstrap 5 Best Practices',
          description: 'Tips and tricks for better Bootstrap development',
          status: 'draft',
          views: 0,
          likes: 0,
          date: '1 week ago'
        },
        {
          id: 3,
          title: 'Modern CSS Techniques',
          description: 'Exploring advanced CSS features and animations',
          status: 'published',
          views: 1800,
          likes: 67,
          date: '1 week ago'
        }
      ]
    }
  },
  computed: {
    authUser() {
      return authUser.value
    },
    userData() {
      return {
        stats: this.stats,
        recentPosts: this.recentPosts
      }
    }
  },
  methods: {
    handleLogout() {
      if (confirm('Are you sure you want to logout?')) {
        clearAuth() // This will automatically redirect to login page
      }
    },
    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num
    },
    async deletePost(postId) {
      if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        try {
          // Here you would make an API call to delete the post
          // For now, we'll simulate it by removing from local data
          this.recentPosts = this.recentPosts.filter(post => post.id !== postId)
          this.stats.totalPosts -= 1
          
          // Show success message
          alert('Post deleted successfully!')
        } catch (error) {
          console.error('Error deleting post:', error)
          alert('Failed to delete post. Please try again.')
        }
      }
    },
    viewAnalytics() {
      // Get date range for analytics
      const today = new Date()
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
      
      const analytics = {
        period: {
          start: lastMonth.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        },
        views: {
          total: this.stats.totalViews,
          trend: '+12.5%',
          data: [120, 150, 180, 210, 190, 240, 220] // Last 7 days
        },
        likes: {
          total: this.stats.totalLikes,
          trend: '+8.3%',
          data: [45, 52, 49, 58, 51, 54, 60] // Last 7 days
        },
        comments: {
          total: this.stats.totalComments,
          trend: '+15.2%',
          data: [12, 15, 18, 14, 20, 17, 22] // Last 7 days
        },
        topPosts: this.recentPosts
          .filter(post => post.status === 'published')
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
      }

      this.showAnalyticsModal(analytics)
    },
    showAnalyticsModal(analytics) {
      // Remove any existing modals
      const existingModal = document.getElementById('analyticsModal')
      if (existingModal) {
        existingModal.remove()
      }

      // Create modal element
      const modal = document.createElement('div')
      modal.id = 'analyticsModal'
      modal.className = 'modal fade'
      modal.setAttribute('tabindex', '-1')
      modal.setAttribute('aria-labelledby', 'analyticsModalLabel')
      modal.setAttribute('aria-hidden', 'true')

      // Create modal content
      modal.innerHTML = `
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="analyticsModalLabel">Analytics Dashboard</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <!-- Period Selection -->
                <div class="col-12">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="mb-0">Period: ${analytics.period.start} to ${analytics.period.end}</h6>
                  </div>
                </div>

                <!-- Stats Cards -->
                <div class="col-md-4">
                  <div class="card border-0 shadow-sm">
                    <div class="card-body">
                      <h6 class="card-title text-muted mb-1">Total Views</h6>
                      <h3 class="mb-0 fw-bold">${this.formatNumber(analytics.views.total)}</h3>
                      <small class="text-success">${analytics.views.trend}</small>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card border-0 shadow-sm">
                    <div class="card-body">
                      <h6 class="card-title text-muted mb-1">Total Likes</h6>
                      <h3 class="mb-0 fw-bold">${this.formatNumber(analytics.likes.total)}</h3>
                      <small class="text-success">${analytics.likes.trend}</small>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card border-0 shadow-sm">
                    <div class="card-body">
                      <h6 class="card-title text-muted mb-1">Total Comments</h6>
                      <h3 class="mb-0 fw-bold">${this.formatNumber(analytics.comments.total)}</h3>
                      <small class="text-success">${analytics.comments.trend}</small>
                    </div>
                  </div>
                </div>

                <!-- Top Posts Table -->
                <div class="col-12">
                  <h6 class="mb-3">Top Performing Posts</h6>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Views</th>
                          <th>Likes</th>
                          <th>Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${analytics.topPosts.map(post => `
                          <tr>
                            <td>${post.title}</td>
                            <td>${this.formatNumber(post.views)}</td>
                            <td>${this.formatNumber(post.likes)}</td>
                            <td>${post.comments || 0}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `

      // Add modal to document
      document.body.appendChild(modal)

      // Initialize and show Bootstrap modal
      const modalInstance = new Modal(modal)
      modalInstance.show()

      // Clean up when modal is hidden
      modal.addEventListener('hidden.bs.modal', () => {
        modal.remove()
      })
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

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
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