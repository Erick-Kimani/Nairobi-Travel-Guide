<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTransportsStore } from '@/Store/Transports'

const router = useRouter()
const store  = useTransportsStore()

const searchQuery = ref('')

onMounted(() => {
  store.fetchTransports()
})

const filteredTransports = computed(() => {
  if (!searchQuery.value) return store.transports
  const query = searchQuery.value.toLowerCase()
  return store.transports.filter(
    t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  )
})

function viewDetails(transport) {
  store.selectTransport(transport)
  router.push('/transportdetails')
}
</script>

<template>
  <div class="page-container">
    <div class="hero-header">
      <div class="hero-image-container">
        <img src="/images/Picture 30 .jpg" alt="Header Image" class="hero-image" />
        <div class="hero-overlay">
          <h1 class="text-center text-3xl font-bold text-primary title-glow">
            Transportation & Guided Tours
          </h1>
        </div>
      </div>
    </div>

    <v-container class="py-10 content-body" fluid>
      <div class="search-wrapper mb-10 px-4">
        <v-text-field
          v-model="searchQuery"
          label="Search for a Transport or Tour..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          class="search-field"
        />
      </div>

      <div v-if="store.loading" class="text-center py-10">
        <v-progress-circular indeterminate color="orange" size="48" />
        <p class="text-grey-lighten-1 mt-4">Loading transport services…</p>
      </div>

      <div v-else-if="store.error" class="text-center py-10">
        <p class="text-red-lighten-1">{{ store.error }}</p>
        <v-btn color="orange" class="mt-4" @click="store.fetchTransports()">Retry</v-btn>
      </div>

      <v-row v-else class="px-4">
        <v-col
          v-for="(transport, index) in filteredTransports"
          :key="transport.id ?? index"
          cols="12" sm="6" md="4"
          class="pb-10"
        >
          <div class="card-border-wrapper">
            <v-card class="item-card" elevation="0" @click="viewDetails(transport)">
              <div class="image-wrapper">
                <v-img :src="transport.image" height="200" cover />
              </div>
              <v-card-text class="pt-4">
                <h3 class="card-title">{{ transport.name }}</h3>
                <p class="description">{{ transport.description }}</p>
              </v-card-text>
              <v-card-actions class="px-4 pb-4 mt-auto">
                <v-btn block size="small" color="orange" variant="elevated" class="details-btn">
                  View Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="!store.loading && filteredTransports.length === 0">
        <v-col cols="12" class="text-center">
          <p class="text-grey-lighten-1 mt-6">
            <template v-if="searchQuery">
              No transport services found matching "<strong>{{ searchQuery }}</strong>"
            </template>
            <template v-else>No transport services are available right now.</template>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.page-container { min-height: 100vh; background-color: #000; color: #fff; }
.hero-header { position: relative; width: 100%; height: 300px; background-color: #000; }
.hero-image-container { position: relative; width: 100%; height: 100%; clip-path: ellipse(160% 112% at 60% 0%); overflow: hidden; }
.hero-image { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)); display: flex; align-items: center; justify-content: center; }
.content-body { position: relative; z-index: 2; background-color: #000; }
.search-field { max-width: 350px; background: rgba(255,255,255,0.05); border-radius: 8px; }
.card-border-wrapper { position: relative; padding: 8px; border-radius: 68px; overflow: hidden; height: 100%; display: flex; transition: transform 0.3s ease; }
.card-border-wrapper::before { content: ""; position: absolute; inset: 0; background-image: url('/images/Picture 5 .jpg'); background-size: cover; background-position: center; border-radius: 68px; z-index: 0; }
.card-border-wrapper:hover { transform: translateY(-10px); }
.item-card { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; border-radius: 60px !important; background: rgba(30,30,30,0.95) !important; backdrop-filter: blur(20px); cursor: pointer; }
.image-wrapper { overflow: hidden; border-top-left-radius: 60px; border-top-right-radius: 60px; }
.details-btn { min-height: 36px !important; padding: 6px 0 !important; font-weight: 600; letter-spacing: 0.5px; border-radius: 69px; }
.title-glow { text-shadow: 0 0 15px rgba(255,215,0,0.4); }
.card-title { font-size: 1.4rem; font-weight: 700; color: #ff9800; }
.description { font-size: 0.95rem; color: #e0e0e0; }
.text-primary { color: #ffd700 !important; font-size: 3.5rem !important; }
</style>