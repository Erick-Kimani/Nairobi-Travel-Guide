<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.js'
import { useSafarisStore } from '@/Store/Safaris'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const store     = useSafarisStore()
const authStore = useAuthStore()

const service    = computed(() => store.selectedSafari)
const currentUser = computed(() => authStore.user)

function goBack() {
  router.push('/safari')
}

const numericPrice = computed(() => {
  if (!service.value?.price) return 0
  const num = parseFloat(String(service.value.price).replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
})

async function handleVisit() {
  if (!service.value?.website) return
  try {
    await api.post('/track-click', {
      service_id:   service.value.id,
      service_name: service.value.name,
      name:         currentUser.value?.name ?? 'Guest',
    })
  } catch (error) {
    console.error('Service click tracking failed:', error)
  } finally {
    window.open(service.value.website, '_blank')
  }
}
</script>

<template>
  <v-main class="pa-0 ma-0 bg-white min-h-screen">
    <v-row no-gutters class="fill-height min-h-screen">

      <v-col cols="12" md="6" lg="5" class="relative overflow-hidden">
        <div class="full-page-inset">
          <v-img :src="service?.image" cover height="100vh" class="main-image">
            <v-btn icon="mdi-arrow-left" class="ma-6 floating-back-btn" elevation="4" @click="goBack" />
          </v-img>
        </div>
      </v-col>

      <v-col cols="12" md="6" lg="7" class="d-flex align-center bg-white">
        <v-container class="pa-10 pa-md-16">
          <div v-if="service" class="content-wrapper">
            <span class="text-overline text-blue font-weight-bold mb-2 d-block">Premium Apartment</span>
            <h1 class="text-h2 font-weight-black text-grey-darken-4 mb-6 leading-tight">{{ service.name }}</h1>
            <p class="text-h6 text-grey-darken-1 mb-8 leading-relaxed">{{ service.description }}</p>
            <v-divider class="mb-8" />
            <div class="mb-10">
              
            </div>
            <v-divider class="mb-8" />
            <div class="pt-6">
              <div class="text-caption text-grey-lighten-1 mb-2">OFFICIAL WEBSITE</div>
              <button v-if="service.website" @click="handleVisit" class="item-link" type="button">
                Visit Official Website
                <v-icon size="18" class="ml-2">mdi-open-in-new</v-icon>
              </button>
              <div v-else class="text-grey-lighten-1">Website not available</div>
            </div>
          </div>
          <v-alert v-else type="error" icon="mdi-alert-circle">
            Service data missing. Please return to the gallery.
          </v-alert>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
.min-h-screen { min-height: 100vh; }
.full-page-inset { height: 100vh; width: 100%; clip-path: ellipse(95% 100% at 0% 50%); background: #f0f0f0; }
.floating-back-btn { background: rgba(255,255,255,0.8) !important; backdrop-filter: blur(5px); }
.leading-tight { line-height: 1.1 !important; }
.leading-relaxed { line-height: 1.8; }
.item-link { display: inline-flex; align-items: center; font-size: 1.1rem; font-weight: 600; color: #1976d2; background: none; border: none; padding: 0; cursor: pointer; transition: all 0.3s ease; }
.item-link:hover { color: #0d47a1; text-decoration: underline; }
@media (max-width: 960px) {
  .full-page-inset { height: 40vh; clip-path: ellipse(100% 100% at 50% 0%); }
  .min-h-screen { min-height: auto; }
}
</style>