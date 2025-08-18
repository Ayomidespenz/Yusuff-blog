    <template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title">Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Comments List -->
          <div class="comments-list mb-4">
            <div v-if="comments.length === 0" class="text-center text-muted py-4">
              <p>No comments yet. Be the first to comment!</p>
            </div>
            <div v-else v-for="comment in comments" :key="comment.id" class="comment-item mb-3">
              <div class="d-flex">
                <img 
                  :src="comment.author?.avatar || '/placeholder-user.jpg'" 
                  class="rounded-circle me-2" 
                  width="40" 
                  height="40" 
                  :alt="comment.author?.name"
                >
                <div class="flex-grow-1">
                  <div class="bg-light rounded-3 p-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <h6 class="mb-0">{{ comment.author?.name }}</h6>
                      <small class="text-muted">{{ comment.date || 'Just now' }}</small>
                    </div>
                    <p class="mb-0">{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- New Comment Form -->
          <div v-if="authUser" class="new-comment">
            <div class="d-flex mb-3">
              <img :src="authUser.avatar || '/placeholder-user.jpg'" class="rounded-circle me-2" width="40" height="40" :alt="authUser.name">
              <div class="flex-grow-1">
                <textarea 
                  v-model="newComment" 
                  class="form-control" 
                  rows="2" 
                  placeholder="Write a comment..."
                ></textarea>
              </div>
            </div>
            <div class="text-end">
              <button 
                class="btn btn-primary" 
                :disabled="!newComment.trim()" 
                @click="submitComment"
              >
                Post Comment
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-3">
            <p class="mb-2">Please sign in to comment</p>
            <router-link to="/auth/login" class="btn btn-primary">Sign In</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CommentModal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    postId: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newComment: ''
    }
  },
  setup() {
    const { user } = useAuth()
    return {
      authUser: user
    }
  },
  methods: {
    async submitComment() {
      if (!this.newComment.trim()) return

      try {
        const commentContent = this.newComment.trim()
        this.$emit('add-comment', commentContent)
        this.newComment = ''
      } catch (error) {
        console.error('Error submitting comment:', error)
      }
    }
  }
}
</script>

<style scoped>
.comment-item:last-child {
  margin-bottom: 0 !important;
}

.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

/* Prevent modal shaking */
.modal-dialog {
  transform: none !important;
  transition: opacity 0.15s linear !important;
}

.modal.fade .modal-dialog {
  transition: opacity 0.15s linear !important;
  transform: none !important;
}

.modal.show .modal-dialog {
  transform: none !important;
}
</style>
