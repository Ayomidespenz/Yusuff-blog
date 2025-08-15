<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-8 col-md-6 col-lg-3">
          <div class="card shadow-sm border-0" data-aos="fade-up">
            <div class="card-body p-4">
              <!-- Header -->
              <div class="text-center mb-3">
                <div class="bg-primary rounded-3 p-2 mb-2 d-inline-block">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                </div>
                <h2 class="h4 fw-bold text-primary mb-1">Welcome Back</h2>
                <p class="text-muted small">Sign in to your Mishary-Hub account</p>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="handleLogin">
                <div v-if="error" class="alert alert-danger mb-3">
                  {{ error }}
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label fw-medium">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email"
                    placeholder="Enter your email"
                    :class="{ 'is-invalid': formErrors.email }"
                    required
                  >
                  <div class="invalid-feedback" v-if="formErrors.email">
                    {{ formErrors.email }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label fw-medium">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="form.password"
                    placeholder="Enter your password"
                    :class="{ 'is-invalid': formErrors.password }"
                    required
                  >
                  <div class="invalid-feedback" v-if="formErrors.password">
                    {{ formErrors.password }}
                  </div>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember" v-model="form.remember">
                    <label class="form-check-label text-muted" for="remember">
                      Remember me
                    </label>
                  </div>
                  <router-link to="/auth/forgot-password" class="text-decoration-none text-primary">
                    Forgot password?
                  </router-link>
                </div>
                
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Signing in...' : 'Sign In' }}
                </button>
                
                <div class="text-center">
                  <p class="text-muted mb-0">
                    Don't have an account? 
                    <router-link to="/auth/register" class="text-decoration-none text-primary fw-medium">
                      Sign up
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
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      formErrors: {
        email: '',
        password: ''
      },
      error: '',
      isLoading: false
    }
  },
  created() {
    // Check if user is already authenticated
    const { isAuthenticated } = useAuth()
    if (isAuthenticated.value) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.formErrors = {
        email: '',
        password: ''
      }

      if (!this.form.email) {
        this.formErrors.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.formErrors.email = 'Please enter a valid email'
        isValid = false
      }

      if (!this.form.password) {
        this.formErrors.password = 'Password is required'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.formErrors.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    },
    async handleLogin() {
      this.error = ''
      if (!this.validateForm()) return

      this.isLoading = true
      try {
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create mock user data (replace with actual API response)
        const userData = {
          id: 1,
          name: 'John Doe',
          email: this.form.email,
          role: 'user'
        }

        const { setAuth } = useAuth()
        setAuth('dummy-token', userData)

        if (this.form.remember) {
          localStorage.setItem('rememberMe', 'true')
        }

        // Redirect to dashboard
        this.$router.push('/dashboard')
      } catch (err) {
        console.error('Login failed:', err)
        this.error = 'Invalid email or password'
      } finally {
        this.isLoading = false
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