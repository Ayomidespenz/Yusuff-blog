<template>
  <div class="min-vh-100 bg-light">
    <!-- Header -->
    <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" data-aos="fade-down">
      <div class="container">
        <div class="navbar-brand d-flex align-items-center">
          <div class="bg-primary rounded-3 p-2 me-2">
            <Edit3Icon class="text-white" style="width: 20px; height: 20px;" />
          </div>
          <span class="h4 mb-0 fw-bold text-primary">Mishary-Hub</span>
        </div>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <nav class="navbar-nav ms-auto me-4">
            <router-link to="/blog" class="nav-link fw-medium">Explore</router-link>
            <a href="#features" class="nav-link fw-medium">Features</a>
            <a href="#pricing" class="nav-link fw-medium">Pricing</a>
          </nav>
          <div class="d-flex gap-2">
            <template v-if="!authUser">
              <Button variant="outline-primary" size="sm">
                <router-link to="/auth/login" class="text-decoration-none">Sign In</router-link>
              </Button>
              <Button size="sm">
                <router-link to="/auth/register" class="text-decoration-none text-white">Get Started</router-link>
              </Button>
            </template>
            <template v-else>
              <Button variant="primary" size="sm">
                <router-link to="/dashboard" class="text-decoration-none text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  My Dashboard
                </router-link>
              </Button>
              <span class="nav-link fw-medium">Welcome, {{ authUser.name }}!</span>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-5 py-lg-5 px-3">
      <div class="container text-center">
        <div data-aos="fade-up" data-aos-delay="100">
          <Badge variant="warning" class="mb-4 fs-6">
          
          </Badge>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <h1 class="display-3 fw-bold mb-4 text-gradient">
            Create Amazing Stories
            <br />
            <span class="text-primary">Share Your Voice</span>
          </h1>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="300">
          <p class="lead text-muted mb-5 mx-auto" style="max-width: 600px;">
            Mishary-Hub is the modern blogging platform that helps writers create, publish, and grow their audience with
            powerful tools and beautiful design.
          </p>
        </div>
        
        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5" data-aos="fade-up" data-aos-delay="400">
          <Button size="lg" class="px-5 py-3">
            <router-link to="/auth/register" class="text-decoration-none text-white">
              Start Writing Today
              <ArrowRightIcon class="ms-2" style="width: 20px; height: 20px;" />
            </router-link>
          </Button>
          <Button variant="outline-primary" size="lg" class="px-5 py-3">
            <router-link to="/blog" class="text-decoration-none">Explore Stories</router-link>
          </Button>
        </div>

        <!-- Hero Image/Demo -->
        <div class="mx-auto" style="max-width: 800px;" data-aos="zoom-in" data-aos-delay="500">
          <div class="bg-gradient-primary rounded-4 p-4 border">
            <div class="bg-white rounded-3 shadow-lg overflow-hidden">
              <div class="bg-light p-3 border-bottom d-flex align-items-center">
                <div class="bg-danger rounded-circle me-2" style="width: 12px; height: 12px;"></div>
                <div class="bg-warning rounded-circle me-2" style="width: 12px; height: 12px;"></div>
                <div class="bg-success rounded-circle me-2" style="width: 12px; height: 12px;"></div>
                <span class="text-muted small ms-3">Mishary-Hub Editor</span>
              </div>
              <div class="p-4 text-start">
                <h3 class="h4 fw-bold mb-3">The Future of Web Development</h3>
                <p class="text-muted mb-3">
                  Discover how modern frameworks are reshaping the way we build applications...
                </p>
                <div class="d-flex align-items-center gap-4 text-muted small">
                  <span class="d-flex align-items-center">
                    <HeartIcon class="me-1" style="width: 16px; height: 16px;" /> 234
                  </span>
                  <span class="d-flex align-items-center">
                    <MessageSquareIcon class="me-1" style="width: 16px; height: 16px;" /> 45
                  </span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5 py-lg-5 px-3 bg-light">
      <div class="container">
        <div class="text-center mb-5" data-aos="fade-up">
          <h2 class="display-5 fw-bold mb-4">Everything You Need to Blog</h2>
          <p class="lead text-muted mx-auto" style="max-width: 600px;">
            Powerful features designed to help you create, manage, and grow your blog with ease.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <Edit3Icon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Rich Text Editor</h3>
                <p class="text-muted mb-0">
                  Write with a beautiful, distraction-free editor that supports markdown, media, and formatting.
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <BarChart3Icon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Analytics Dashboard</h3>
                <p class="text-muted mb-0">
                  Track your blog's performance with detailed analytics and engagement metrics.
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <UsersIcon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Community Features</h3>
                <p class="text-muted mb-0">
                  Build your audience with comments, likes, and social sharing capabilities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <ZapIcon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Lightning Fast</h3>
                <p class="text-muted mb-0">
                  Built on modern technology for blazing fast loading times and smooth performance.
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="500">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <ShieldIcon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Secure & Reliable</h3>
                <p class="text-muted mb-0">
                  Your content is safe with enterprise-grade security and automatic backups.
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="600">
            <Card>
              <CardContent>
                <div class="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-inline-block">
                  <GlobeIcon class="text-primary" style="width: 24px; height: 24px;" />
                </div>
                <h3 class="h5 fw-semibold mb-2">Global Reach</h3>
                <p class="text-muted mb-0">
                  Reach readers worldwide with SEO optimization and social media integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 py-lg-5 px-3">
      <div class="container text-center">
        <div data-aos="fade-up">
          <h2 class="display-5 fw-bold mb-4">Ready to Start Your Blog?</h2>
          <p class="lead text-muted mb-5">
            Join thousands of writers who trust Mishary-Hub to share their stories with the world.
          </p>
        </div>
        
        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center" data-aos="fade-up" data-aos-delay="100">
          <Button size="lg" class="px-5 py-3">
            <router-link to="/auth/register" class="text-decoration-none text-white">
              Create Your Blog
              <ArrowRightIcon class="ms-2" style="width: 20px; height: 20px;" />
            </router-link>
          </Button>
          <Button variant="outline-primary" size="lg" class="px-5 py-3">
            <router-link to="/blog" class="text-decoration-none">Read Stories</router-link>
          </Button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-top bg-light py-5 px-3">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-primary rounded-3 p-2 me-2">
                <Edit3Icon class="text-white" style="width: 20px; height: 20px;" />
              </div>
              <span class="h5 mb-0 fw-bold text-primary">Mishary-Hub</span>
            </div>
            <p class="text-muted">The modern blogging platform for creators and storytellers.</p>
          </div>
          
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <h5 class="fw-semibold mb-3">Product</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="#features" class="text-muted text-decoration-none hover-primary">Features</a>
              </li>
              <li class="mb-2">
                <a href="#pricing" class="text-muted text-decoration-none hover-primary">Pricing</a>
              </li>
              <li class="mb-2">
                <router-link to="/blog" class="text-muted text-decoration-none hover-primary">Blog</router-link>
              </li>
            </ul>
          </div>
          
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <h5 class="fw-semibold mb-3">Support</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Help Center</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Contact</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Community</a>
              </li>
            </ul>
          </div>
          
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <h5 class="fw-semibold mb-3">Legal</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Privacy</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Terms</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-muted text-decoration-none hover-primary">Security</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-top mt-4 pt-4 text-center text-muted">
          <p class="mb-0">&copy; 2025 Mishary-Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import { 
  Edit3Icon, 
  ArrowRightIcon, 
  HeartIcon, 
  MessageSquareIcon, 
  BarChart3Icon, 
  UsersIcon, 
  ZapIcon, 
  ShieldIcon, 
  GlobeIcon 
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'

export default {
  name: 'HomePage',
  components: {
    Edit3Icon,
    ArrowRightIcon,
    HeartIcon,
    MessageSquareIcon,
    BarChart3Icon,
    UsersIcon,
    ZapIcon,
    ShieldIcon,
    GlobeIcon,
    Button,
    Badge,
    Card,
    CardContent
  },
  setup() {
    const { user: authUser } = useAuth()
    return {
      authUser
    }
  }
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.hover-primary:hover {
  color: #667eea !important;
  transition: color 0.3s ease;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.card:hover {
  animation: float 2s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-3 {
    font-size: 2.5rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
}
</style> 