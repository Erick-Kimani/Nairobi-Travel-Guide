<script setup> 
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTransitsStore } from '@/Store/Transits'

const router = useRouter()
const store  = useTransitsStore()

const searchQuery = ref('')

// Fetch live data on mount
onMounted(() => {
  store.fetchTransits()
})

const filteredTransits = computed(() => {
  if (!searchQuery.value) return store.transits
  const query = searchQuery.value.toLowerCase()
  return store.transits.filter(
    transit =>
      transit.name.toLowerCase().includes(query) ||
      transit.description.toLowerCase().includes(query)
  )
})

function viewDetails(transit) {
  store.selectTransit(transit)
  router.push('/transitdetails')
}
</script>

<template>
  <div class="page-container">
    <div class="hero-header">
      <div class="hero-image-container">
        <img src="/images/Picture 29 .jpg" alt="Header Image" class="hero-image" />
        <div class="hero-overlay">
          <h1 class="text-center text-3xl font-bold text-primary title-glow">
        Nairobi transit hotels
          </h1>
        </div>
      </div>
    </div>

    <v-container class="py-10 content-body" fluid>
      <div class="search-wrapper mb-6 px-4">
        <v-text-field
          v-model="searchQuery"
          label="Search for a Transit..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          class="search-field"
        />
      </div>

      <!-- SEO Description Block -->
      <div class="seo-description px-4 mb-10">
        <p>
          Transit hotels are ideal for travelers with short layovers or early morning flights.
          Located close to major airports such as <strong>Jomo Kenyatta International Airport (JKIA)</strong>,
          these hotels provide convenient accommodation for passengers needing rest between flights.
          Most transit hotels offer flexible check-in times, <strong>airport shuttle services</strong>,
          and comfortable rooms designed for short stays — perfect for international travelers,
          business visitors, and tourists connecting to other destinations across Kenya.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="store.loading" class="text-center py-10">
        <v-progress-circular indeterminate color="orange" size="48" />
        <p class="text-grey-lighten-1 mt-4">Loading transit hotels…</p>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="text-center py-10">
        <p class="text-red-lighten-1">{{ store.error }}</p>
        <v-btn color="orange" class="mt-4" @click="store.fetchTransits()">Retry</v-btn>
      </div>

      <!-- Cards -->
      <v-row v-else class="px-4">
        <v-col
          v-for="(transit, index) in filteredTransits"
          :key="transit.id ?? index"
          cols="12"
          sm="6"
          md="4"
          class="pb-10"
        >
          <div class="card-border-wrapper">
            <v-card class="transit-card" elevation="0" @click="viewDetails(transit)">
              <div class="image-wrapper">
                <v-img :src="transit.image" height="230" cover />
              </div>

              <v-card-text class="pt-4">
                <h3 class="card-title">{{ transit.name }}:</h3>
              <br>
                <p class="description">{{ transit.description }}</p>
              </v-card-text>

              <v-card-actions class="px-4 pb-4 mt-auto">
                <v-btn
                  block
                  size="small"
                  color="orange"
                  variant="elevated"
                  class="details-btn"
                >
                  View Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <!-- Empty / no results -->
      <v-row v-if="!store.loading && filteredTransits.length === 0">
        <v-col cols="12" class="text-center">
          <p class="text-grey-lighten-1 mt-6">
            <template v-if="searchQuery">
              No transits found matching "<strong>{{ searchQuery }}</strong>"
            </template>
            <template v-else>
              No transit hotels are available right now.
            </template>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}

/* --- HERO SECTION --- */
.hero-header {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #000;
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: ellipse(160% 112% at 60% 0%);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- CONTENT BODY --- */
.content-body {
  position: relative;
  z-index: 2;
  background-color: #000;
}

.search-field {
  max-width: 350px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

/* --- SEO Description --- */
.seo-description {
  max-width: 860px;
  border-left: 3px solid #ff9800;
  padding-left: 16px;
}
.seo-description p {
  font-size: 0.97rem;
  color: #c8c8c8;
  line-height: 1.75;
}
.seo-description strong {
  color: #ff9800;
  font-weight: 600;
}

/* --- CARD BORDER --- */
.card-border-wrapper {
  position: relative;
  padding: 8px;
  border-radius: 68px;
  overflow: hidden;
  height: 100%;
  display: flex;
  transition: transform 0.3s ease;
}

.card-border-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/images/Picture 5 .jpg');
  background-size: cover;
  background-position: center;
  border-radius: 68px;
  z-index: 0;
}

.transit-card {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 60px !important;
  background: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(20px);
  cursor: pointer;
}

.card-border-wrapper:hover {
  transform: translateY(-10px);
}

.image-wrapper {
  overflow: hidden;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
}

.details-btn {
  min-height: 36px !important;
  padding: 6px 0 !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 69px;
}

/* --- TEXT --- */
.title-glow {
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}
.card-title    { font-size: 1.4rem; font-weight: 700; color: #ff9800; }
.description   { font-size: 0.95rem; color: #e0e0e0; }
.text-primary  { color: #ffd700 !important; font-size: 3.5rem !important; }
</style>