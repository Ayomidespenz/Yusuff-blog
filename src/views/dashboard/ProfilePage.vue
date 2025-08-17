<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

// Stores & router
const userStore = useUserStore();
const router = useRouter();

// Profile data
const profile = reactive({
  name: userStore.user?.name || '',
  email: userStore.user?.email || '',
  avatar: userStore.user?.avatar || '/placeholder-user.jpg',
  bio: userStore.user?.bio || '',
  location: userStore.user?.location || '',
  website: userStore.user?.website || '',
  socialLinks: userStore.user?.social_links || {
    twitter: '',
    github: '',
    linkedin: ''
  }
});

// Password form
const password = reactive({
  current: "",
  new: "",
  confirm: ""
});

// UI states
const updatingProfile = ref(false);
const changingPassword = ref(false);
const updatingSocialLinks = ref(false);

// --- Methods ---

// Handle avatar upload
const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await userStore.updateAvatar(formData);
    
    if (response.success) {
      profile.avatar = response.data.avatar;
      alert("Avatar updated successfully!");
    } else {
      throw new Error("Failed to update avatar");
    }
  } catch (err) {
    console.error('Error uploading avatar:', err);
    alert(err.response?.data?.message || "Failed to update avatar");
  }
};

// Update profile
const updateProfile = async () => {
  if (!profile.name.trim() || !profile.email.trim()) {
    alert("Name and Email are required.");
    return;
  }

  updatingProfile.value = true;
  try {
    // Create a regular data object (not FormData since we don't have files here)
    const profileData = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      bio: profile.bio?.trim() || '',
      location: profile.location?.trim() || '',
      website: profile.website?.trim() || '',
      social_links: {
        twitter: profile.socialLinks.twitter?.trim() || '',
        github: profile.socialLinks.github?.trim() || '',
        linkedin: profile.socialLinks.linkedin?.trim() || ''
      }
    }

    const result = await userStore.updateProfile(profileData)
    
    if (result && result.success) {
      const userData = result.data
      // Update local profile with returned data
      Object.assign(profile, {
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
    console.error('Profile update error:', err)
    alert(err.message || "Failed to update profile.")
  } finally {
    updatingProfile.value = false
  }
}

// Change password
const changePassword = async () => {
  if (!password.current || !password.new || !password.confirm) {
    alert("Please fill in all password fields.");
    return;
  }
  if (password.new !== password.confirm) {
    alert("New passwords do not match.");
    return;
  }
  if (password.new.length < 8) {
    alert("New password must be at least 8 characters long.");
    return;
  }

  changingPassword.value = true;
  try {
    const result = await userStore.changePassword({
      current_password: password.current,
      new_password: password.new,
      new_password_confirmation: password.confirm
    });
    
    if (result && result.success) {
      alert("Password changed successfully!");
      // Clear password fields
      password.current = password.new = password.confirm = "";
    }
  } catch (err) {
    console.error('Password change error:', err);
    alert(err.message || "Failed to change password.");
  } finally {
    changingPassword.value = false;
  }
};

// Update social links
const updateSocialLinks = async () => {
  updatingSocialLinks.value = true;
  try {
    const result = await userStore.updateProfile({
      ...profile,
      social_links: {
        twitter: profile.socialLinks.twitter?.trim() || '',
        github: profile.socialLinks.github?.trim() || '',
        linkedin: profile.socialLinks.linkedin?.trim() || ''
      }
    });
    
    if (result && result.success) {
      const userData = result.data;
      profile.socialLinks = userData.social_links || {
        twitter: '',
        github: '',
        linkedin: ''
      };
      alert("Social links updated successfully!");
    }
  } catch (err) {
    console.error('Social links update error:', err);
    alert(err.message || "Failed to update social links.");
  } finally {
    updatingSocialLinks.value = false;
  }
};

// Logout
const handleLogout = () => {
  if (confirm("Are you sure you want to log out?")) {
    userStore.logout();
    router.push("/login");
  }
};
</script>

<template>
  <div class="container py-4">
    <!-- Profile Header -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto position-relative">
            <img :src="profile.avatar" alt="Profile avatar" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
            <label class="position-absolute bottom-0 end-0 btn btn-primary btn-sm rounded-circle p-1" style="cursor: pointer">
              <input type="file" class="d-none" accept="image/*" @change="handleAvatarUpload">
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
            <input v-model="profile.name" type="text" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="profile.email" type="email" class="form-control" required>
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