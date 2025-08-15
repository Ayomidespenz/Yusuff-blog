<template>
  <div :class="cardClasses" data-aos="fade-up" data-aos-delay="300">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  computed: {
    cardClasses() {
      return `card shadow-lg border-0 ${this.class}`.trim()
    }
  }
}
</script>

<style scoped>
.card {
  transition: all 0.4s ease;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.card:hover::before {
  transform: scaleX(1);
}
</style> 