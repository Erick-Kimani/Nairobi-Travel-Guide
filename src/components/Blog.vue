<template>
  <div class="blog-page">
    <!-- Hero Header -->
    <section class="blog-hero">
      <div class="hero-texture"></div>
      <div class="hero-content">
        <span class="hero-eyebrow">Our Journal</span>
        <h1 class="hero-title">Stories &amp; Insights</h1>
        <p class="hero-catchphrase">
          <span class="catch-line">Where Every Journey</span>
          <span class="catch-accent">Becomes a Story Worth Telling.</span>
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
                <div class="image-overlay-badge">{{ getCategoryLabel(index) }}</div>
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

const blogs   = ref([])
const loading = ref(false)

const categoryLabels = ['Culture', 'Travel', 'Lifestyle', 'Business', 'Innovation', 'Nature']

const getCategoryLabel = (index) => categoryLabels[index % categoryLabels.length]

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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

/* ─── Variables ─────────────────────────────────────────────── */
:root {
  --cream: #FAF7F2;
  --ink: #1A1612;
  --gold: #C9A96E;
  --gold-light: #E8D5B0;
  --warm-grey: #8C8075;
  --card-bg: #FFFFFF;
  --border: #E8E2D9;
}

/* ─── Page ─────────────────────────────────────────────────── */
.blog-page {
  min-height: 100vh;
  background: var(--cream);
  font-family: 'Jost', sans-serif;
  color: var(--ink);
}

/* ─── Hero ─────────────────────────────────────────────────── */
.blog-hero {
  position: relative;
  background: var(--ink);
  padding: 100px 40px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-texture {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,169,110,0.06) 39px, rgba(201,169,110,0.06) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,169,110,0.06) 39px, rgba(201,169,110,0.06) 40px);
  pointer-events: none;
}

.hero-content { position: relative; z-index: 1; }

.hero-eyebrow {
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(52px, 8vw, 96px);
  line-height: 1;
  color: #ecb350;
  margin: 0 0 16px;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-weight: 300;
  font-size: 16px;
  color: rgba(26, 22, 17, 0.55);
  letter-spacing: 1px;
  margin: 0 0 36px;
}

.hero-catchphrase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin: 0 0 28px;
}

.catch-line {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-style: italic;
  font-size: clamp(22px, 3.5vw, 36px);
  color: rgba(180, 83, 18, 0.85);
  letter-spacing: 1px;
  line-height: 1.2;
}

.catch-accent {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-style: italic;
  font-size: clamp(26px, 4vw, 42px);
  background: linear-gradient(90deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  line-height: 1.25;
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.hero-divider span:not(.diamond) {
  width: 60px;
  height: 1px;
  background: var(--gold);
  opacity: 0.5;
}
.diamond { color: var(--gold); font-size: 10px; }

/* ─── Blog Section ──────────────────────────────────────────── */
.blog-section { padding: 80px 0 120px; }

.blog-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px;
  
}

/* ─── Empty / Loading ───────────────────────────────────────── */
.empty-state, .loading-state {
  text-align: center;
  padding: 100px 20px;
  color: var(--warm-grey);
}
.empty-icon { margin-bottom: 24px; opacity: 0.6; }
.empty-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 12px;
}
.empty-desc { font-size: 15px; font-weight: 300; margin: 0; }

.loader-ring {
  width: 44px;
  height: 44px;
  border: 2px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Blog Entry ────────────────────────────────────────────── */
.blog-entry { margin-bottom: 20px; }

/* ─── Title Row (always centered) ──────────────────────────── */
.entry-title-row {
  text-align: center;
  position: relative;
  padding: 0 0 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry-index {
  font-family: 'Cormorant Garamond', serif;
  font-size: 13px;
  font-weight: 300;
  color: var(--gold);
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.entry-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(28px, 4vw, 44px);
  color: var(--ink);
  margin: 0 0 20px;
  line-height: 1.15;
  max-width: 700px;
}

.entry-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
}

/* ─── Entry Body (alternating) ──────────────────────────────── */
.entry-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

/* Image LEFT (even) — image col first */
.entry--image-left .entry-image-wrap { order: 1; }
.entry--image-left .entry-desc-wrap  { order: 2; }

/* Image RIGHT (odd) — desc col first, image second */
.entry--image-right .entry-image-wrap { order: 2; }
.entry--image-right .entry-desc-wrap  { order: 1; }

/* ─── Image Card ────────────────────────────────────────────── */
.entry-image-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 20px 60px rgba(26,22,18,0.12);
  background: var(--border);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.entry-image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 80px rgba(26,22,18,0.18);
}

.entry-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}
.entry-image-card:hover .entry-image { transform: scale(1.03); }

.entry-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--warm-grey);
  font-size: 12px;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #F5F0E8 0%, #EDE5D6 100%);
}

.image-overlay-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(26,22,18,0.75);
  color: var(--gold-light);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
}

/* ─── Description Card ─────────────────────────────────────── */
.entry-desc-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 40px 44px;
  position: relative;
  box-shadow: 0 4px 24px rgba(26,22,18,0.05);
}

.desc-ornament {
  color: var(--gold);
  font-size: 18px;
  margin-bottom: 20px;
  display: block;
  opacity: 0.7;
}

.entry-description {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.75;
  color: #3D3530;
  margin: 0 0 28px;
}

.desc-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  color: var(--warm-grey);
  letter-spacing: 0.5px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}
.desc-dot { color: var(--gold); }

/* ─── Separator ─────────────────────────────────────────────── */
.entry-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 0 50px;
}
.entry-separator span:not(.sep-diamond) {
  flex: 1;
  max-width: 200px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border));
}
.entry--image-right + .blog-entry .entry-separator span:not(.sep-diamond):first-child {
  background: linear-gradient(to left, transparent, var(--border));
}
.sep-diamond {
  color: var(--gold);
  font-size: 11px;
  opacity: 0.7;
}

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .blog-hero { padding: 70px 24px 60px; }

  .entry-body {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .entry--image-left .entry-image-wrap,
  .entry--image-right .entry-image-wrap { order: 1; }
  .entry--image-left .entry-desc-wrap,
  .entry--image-right .entry-desc-wrap  { order: 2; }

  .entry-desc-card { padding: 28px 24px; }
  .blog-container { padding: 0 20px; }
  .blog-section { padding: 60px 0 80px; }
}
</style>