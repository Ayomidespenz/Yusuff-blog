<template>
  <div class="settings-page">
    <div class="container-fluid">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Settings</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <router-link to="/dashboard" class="btn btn-outline-secondary me-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Dashboard
          </router-link>
        </div>
      </div>
      <div class="settings-content py-4">
            <div class="col-lg-8">
              <!-- Account Settings -->
              <div class="card border-0 shadow-sm mb-4" data-aos="fade-up">
                <div class="card-header bg-white border-0">
                  <h5 class="mb-0 fw-bold">Account Settings</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveAccountSettings">
                    <div class="mb-3">
                      <label for="language" class="form-label fw-medium">Language</label>
                      <select class="form-select" id="language" v-model="settings.language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>
                    
                    <div class="mb-3">
                      <label for="timezone" class="form-label fw-medium">Timezone</label>
                      <select class="form-select" id="timezone" v-model="settings.timezone">
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="MST">Mountain Time (MST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                      </select>
                    </div>
                    
                    <div class="mb-3">
                      <label for="dateFormat" class="form-label fw-medium">Date Format</label>
                      <select class="form-select" id="dateFormat" v-model="settings.dateFormat">
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" :disabled="savingAccount">
                      <span v-if="savingAccount" class="spinner-border spinner-border-sm me-2"></span>
                      {{ savingAccount ? 'Saving...' : 'Save Account Settings' }}
                    </button>
                  </form>
                </div>
              </div>

              <!-- Notification Settings -->
              <div class="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="200">
                <div class="card-header bg-white border-0">
                  <h5 class="mb-0 fw-bold">Notification Settings</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveNotificationSettings">
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="emailNotifications" v-model="settings.notifications.email">
                        <label class="form-check-label fw-medium" for="emailNotifications">
                          Email Notifications
                        </label>
                      </div>
                      <small class="text-muted">Receive notifications about new comments, likes, and followers</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="pushNotifications" v-model="settings.notifications.push">
                        <label class="form-check-label fw-medium" for="pushNotifications">
                          Push Notifications
                        </label>
                      </div>
                      <small class="text-muted">Receive push notifications in your browser</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="weeklyDigest" v-model="settings.notifications.weeklyDigest">
                        <label class="form-check-label fw-medium" for="weeklyDigest">
                          Weekly Digest
                        </label>
                      </div>
                      <small class="text-muted">Receive a weekly summary of your blog's performance</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="marketingEmails" v-model="settings.notifications.marketing">
                        <label class="form-check-label fw-medium" for="marketingEmails">
                          Marketing Emails
                        </label>
                      </div>
                      <small class="text-muted">Receive updates about new features and tips</small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" :disabled="savingNotifications">
                      <span v-if="savingNotifications" class="spinner-border spinner-border-sm me-2"></span>
                      {{ savingNotifications ? 'Saving...' : 'Save Notification Settings' }}
                    </button>
                  </form>
                </div>
              </div>

              <!-- Privacy Settings -->
              <div class="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="300">
                <div class="card-header bg-white border-0">
                  <h5 class="mb-0 fw-bold">Privacy Settings</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="savePrivacySettings">
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="profileVisibility" v-model="settings.privacy.profilePublic">
                        <label class="form-check-label fw-medium" for="profileVisibility">
                          Public Profile
                        </label>
                      </div>
                      <small class="text-muted">Allow others to view your profile and posts</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="showEmail" v-model="settings.privacy.showEmail">
                        <label class="form-check-label fw-medium" for="showEmail">
                          Show Email Address
                        </label>
                      </div>
                      <small class="text-muted">Display your email address on your public profile</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="allowComments" v-model="settings.privacy.allowComments">
                        <label class="form-check-label fw-medium" for="allowComments">
                          Allow Comments
                        </label>
                      </div>
                      <small class="text-muted">Allow visitors to comment on your posts</small>
                    </div>
                    
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="showAnalytics" v-model="settings.privacy.showAnalytics">
                        <label class="form-check-label fw-medium" for="showAnalytics">
                          Show Analytics
                        </label>
                      </div>
                      <small class="text-muted">Display view counts and engagement metrics publicly</small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" :disabled="savingPrivacy">
                      <span v-if="savingPrivacy" class="spinner-border spinner-border-sm me-2"></span>
                      {{ savingPrivacy ? 'Saving...' : 'Save Privacy Settings' }}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <!-- Settings Sidebar -->
            <div class="col-lg-4">
              <!-- Quick Actions -->
              <div class="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="400">
                <div class="card-header bg-white border-0">
                  <h6 class="mb-0 fw-bold">Quick Actions</h6>
                </div>
                <div class="card-body">
                  <button class="btn btn-outline-primary w-100 mb-2" @click="exportData">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export Data
                  </button>
                  <button class="btn btn-outline-warning w-100 mb-2" @click="clearCache">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                    Clear Cache
                  </button>
                  <button class="btn btn-outline-info w-100 mb-2" @click="downloadBackup">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17,8 12,3 7,8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Download Backup
                  </button>
                </div>
              </div>

              <!-- Account Status -->
              <div class="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="500">
                <div class="card-header bg-white border-0">
                  <h6 class="mb-0 fw-bold">Account Status</h6>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Account Type</span>
                    <span class="badge bg-success">Premium</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Storage Used</span>
                    <span class="fw-bold">2.4 GB / 10 GB</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Last Login</span>
                    <span class="fw-bold">2 hours ago</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">Account Created</span>
                    <span class="fw-bold">Aug 05, 2025</span>
                  </div>
                </div>
              </div>

              <!-- Danger Zone -->
              <div class="card border-0 shadow-sm border-danger" data-aos="fade-up" data-aos-delay="600">
                <div class="card-header bg-white border-0">
                  <h6 class="mb-0 fw-bold text-danger">Danger Zone</h6>
                </div>
                <div class="card-body">
                  <p class="text-muted small mb-3">These actions cannot be undone. Please proceed with caution.</p>
                  <button class="btn btn-outline-danger w-100 mb-2" @click="deactivateAccount">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Deactivate Account
                  </button>
                  <button class="btn btn-danger w-100" @click="deleteAccount">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                    Delete Account
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script>
export default {
  name: 'SettingsPage',
  data() {
    return {
      settings: {
        language: 'en',
        timezone: 'EST',
        dateFormat: 'MM/DD/YYYY',
        notifications: {
          email: true,
          push: false,
          weeklyDigest: true,
          marketing: false
        },
        privacy: {
          profilePublic: true,
          showEmail: false,
          allowComments: true,
          showAnalytics: true
        }
      },
      savingAccount: false,
      savingNotifications: false,
      savingPrivacy: false
    }
  },
  methods: {
    async saveAccountSettings() {
      this.savingAccount = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Account settings saved successfully!')
      } catch (error) {
        alert('Failed to save account settings. Please try again.')
      } finally {
        this.savingAccount = false
      }
    },
    
    async saveNotificationSettings() {
      this.savingNotifications = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Notification settings saved successfully!')
      } catch (error) {
        alert('Failed to save notification settings. Please try again.')
      } finally {
        this.savingNotifications = false
      }
    },
    
    async savePrivacySettings() {
      this.savingPrivacy = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Privacy settings saved successfully!')
      } catch (error) {
        alert('Failed to save privacy settings. Please try again.')
      } finally {
        this.savingPrivacy = false
      }
    },
    
    exportData() {
      alert('Data export started. You will receive an email when it\'s ready.')
    },
    
    clearCache() {
      if (confirm('Are you sure you want to clear the cache? This will log you out.')) {
        alert('Cache cleared successfully!')
        this.$router.push('/')
      }
    },
    
    downloadBackup() {
      alert('Backup download started. You will receive an email when it\'s ready.')
    },
    
    deactivateAccount() {
      if (confirm('Are you sure you want to deactivate your account? You can reactivate it later by logging in.')) {
        alert('Account deactivated successfully!')
        this.$router.push('/')
      }
    },
    
    deleteAccount() {
      if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.')) {
        if (confirm('This is your final warning. Are you absolutely sure?')) {
          alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.')
          this.$router.push('/')
        }
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

.form-check-input:checked {
  background-color: #667eea;
  border-color: #667eea;
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

.btn-danger:hover {
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