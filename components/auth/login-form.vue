<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card border-0 shadow-sm mt-5">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Welcome Back</h2>
            <p class="text-center text-muted mb-4">Sign in to your account to continue</p>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="form.email"
                  placeholder="Enter your email"
                  required
                >
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="form.password"
                  placeholder="Enter your password"
                  required
                >
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="remember" 
                    v-model="form.remember"
                  >
                  <label class="form-check-label" for="remember">
                    Remember me
                  </label>
                </div>
                <router-link to="/auth/forgot-password" class="text-primary">
                  Forgot password?
                </router-link>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary w-100" 
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </button>

              <div class="text-center mt-4">
                <p class="mb-0">
                  Don't have an account? 
                  <router-link to="/auth/register" class="text-primary">
                    Sign up
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'LoginForm',

  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      isLoading: false
    }
  },

  methods: {
    async handleSubmit() {
      this.isLoading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In a real app, you would validate credentials with your backend
        if (this.form.email && this.form.password) {
          const { setAuth } = useAuth()
          const token = 'dummy-token-' + Date.now()  // Generate a unique token
          setAuth(token)
          localStorage.setItem('user', JSON.stringify({
            email: this.form.email,
            name: 'John Doe'  // In real app, this would come from backend
          }))
          
          // Redirect to dashboard with reload to ensure proper state
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed. Please try again.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:disabled {
  background: #6c757d;
  transform: none;
  box-shadow: none;
}
</style>
