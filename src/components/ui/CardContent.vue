<template>
  <div :class="contentClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  computed: {
    contentClasses() {
      return `card-body ${this.class}`.trim()
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 2rem;
  position: relative;
}

.card-body::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.card:hover .card-body::after {
  width: 80%;
}
</style> 