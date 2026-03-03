<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import '@/assets/home.css'

// 1. List your image paths here
const images = [
  "public/images/Picture 1 .jpg",
  "public/images/Picture 2 .jpg",
  "public/images/safari-land-cruiser-hire.png",
  "public/images/Picture 25 .jpg",
  "public/images/Picture 29 .jpg",
  "public/images/Picture 35 .jpg",
];

const currentIndex = ref(0);
let timer = null;

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
        elegance, and relaxation.
      </p>

      <div class="hero-actions">
        <router-link to="/choice" class="btn-primary">Explore</router-link>
        <router-link to="/vacation" class="btn-secondary">Vacation Hotels</router-link>
        <router-link to="/transit" class="btn-secondary">Transit Hotels</router-link>
        <router-link to="/airport" class="btn-secondary">Airport Transfers</router-link>
        <router-link to="/safari" class="btn-secondary">Tours & Safaris</router-link>
      </div>
    </div>
  </section>
</template>