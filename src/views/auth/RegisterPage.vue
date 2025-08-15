<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-8 col-md-6 col-lg-4">
          <div class="card shadow-sm border-0" data-aos="fade-up">
            <div class="card-body p-4">
              <!-- Header -->
              <div class="text-center mb-3">
                <div class="bg-primary rounded-3 p-2 mb-2 d-inline-block">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-2-2"/>
                    <path d="m16 16 2 2"/>
                  </svg>
                </div>
                <h2 class="h4 fw-bold text-primary mb-1">Create Account</h2>
                <p class="text-muted small">Join Mishary-Hub and start sharing your stories</p>
              </div>

              <!-- Register Form -->
              <form @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label fw-medium">First Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName" 
                      v-model="form.firstName"
                      placeholder="First name"
                      required
                    >
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label fw-medium">Last Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="lastName" 
                      v-model="form.lastName"
                      placeholder="Last name"
                      required
                    >
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label fw-medium">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control form-control-lg" 
                    id="email" 
                    v-model="form.email"
                    placeholder="Enter your email"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="username" class="form-label fw-medium">Username</label>
                  <input 
                    type="text" 
                    class="form-control form-control-lg" 
                    id="username" 
                    v-model="form.username"
                    placeholder="Choose a username"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label fw-medium">Password</label>
                  <input 
                    type="password" 
                    class="form-control form-control-lg" 
                    id="password" 
                    v-model="form.password"
                    placeholder="Create a password"
                    required
                  >
                  <div class="form-text">Password must be at least 8 characters long</div>
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label fw-medium">Confirm Password</label>
                  <input 
                    type="password" 
                    class="form-control form-control-lg" 
                    id="confirmPassword" 
                    v-model="form.confirmPassword"
                    placeholder="Confirm your password"
                    required
                  >
                </div>
                
                <div class="mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="terms" v-model="form.terms" required>
                    <label class="form-check-label text-muted" for="terms">
                      I agree to the 
                      <a href="#" class="text-decoration-none text-primary">Terms of Service</a> 
                      and 
                      <a href="#" class="text-decoration-none text-primary">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="loading || !form.terms">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
                
                <div class="text-center">
                  <p class="text-muted mb-0">
                    Already have an account? 
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
  name: 'RegisterPage',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        terms: false
      },
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      // Validate passwords match
      if (this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      // Validate password length
      if (this.form.password.length < 8) {
        alert('Password must be at least 8 characters long!')
        return
      }
      
      this.loading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Save user registration data
        const { setAuth } = useAuth()
        const userStore = useUserStore()
        
        // Save auth data
        setAuth('dummy-token-' + Date.now())
        
        // Save user profile data
        const userData = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          username: this.form.username,
          createdAt: new Date().toISOString()
        }
        
        // Update both auth and profile data
        userStore.setAuthData({
          username: this.form.username,
          email: this.form.email
        })
        
        userStore.updateProfile(userData)
        
        // For demo purposes, show success and redirect
        alert('Account created successfully! Redirecting to login...')
        
        // Redirect to login page
        this.$router.push('/auth/login')
        
      } catch (error) {
        console.error('Registration error:', error)
        alert('Registration failed. Please try again.')
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

.form-check-input:checked {
  background-color: #667eea;
  border-color: #667eea;
}

.form-check-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style> 