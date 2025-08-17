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
                    <path d="M15 7a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L11 17H9v2H7v2H4a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 1 1 21 9z"/>
                  </svg>
                </div>
                <h2 class="h4 fw-bold text-primary mb-1">Reset Password</h2>
                <p class="text-muted small">Enter your email to receive a password reset link</p>
              </div>

              <!-- Forgot Password Form -->
              <form @submit.prevent="handleForgotPassword" v-if="!emailSent">
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
                
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
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

              <!-- Success Message -->
              <div v-if="emailSent" class="text-center">
                <div class="text-success mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <h5 class="text-success mb-3">Email Sent!</h5>
                <p class="text-muted mb-4">
                  We've sent a password reset link to <strong>{{ form.email }}</strong>. 
                  Please check your email and follow the instructions to reset your password.
                </p>
                <button @click="resetForm" class="btn btn-outline-primary">
                  Send Another Email
                </button>
              </div>
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
import { authAPI } from '@/services/api'

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      form: {
        email: ''
      },
      formErrors: {
        email: ''
      },
      error: '',
      isLoading: false,
      emailSent: false
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.formErrors = {
        email: ''
      }

      if (!this.form.email) {
        this.formErrors.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.formErrors.email = 'Please enter a valid email'
        isValid = false
      }

      return isValid
    },
    async handleForgotPassword() {
      this.error = ''
      if (!this.validateForm()) return

      this.isLoading = true
      try {
        await authAPI.forgotPassword({
          email: this.form.email
        })
        
        this.emailSent = true
      } catch (err) {
        console.error('Forgot password failed:', err)
        if (err.response?.data?.errors?.email) {
          this.formErrors.email = err.response.data.errors.email[0]
        } else if (err.response?.data?.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Failed to send reset email. Please try again.'
        }
      } finally {
        this.isLoading = false
      }
    },
    resetForm() {
      this.emailSent = false
      this.form.email = ''
      this.error = ''
      this.formErrors = { email: '' }
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

.btn-outline-primary {
  border-color: #667eea;
  color: #667eea;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #667eea;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style> 