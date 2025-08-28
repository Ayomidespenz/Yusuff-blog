<template>
  <div class="container py-4">
    <!-- Profile Header -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto position-relative">
            <img :src="profile.avatar" alt="Profile avatar" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
            <label class="position-absolute bottom-0 end-0 btn btn-primary btn-sm rounded-circle p-1" style="cursor: pointer">
              <input type="file" class="d-none"  @change="handleAvatarUpload">
              <i class="bi bi-camera-fill"></i>
            </label>
          </div>
          <div class="col">
            <h1 class="h3 mb-1">{{ profile.name }}</h1>
            <p class="text-muted mb-0">{{ profile.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Form -->
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="h4 mb-4">Profile Information</h2>
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="profile.name" type="text" class="form-control" >
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="profile.email" type="email" class="form-control" >
          </div>
          <div class="mb-3">
            <label class="form-label">Bio</label>
            <textarea v-model="profile.bio" rows="3" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Location</label>
            <input v-model="profile.location" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Website</label>
            <input v-model="profile.website" type="url" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="updatingProfile">
            {{ updatingProfile ? 'Updating...' : 'Update Profile' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Password Change -->
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="h4 mb-4">Change Password</h2>
        <form @submit.prevent="changePassword">
          <div class="mb-3">
            <label class="form-label">Current Password</label>
            <input v-model="password.current" type="password" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">New Password</label>
            <input v-model="password.new" type="password" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm New Password</label>
            <input v-model="password.confirm" type="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="changingPassword">
            {{ changingPassword ? 'Changing...' : 'Change Password' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Social Links -->
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="h4 mb-4">Social Links</h2>
        <form @submit.prevent="updateSocialLinks">
          <div class="mb-3">
            <label class="form-label">Twitter</label>
            <input v-model="profile.socialLinks.twitter" type="url" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">GitHub</label>
            <input v-model="profile.socialLinks.github" type="url" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">LinkedIn</label>
            <input v-model="profile.socialLinks.linkedin" type="url" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="updatingSocialLinks">
            {{ updatingSocialLinks ? 'Updating...' : 'Update Social Links' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Logout Button -->
    <button @click="handleLogout" class="btn btn-danger w-100">
      Logout
    </button>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "vue-router"

export default {
  name: "UserProfile",

  data() {
    const userStore = useUserStore()
    return {
      userStore,
      router: useRouter(),

      profile: {
        name: userStore.user?.name || '',
        email: userStore.user?.email || '',
        avatar: userStore.user?.avatar || '',
        bio: userStore.user?.bio || '',
        location: userStore.user?.location || '',
        website: userStore.user?.website || '',
        socialLinks: userStore.user?.social_links || {
          twitter: '',
          github: '',
          linkedin: ''
        }
      },

      password: {
        current: "",
        new: "",
        confirm: ""
      },

      updatingProfile: false,
      changingPassword: false,
      updatingSocialLinks: false
    }
  },

  methods: {
    async handleAvatarUpload(event) {
      const file = event.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.")
        return
      }

      try {
        const formData = new FormData()
        formData.append("avatar", file)

        const response = await this.userStore.updateAvatar(formData)

        if (response.success) {
          this.profile.avatar = response.data.avatar
          alert("Avatar updated successfully!")
        } else {
          throw new Error("Failed to update avatar")
        }
      } catch (err) {
        console.error("Error uploading avatar:", err)
        alert(err.response?.data?.message || "Failed to update avatar")
      }
    },

    async updateProfile() {
      if (!this.profile.name.trim() && !this.profile.email.trim()) {
        alert("Name and Email are required.")
        return
      }

      this.updatingProfile = true
      try {
        const profileData = {
          name: this.profile.name.trim(),
          email: this.profile.email.trim(),
          bio: this.profile.bio?.trim() || '',
          location: this.profile.location?.trim() || '',
          website: this.profile.website?.trim() || '',
          social_links: {
            twitter: this.profile.socialLinks.twitter?.trim() || '',
            github: this.profile.socialLinks.github?.trim() || '',
            linkedin: this.profile.socialLinks.linkedin?.trim() || ''
          }
        }

        const result = await this.userStore.updateProfile(profileData)

        if (result && result.success) {
          const userData = result.data
          Object.assign(this.profile, {
            name: userData.name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            location: userData.location || '',
            website: userData.website || '',
            socialLinks: userData.social_links || {
              twitter: '',
              github: '',
              linkedin: ''
            }
          })
          alert("Profile updated successfully!")
        }
      } catch (err) {
        console.error("Profile update error:", err)
        alert(err.message || "Failed to update profile.")
      } finally {
        this.updatingProfile = false
      }
    },

    async changePassword() {
      // Validate required fields
      if (!this.password.current || !this.password.new || !this.password.confirm) {
        alert("Please fill in all password fields.")
        return
      }

      // Validate password match
      if (this.password.new !== this.password.confirm) {
        alert("New passwords do not match.")
        return
      }

      // Validate password length
      if (this.password.new.length < 8) {
        alert("New password must be at least 8 characters long.")
        return
      }

      this.changingPassword = true
      try {
        // Prepare data for the API
        const passwordData = {
          current_password: this.password.current,
          new_password: this.password.new,
          new_password_confirmation: this.password.confirm
        };

        // Call the user store method
        await this.userStore.changePassword(passwordData);
        
        // Clear the form on success
        this.password.current = '';
        this.password.new = '';
        this.password.confirm = '';
        alert("Password changed successfully!");
      } catch (err) {
        console.error("Password change error:", err);
        // Display the error message from the API or a fallback
        alert(err.message || "Failed to change password.");
      } finally {
        this.changingPassword = false;
      }
    },

    async updateSocialLinks() {
      this.updatingSocialLinks = true
      try {
        const result = await this.userStore.updateProfile({
          ...this.profile,
          social_links: {
            twitter: this.profile.socialLinks.twitter?.trim() || '',
            github: this.profile.socialLinks.github?.trim() || '',
            linkedin: this.profile.socialLinks.linkedin?.trim() || ''
          }
        })

        if (result && result.success) {
          const userData = result.data
          this.profile.socialLinks = userData.social_links || {
            twitter: '',
            github: '',
            linkedin: ''
          }
          alert("Social links updated successfully!")
        }
      } catch (err) {
        console.error("Social links update error:", err)
        alert(err.message || "Failed to update social links.")
      } finally {
        this.updatingSocialLinks = false
      }
    },

    handleLogout() {
      if (confirm("Are you sure you want to log out?")) {
        this.userStore.logout()
        this.router.push("/login")
      }
    }
  }
}
</script>
