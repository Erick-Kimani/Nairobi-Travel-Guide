<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 1. List your image paths here
const images = [
  "public/images/Picture 1 .jpg",
  "public/images/Picture 2 .jpg",
  "public/images/4 wheel drive.jpg",
  "public/images/Picture 25 .jpg",
  "public/images/Picture 29 .jpg",
  "public/images/Picture 35 .jpg",
  
];

const currentIndex = ref(0);
let timer = null; // Initialize timer variable

// 2. Function to cycle the index
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// 3. Start the timer when the component loads
onMounted(() => {
  timer = setInterval(nextImage, 4000); // 4000ms = 4 seconds
});

// 4. Clean up the timer when the component is destroyed
onUnmounted(() => {
  clearInterval(timer);
});

// 5. Create a reactive style object
const backgroundStyle = computed(() => ({
  backgroundImage: `url('${images[currentIndex.value]}')`
}));
</script>




<template>
  <section class="home-hero" :style="backgroundStyle">
    <div class="overlay"></div>

    <div class="hero-content">
      <h1>Luxury Stays, Unforgettable Experiences</h1>
      <p>
        Discover premium hotels, resorts, and lodges tailored for comfort,
        elegance, and relaxatio
      </p>

      <div class="hero-actions">
        <router-link to="/choice" class="btn-primary">Explore</router-link>
        <router-link to="/vacation" class="btn-secondary">Vacation Hotel</router-link>
        <router-link to="/transit" class="btn-secondary">Transit Lodges</router-link>
        <router-link to="/safari" class="btn-secondary">Tours & Safaris</router-link>
        <router-link to="/airport" class="btn-secondary">Airport Transfers</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  height: 100vh; 
  width: 100%;
  
  /* background-image is now handled by :style in the template */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Added transition for a smooth fade effect between images */
  transition: background-image 0.8s ease-in-out;
  
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

/* ... (rest of your existing CSS remains the same) ... */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  text-align: center;
  max-width: 800px;
  padding: 20px;
  color: #ffffff;
  z-index: 2;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-content p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 32px;
  color: #e5e7eb;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #d4af37;
  color: #1a3a34;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background-color: #e6c75a;
}

.btn-secondary {
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #ffffff;
  color: #1a3a34;
}

@media (max-width: 768px) {
  .hero-content h1 { font-size: 2.2rem; }
  .hero-content p { font-size: 1rem; }
}
</style>