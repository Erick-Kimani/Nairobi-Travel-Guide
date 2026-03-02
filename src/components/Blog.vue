<template>
  <div class="blog-page">
    <!-- Hero Header -->
    <section class="blog-hero">
      <div class="hero-texture"></div>
      <div class="hero-content">
        <span class="hero-eyebrow">Our Journal</span>
        <h1 class="hero-title">Stories &amp; Insights</h1>
        <p class="hero-catchphrase">
          <!-- <span class="catch-line">Where Every Journey</span>
          <span class="catch-accent">Becomes a Story Worth Telling.</span> -->
        </p>
        <p class="hero-subtitle">Explore our latest articles, updates and perspectives</p>
        <div class="hero-divider">
          <span></span><span class="diamond">◆</span><span></span>
        </div>
      </div>
    </section>
    

    <!-- Blog Entries -->
    <section class="blog-section">
      <div class="blog-container">

        <!-- Empty State -->
        <div v-if="!loading && blogs.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="12" width="48" height="40" rx="4" stroke="#C9A96E" stroke-width="2" stroke-dasharray="4 3"/>
              <line x1="18" y1="24" x2="46" y2="24" stroke="#C9A96E" stroke-width="2"/>
              <line x1="18" y1="32" x2="46" y2="32" stroke="#C9A96E" stroke-width="2"/>
              <line x1="18" y1="40" x2="36" y2="40" stroke="#C9A96E" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="empty-title">No Posts Yet</h3>
          <p class="empty-desc">Stories are being crafted. Check back soon.</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loader-ring"></div>
          <p>Loading stories…</p>
        </div>

        <!-- Blog Cards with Alternating Layout -->
        <article
          v-for="(blog, index) in blogs"
          :key="blog.id"
          class="blog-entry"
          :class="index % 2 === 0 ? 'entry--image-left' : 'entry--image-right'"
        >
          <!-- Title always centered above -->
          <div class="entry-title-row">
            <div class="entry-index">{{ String(index + 1).padStart(2, '0') }}</div>
            <h2 class="entry-title">{{ blog.blog_name }}</h2>
            <div class="entry-line"></div>
          </div>

          <!-- Content: image + description swap sides -->
          <div class="entry-body">
            <!-- Image Card -->
            <div class="entry-image-wrap">
              <div class="entry-image-card">
                <img
                  v-if="blog.blog_image"
                  :src="`http://127.0.0.1:8000/storage/${blog.blog_image}`"
                  :alt="blog.blog_name"
                  class="entry-image"
                />
                <div v-else class="entry-image-placeholder">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="8" width="40" height="32" rx="3" stroke="#C9A96E" stroke-width="1.5"/>
                    <circle cx="16" cy="20" r="4" stroke="#C9A96E" stroke-width="1.5"/>
                    <path d="M4 34L14 24L22 32L30 22L44 34" stroke="#C9A96E" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                  <span>No Image</span>
                </div>
              </div>
            </div>

            <!-- Description Card -->
            <div class="entry-desc-wrap">
              <div class="entry-desc-card">
                <div class="desc-ornament">✦</div>
                <p class="entry-description">{{ blog.blog_description }}</p>
                <div class="desc-meta">
                  <span class="desc-date">{{ formatDate(blog.created_at) }}</span>
                  <span class="desc-dot">·</span>
                  <span class="desc-read">{{ readTime(blog.blog_description) }} min read</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Separator -->
          <div class="entry-separator" v-if="index < blogs.length - 1">
            <span></span><span class="sep-diamond">◇</span><span></span>
          </div>
        </article>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import '@/assets/blog.css'

const blogs   = ref([])
const loading = ref(false)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

const readTime = (text) => {
  if (!text) return 1
  return Math.max(1, Math.ceil(text.split(' ').length / 200))
}

const fetchBlogs = async () => {
  loading.value = true
  try {
    const res = await api.get('/blogs')
    blogs.value = res.data.Blog || res.data || []
  } catch (err) {
    console.error('Failed to fetch blogs', err)
    blogs.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchBlogs)
</script>