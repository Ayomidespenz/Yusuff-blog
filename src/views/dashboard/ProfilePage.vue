<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

// Stores & router
const userStore = useUserStore();
const router = useRouter();

// Profile data
const profile = reactive({
  name: "John Doe",
  email: "john@example.com",
  avatar: "/default-avatar.png",
  bio: "Web developer with a love for Vue.js",
  location: "New York, USA",
  website: "https://example.com",
  socialLinks: {
    twitter: "https://twitter.com/username",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username"
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
const handleAvatarUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    profile.avatar = e.target.result;
  };
  reader.readAsDataURL(file);
  console.log("Avatar selected:", file.name);
};

// Update profile
const updateProfile = async () => {
  if (!profile.name.trim() || !profile.email.trim()) {
    alert("Name and Email are required.");
    return;
  }

  updatingProfile.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API
    alert("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile.");
  } finally {
    updatingProfile.value = false;
  }
};

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

  changingPassword.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API
    alert("Password changed successfully!");
    password.current = password.new = password.confirm = "";
  } catch (err) {
    console.error(err);
    alert("Failed to change password.");
  } finally {
    changingPassword.value = false;
  }
};

// Update social links
const updateSocialLinks = async () => {
  updatingSocialLinks.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API
    alert("Social links updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update social links.");
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