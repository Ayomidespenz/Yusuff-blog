<template>
  <DashboardLayout>
    <template #default>
      <div class="dashboard-posts">
        <!-- Header -->
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2">My Posts</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <router-link to="/dashboard/posts/new" class="btn btn-primary">
              New Post
            </router-link>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading posts...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-5">
          <div class="text-danger mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h5 class="text-danger">{{ error }}</h5>
          <button @click="loadPosts" class="btn btn-primary">Try Again</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="posts.length === 0" class="text-center py-5">
          <div class="text-muted mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h5 class="text-muted">No posts yet</h5>
          <p class="text-muted">Start writing your first post!</p>
          <router-link to="/dashboard/posts/new" class="btn btn-primary">
            Create Post
          </router-link>
        </div>

        <!-- Posts List -->
        <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="post in posts" :key="post.id" class="col">
            <div class="card h-100 border-0 shadow-sm" data-aos="fade-up">
              <!-- Featured Image -->
              <img
                :src="post.featured_image"
                class="card-img-top"
                alt="Featured Image"
                style="height: 200px; object-fit: cover;"
                @error="$event.target.src = '/placeholder.jpg'"
              />
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}sddddddd</h5>
                <p class="card-text text-muted">
                  {{
                    post.excerpt ||
                    (post.body.length > 100
                      ? post.body.slice(0, 100) + "..."
                      : post.body)
                  }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="badge bg-primary me-2">{{ post.status }}</span>
                    <span class="badge bg-secondary" v-if="post.category">{{
                      post.category
                    }}</span>
                  </div>
                  <small class="text-muted">{{
                    new Date(post.created_at).toLocaleDateString()
                  }}</small>
                </div>
              </div>
              <div class="card-footer bg-white border-0">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="stats">
                    <small class="me-3">
                      <i class="bi bi-eye"></i> {{ post.views_count || 0 }}
                    </small>
                    <small class="me-3">
                      <i class="bi bi-heart"></i> {{ post.likes_count || 0 }}
                    </small>
                    <small>
                      <i class="bi bi-chat"></i>
                      {{ post.comments_count || 0 }}
                    </small>
                  </div>
                  <div class="actions">
                    <router-link
                      :to="`/dashboard/posts/${post.id}/edit`"
                      class="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="deletePost(post.id)"
                      class="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { postsAPI } from "@/services/api";

export default {
  name: "DashboardPosts",
  components: {
    DashboardLayout,
  },
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    getImageUrl(imageUrl) {
      if (!imageUrl) return "/placeholder.jpg";
      return imageUrl.startsWith("http")
        ? imageUrl
        : `${process.env.VUE_APP_API_URL}/storage/${imageUrl}`;
    },

    async loadPosts() {
      this.loading = true;
      this.error = null;
      try {
        console.log("Fetching posts...");
        const response = await postsAPI.userPosts();
        console.log("Posts response:", response);
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to load posts");
        }
        this.posts = response.data.data;
      } catch (err) {
        console.error("Error loading posts:", err);
        this.error = err.message || "Failed to load posts";
      } finally {
        this.loading = false;
      }
    },

    async deletePost(postId) {
      if (
        !confirm(
          "Are you sure you want to delete this post? This action cannot be undone."
        )
      ) {
        return;
      }

      try {
        const response = await postsAPI.delete(postId);
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to delete post");
        }

        this.posts = this.posts.filter((post) => post.id !== postId);
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        alert(
          error.response?.data?.message ||
            "Failed to delete post. Please try again."
        );
      }
    },

    handlePostUpdate(event) {
      const { postId, post } = event.detail;
      const index = this.posts.findIndex((p) => p.id === postId);
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...post };
      }
    },
  },
  mounted() {
    console.log("DashboardPosts mounted, loading posts...");
    this.loadPosts();
    window.addEventListener("post-updated", this.handlePostUpdate);
  },
  unmounted() {
    window.removeEventListener("post-updated", this.handlePostUpdate);
  },
};
</script>

<style scoped>
/* your styles remain unchanged */
</style>
