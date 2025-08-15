<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg border-0" data-aos="fade-up">
            <div class="card-body p-5">
              <!-- Header -->
              <div class="text-center mb-4">
                <div class="bg-warning rounded-3 p-3 mb-3 d-inline-block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h2 class="h3 fw-bold text-primary mb-2">Forgot Password?</h2>
                <p class="text-muted">Enter your email to reset your password</p>
              </div>

              <!-- Forgot Password Form -->
              <form @submit.prevent="handleForgotPassword">
                <div class="mb-4">
                  <label for="email" class="form-label fw-medium">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control form-control-lg" 
                    id="email" 
                    v-model="form.email"
                    placeholder="Enter your email"
                    required
                  >
                  <div class="form-text">We'll send you a link to reset your password</div>
                </div>
                
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Sending...' : 'Send Reset Link' }}
                </button>
                
                <div class="text-center">
                  <p class="text-muted mb-0">
                    Remember your password? 
                    <router-link to="/auth/login" class="text-decoration-none text-primary fw-medium">
                      Sign in
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Back to Home -->
          <div class="text-center mt-3">
            <router-link to="/" class="text-decoration-none text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      form: {
        email: ''
      },
      loading: false
    }
  },
  methods: {
    async handleForgotPassword() {
      this.loading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // For demo purposes, just show success
        alert('Password reset link sent! Check your email. (This is a demo)')
        
        // In a real app, you would:
        // 1. Call your password reset API
        // 2. Show success message
        // 3. Redirect to login
        
      } catch (error) {
        console.error('Password reset error:', error)
        alert('Failed to send reset link. Please try again.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.form-control {
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-control:focus {
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
</style> 