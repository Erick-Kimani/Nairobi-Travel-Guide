<script setup>
import { ref } from 'vue'

const choices = ref([
  {
    id: 1,
    title: 'Vacation Hotels',
    description: 'Resorts and stays designed for relaxation and leisure.',
    link: '/vacation',
    image: '/images/Picture 25 .jpg'
  },
  {
    id: 2,
    title: 'Transit Hotels',
    description: 'Convenient stays near airports and major travel hubs.',
    link: '/transit'  ,
    image: '/images/Picture 26 .jpg'
  },
  
  {
    id: 3,
    title: 'Meeting Rooms',
    description: 'Professional spaces for corporate events and workshops.',
    link: '/meeting',
    image: '/images/Picture 28 .jpg'
  },
  {
    id: 4,
    title: 'Service Apartments',
    description: 'Fully furnished apartments for long-term stays.',
    link: '/service',
    image: '/images/Picture 29 .jpg'
  },
  {
    id: 5,
    title: 'Transportation Services/Guided Tours',
    description: 'Comfortable transit options and curated local experiences.',
    link: '/transport',
    image: '/images/Picture 30 .jpg'
  }
])
</script>

<template>
  <div class="choice-container">
    <header class="header">
      <h1>Select a Category</h1>
      <p>Choose the type of accommodation or space you are looking for.</p>
    </header>

    <div class="card-grid">
      <router-link
        v-for="item in choices"
        :key="item.id"
        :to="item.link"
        class="card-border-wrapper"
      >
        <div class="card">
          <!-- Card Image -->
          <img
            :src="item.image"
            alt="Category image"
            class="card-image"
          />

          <!-- Card Content -->
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="explore-btn">Explore →</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* =========================
   Page Layout
========================= */
.choice-container {
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.4rem;
  color: #2c3e50;
}

.header p {
  color: #666;
}

/* =========================
   Grid
========================= */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

/* =========================
   Card Border Wrapper
========================= */
.card-border-wrapper {
  background: url('public/images/Picture 5 .jpg') center / cover no-repeat;
  padding: 9px; /* thickness of decorative border */
  border-radius: 24px;
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.card-border-wrapper:hover {
  transform: translateY(-10px);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.3);
}

/* =========================
   Inner Card
========================= */
.card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  color: inherit;
}

/* =========================
   Card Image
========================= */
.card-image {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

/* =========================
   Card Content
========================= */
.card-content {
  padding: 22px;
}

.card-content h3 {
  margin-bottom: 10px;
  color: #2c3e50;
  font-size: 1.25rem;
}

.card-content p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 18px;
  line-height: 1.6;
}

.explore-btn {
  font-weight: 600;
  color: #42b883;
  font-size: 0.9rem;
}
</style>
