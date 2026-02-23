<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.js' 
import { useTransitsStore } from '@/Store/Transits'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const store = useTransitsStore()
const authStore = useAuthStore()

const transit = computed(() => store.selectedTransit)
const currentUser = computed(() => authStore.user)

function goBack() {
  router.push('/transits')
}

const numericPrice = computed(() => {
  if (!transit.value?.price) return 0
  const priceStr = String(transit.value.price)
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
})

// 🔵 Track click automatically + open website
async function handleVisit() {
  if (!transit.value?.website) return

  try {
    await api.post('/track-click', {  // ✅ Changed from axios to api, removed base URL
      service_id: transit.value.service_id ?? transit.value.id,
      service_name: transit.value.name,
      name: currentUser.value?.name ?? 'Guest',
    })
  } catch (error) {
    console.error('Transit click tracking failed:', error)
  } finally {
    // ✅ Navigation must ALWAYS happen
    window.open(transit.value.website, '_blank')
  }
}
</script>


<template>
  <v-main class="pa-0 ma-0 bg-white min-h-screen">
    <v-row no-gutters class="fill-height min-h-screen">

      <!-- IMAGE SECTION -->
      <v-col cols="12" md="6" lg="5" class="relative overflow-hidden">
        <div class="full-page-inset">
          <v-img 
            :src="transit?.image" 
            cover
            height="100vh"
            class="main-image"
          >
            <v-btn
              icon="mdi-arrow-left"
              class="ma-6 floating-back-btn"
              elevation="4"
              @click="goBack"
            />
          </v-img>
        </div>
      </v-col>

      <!-- CONTENT SECTION -->
      <v-col cols="12" md="6" lg="7" class="d-flex align-center bg-white">
        <v-container class="pa-10 pa-md-16">
          <div v-if="transit" class="content-wrapper">

            <span class="text-overline text-blue font-weight-bold mb-2 d-block">
              Premium Stay
            </span>

            <h1 class="text-h2 font-weight-black text-grey-darken-4 mb-6 leading-tight">
              {{ transit.name }}
            </h1>

            <p class="text-h6 text-grey-darken-1 mb-8 leading-relaxed">
              {{ transit.description }}
            </p>

            <v-divider class="mb-8" />


            <v-divider class="mb-8" />

            <!-- OFFICIAL WEBSITE -->
            <div class="pt-6">
              <div class="text-caption text-grey-lighten-1 mb-2">
                OFFICIAL WEBSITE
              </div>

              <button
                v-if="transit.website"
                @click="handleVisit"
                class="transit-link"
                type="button"
              >
                Visit Official Website
                <v-icon size="18" class="ml-2">mdi-open-in-new</v-icon>
              </button>

              <div v-else class="text-grey-lighten-1">
                Website not available
              </div>
            </div>

          </div>

          <v-alert v-else type="error" icon="mdi-alert-circle">
            Transit data missing. Please return to the gallery.
          </v-alert>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

/* CURVED IMAGE EDGE */
.full-page-inset {
  height: 100vh;
  width: 100%;
  clip-path: ellipse(95% 100% at 0% 50%);
  background: #f0f0f0;
}

.floating-back-btn {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(5px);
}

.leading-tight {
  line-height: 1.1 !important;
}

.leading-relaxed {
  line-height: 1.8;
}

/* WEBSITE BUTTON */
.transit-link {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1976d2;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.transit-link:hover {
  color: #0d47a1;
  text-decoration: underline;
}

/* MOBILE */
@media (max-width: 960px) {
  .full-page-inset {
    height: 40vh;
    clip-path: ellipse(100% 100% at 50% 0%);
  }

  .min-h-screen {
    min-height: auto;
  }
}
</style>
