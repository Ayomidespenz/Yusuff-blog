<template>
  <span :class="badgeClasses" data-aos="fade-in" data-aos-delay="200">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(value)
    }
  },
  computed: {
    badgeClasses() {
      return `badge bg-${this.variant} rounded-pill`
    }
  }
}
</script>

<style scoped>
.badge {
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0.5em 1em;
}

.badge:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.badge.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.badge.bg-secondary {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important;
}

.badge.bg-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
}

.badge.bg-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%) !important;
  color: #212529 !important;
}
</style> 