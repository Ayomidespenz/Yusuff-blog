<template>
  <div class="min-h-screen bg-light">
    <dashboard-navbar />
    <div class="container-fluid">
      <div class="row">
        <dashboard-sidebar />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from './dashboard-navbar.vue'
import DashboardSidebar from './dashboard-sidebar.vue'

export default {
  name: 'DashboardLayout',
  components: {
    DashboardNavbar,
    DashboardSidebar
  }
}
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}
</style>
