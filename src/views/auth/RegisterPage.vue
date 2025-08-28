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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    class="text-white">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="m22 21-2-2" />
                    <path d="M16 16h6" />
                  </svg>
                </div>
                <h2 class="h4 fw-bold text-primary mb-1">Create Account</h2>
                <p class="text-muted small">Join Mishary-Hub and start sharing your stories</p>
              </div>

              <!-- Register Form -->
              <form @submit.prevent="handleRegister">
                <div v-if="error" class="alert alert-danger mb-3">
                  {{ error }}
                </div>

                <div class="mb-3">
                  <label for="name" class="form-label fw-medium">Full Name</label>
                  <input type="text" class="form-control" id="name" v-model="form.name"
                    placeholder="Enter your full name" :class="{ 'is-invalid': formErrors.name }" required>
                  <div class="invalid-feedback" v-if="formErrors.name">
                    {{ formErrors.name }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label fw-medium">Email Address</label>
                  <input type="email" class="form-control" id="email" v-model="form.email"
                    placeholder="Enter your email" :class="{ 'is-invalid': formErrors.email }" required>
                  <div class="invalid-feedback" v-if="formErrors.email">
                    {{ formErrors.email }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label fw-medium">Password</label>
                  <input type="password" class="form-control" id="password" v-model="form.password"
                    placeholder="Create a password" :class="{ 'is-invalid': formErrors.password }" required>
                  <div class="invalid-feedback" v-if="formErrors.password">
                    {{ formErrors.password }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password_confirmation" class="form-label fw-medium">Confirm Password</label>
                  <input type="password" class="form-control" id="password_confirmation"
                    v-model="form.password_confirmation" placeholder="Confirm your password"
                    :class="{ 'is-invalid': formErrors.password_confirmation }" required>
                  <div class="invalid-feedback" v-if="formErrors.password_confirmation">
                    {{ formErrors.password_confirmation }}
                  </div>
                </div>

                <div class="form-check mb-4">
                  <input class="form-check-input" type="checkbox" id="terms" v-model="form.terms" required>
                  <label class="form-check-label text-muted" for="terms">
                    I agree to the <a href="#" class="text-primary">Terms of Service</a> and <a href="#"
                      class="text-primary">Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Creating account...' : 'Create Account' }}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                class="me-1">
                <path d="m15 18-6-6 6-6" />
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
import { useToast } from 'vue-toastification'
import { authAPI } from '@/services/api'

export default {
  name: 'RegisterPage',
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false
      },
      formErrors: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: '',
      isLoading: false
    }
  },
  mounted() {
    // Check if user is already authenticated
    const { isAuthenticated } = useAuth()
    if (isAuthenticated.value) {
      this.$router.push('/login')
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.formErrors = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }

      if (!this.form.name) {
        this.formErrors.name = 'Name is required'
        isValid = false
      } else if (this.form.name.length < 2) {
        this.formErrors.name = 'Name must be at least 2 characters'
        isValid = false
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

      if (!this.form.password_confirmation) {
        this.formErrors.password_confirmation = 'Please confirm your password'
        isValid = false
      } else if (this.form.password !== this.form.password_confirmation) {
        this.formErrors.password_confirmation = 'Passwords do not match'
        isValid = false
      }

      if (!this.form.terms) {
        this.error = 'Please agree to the terms and conditions'
        isValid = false
      }

      return isValid
    },
    async handleRegister() {
  // Reset errors (reactively, don’t replace the whole object)
  this.error = ''
  Object.keys(this.formErrors).forEach(key => {
    this.formErrors[key] = ''
  })

  // Frontend validation
  if (!this.validateForm()) return

  this.isLoading = true
  try {
    const response = await authAPI.register({
      name: this.form.name,
      email: this.form.email,
      password: this.form.password,
      password_confirmation: this.form.password_confirmation
    })
  if (response.data.success) {
      this.toast.success("Registration successful")
      this.$router.push('/auth/login')
    } else {
      this.error = response.data.message || ' Registration failed'
      if (response.data.error) {
        this.error = response.data.error
      }
      this.toast.error(this.error)
    }
 
  } catch (err) {
    console.error('Registration failed:', err.response?.data || err)

    if (err.response?.status === 422) {
      const errors = err.response.data.errors || {}

      // Assign validation errors to fields
      Object.keys(errors).forEach(key => {
        if (this.formErrors.hasOwnProperty(key)) {
          this.formErrors[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key]
        }
      })

      // ✅ Special case: email already taken
      if (errors.email && errors.email[0]) {
        this.formErrors.email = errors.email[0]   // show under input
        this.toast.error(errors.email[0])         // show as toast
        return
      }

      // Otherwise, show the first error as toast
      const firstError = Object.values(errors)[0]?.[0]
      if (firstError) {
        this.toast.error(firstError)
      }
    } 
    else if (err.response?.data?.message) {
      this.error = err.response.data.message
      this.toast.error(this.error)
    } 
    else {
      this.error = 'Registration failed. Please try again.'
      this.toast.error(this.error)
    }
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