<template>
  <div class="faq-page">

    <!-- ══════════════════════════════════════════
         HERO BANNER WITH IMAGE
         ══════════════════════════════════════════ -->
    <section class="faq-hero">
      <div
        class="faq-hero__bg"
        style="background-image: url('public/images/FAQs .jpg');"
      />
      <div class="faq-hero__overlay" />

      <div class="faq-hero__content">
        <!-- Breadcrumb -->
        <nav class="faq-breadcrumb">
          <a href="/" class="faq-breadcrumb__link">Home</a>
          <span class="faq-breadcrumb__sep">›</span>
          <span class="faq-breadcrumb__current">FAQ</span>
        </nav>

        <div class="faq-hero__icon-wrap">
          <v-icon size="44" color="white">mdi-frequently-asked-questions</v-icon>
        </div>

        <h1 class="faq-hero__title">Frequently Asked Questions</h1>
        <p class="faq-hero__subtitle">
          Everything you need to know about booking hotels, safaris,<br class="d-none d-sm-inline" />
          airport transfers and exploring Kenya.
        </p>

        

        <!-- Stats strip -->
        <div class="faq-hero__stats">
          <div class="faq-stat">
            <span class="faq-stat__num">{{ faqs.length }}</span>
            <span class="faq-stat__label">Questions Answered</span>
          </div>
          <div class="faq-stat__divider" />
          <div class="faq-stat">
            <span class="faq-stat__num">24/7</span>
            <span class="faq-stat__label">Support Available</span>
          </div>
          <div class="faq-stat__divider" />
          <div class="faq-stat">
            <span class="faq-stat__num">100%</span>
            <span class="faq-stat__label">Verified Answers</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         MAIN CONTENT
         ══════════════════════════════════════════ -->
    <section class="faq-body">
      <v-container max-width="860" class="py-12">

        <!-- Loading -->
        <div v-if="loading" class="faq-state-center">
          <v-progress-circular indeterminate color="primary" size="52" width="4" class="mb-5" />
          <p class="text-body-1 text-grey">Fetching answers for you…</p>
        </div>

        <!-- Error -->
        <v-alert
          v-else-if="error"
          type="error"
          variant="tonal"
          rounded="xl"
          border="start"
          class="mb-6"
          prominent
        >
          <template #title>Unable to load FAQs</template>
          {{ error }}
        </v-alert>

        <!-- No Results -->
        <div v-else-if="filteredFaqs.length === 0" class="faq-state-center">
          <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-text-search</v-icon>
          <p class="text-h6 font-weight-medium mb-1 text-grey-darken-1">No results found</p>
          <p class="text-body-2 text-grey">
            {{ searchQuery
              ? `No FAQs match "${searchQuery}". Try different keywords.`
              : 'No FAQs have been published yet. Check back soon.' }}
          </p>
          <v-btn v-if="searchQuery" variant="text" color="primary" class="mt-3" @click="searchQuery = ''">
            Clear search
          </v-btn>
        </div>

        <template v-else>

          <!-- Result count when searching -->
          <p v-if="searchQuery" class="text-body-2 text-grey mb-5">
            Showing <strong>{{ filteredFaqs.length }}</strong>
            result{{ filteredFaqs.length !== 1 ? 's' : '' }} for
            "<strong>{{ searchQuery }}</strong>"
          </p>

          <!-- FAQ Accordion -->
          <v-expansion-panels v-model="openPanel" variant="accordion" class="faq-panels">
            <v-expansion-panel
              v-for="(faq, index) in filteredFaqs"
              :key="faq.id"
              :value="faq.id"
              class="faq-panel"
            >
              <!-- Question title -->
              <v-expansion-panel-title class="faq-panel__title">
                <div class="d-flex align-center ga-3 w-100">
                  <span class="faq-panel__num">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="faq-panel__question">{{ faq.query }}</span>
                </div>
              </v-expansion-panel-title>

              <!-- Answer body -->
              <v-expansion-panel-text class="faq-panel__body">
                <div class="faq-answer">
                  <v-icon color="success" size="18" class="faq-answer__icon">mdi-check-circle</v-icon>
                  <p class="faq-answer__text">{{ faq.answer }}</p>
                </div>

                <!-- Was this helpful? -->
                <div class="faq-feedback">
                  <span class="faq-feedback__label">Was this helpful?</span>
                  <v-btn
                    size="x-small" variant="tonal" rounded="pill"
                    prepend-icon="mdi-thumb-up-outline"
                    :color="helpfulMap[faq.id] === true ? 'success' : 'grey'"
                    class="mr-2"
                    @click="markHelpful(faq.id, true)"
                  >Yes</v-btn>
                  <v-btn
                    size="x-small" variant="tonal" rounded="pill"
                    prepend-icon="mdi-thumb-down-outline"
                    :color="helpfulMap[faq.id] === false ? 'error' : 'grey'"
                    @click="markHelpful(faq.id, false)"
                  >No</v-btn>
                  <span v-if="helpfulMap[faq.id] !== undefined" class="faq-feedback__thanks">
                    Thanks for your feedback!
                  </span>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

        </template>

        <!-- Contact CTA Card -->
        <div v-if="!loading && !error" class="faq-cta mt-14">
          <div class="faq-cta__left">
            <v-avatar color="primary" size="52" class="mb-4">
              <v-icon color="white" size="28">mdi-headset</v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-2">Still have questions?</h3>
            <p class="text-body-2 text-grey" style="max-width: 380px; line-height: 1.65;">
              Our Nairobi travel experts are available around the clock to assist you
              with bookings, itineraries, and anything in between.
            </p>
          </div>
          <div class="faq-cta__right">
            <v-btn
              color="primary" variant="elevated" rounded="pill" size="large"
              to="/contactus" prepend-icon="mdi-email-fast-outline"
              class="faq-cta__btn"
            >
              Send Us a Message
            </v-btn>
          </div>
        </div>

      </v-container>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const faqs        = ref([]);
const loading     = ref(false);
const error       = ref(null);
const searchQuery = ref('');
const openPanel   = ref(null);
const helpfulMap  = ref({});

const markHelpful = (id, value) => {
  helpfulMap.value = { ...helpfulMap.value, [id]: value };
};

// ✅ filteredFaqs works correctly with searchQuery
const filteredFaqs = computed(() => {
  if (!searchQuery.value?.trim()) return faqs.value;
  const q = searchQuery.value.toLowerCase();
  return faqs.value.filter(
    faq =>
      faq.query?.toLowerCase().includes(q) ||
      faq.answer?.toLowerCase().includes(q)
  );
});

const fetchFaqs = async () => {
  loading.value = true;
  error.value   = null;
  try {
    const res  = await api.get('/helpcenters');
    // ✅ FIX: Handle both possible key names from controller
    // index() returns { Helpcenter: [...] } (singular key, array value)
    const data = res.data.Helpcenter ?? res.data.Helpcenters ?? res.data ?? [];
    faqs.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Failed to fetch FAQs', err);
    error.value = 'Could not connect to the server. Please refresh and try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFaqs);
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  background: #f7f8fa;
}

/* ─── HERO ─────────────────────────────────── */
.faq-hero {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.faq-hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 40%;
  transform: scale(1.04);
  transition: transform 10s ease;
}
.faq-hero:hover .faq-hero__bg {
  transform: scale(1.09);
}

.faq-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    rgba(8, 38, 18, 0.82) 0%,
    rgba(15, 65, 30, 0.68) 55%,
    rgba(5, 25, 10, 0.85) 100%
  );
}

.faq-hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 64px 24px 52px;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
}

/* Breadcrumb */
.faq-breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 22px;
}
.faq-breadcrumb__link {
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.faq-breadcrumb__link:hover { color: #fff; }
.faq-breadcrumb__sep  { color: rgba(255,255,255,0.4); font-size: 0.78rem; }
.faq-breadcrumb__current {
  color: rgba(255,255,255,0.9);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Icon badge */
.faq-hero__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.22);
  margin-bottom: 22px;
  backdrop-filter: blur(8px);
}

.faq-hero__title {
  font-size: clamp(1.9rem, 4vw, 2.9rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 14px;
  text-shadow: 0 2px 16px rgba(0,0,0,0.35);
}

.faq-hero__subtitle {
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

/* Search inside hero */
.faq-hero__search-wrap {
  max-width: 580px;
  margin: 0 auto 36px;
}
.faq-hero__search-wrap :deep(.v-field) {
  box-shadow: 0 8px 36px rgba(0,0,0,0.28);
}

/* Stats strip */
.faq-hero__stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 12px;
}
.faq-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
}
.faq-stat__num {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}
.faq-stat__label {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 5px;
}
.faq-stat__divider {
  width: 1px;
  height: 38px;
  background: rgba(255,255,255,0.22);
}

/* ─── BODY ─────────────────────────────────── */
.faq-body { background: #f7f8fa; }

.faq-state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

/* ─── Accordion ─────────────────────────────── */
.faq-panels {
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0,0,0,0.07);
}

.faq-panel {
  background: #fff !important;
  border-bottom: 1px solid #eef0f3 !important;
  transition: background 0.18s;
}
.faq-panel:last-child { border-bottom: none !important; }
.faq-panel:hover { background: #fafbfc !important; }

.faq-panel__title {
  padding: 20px 24px !important;
  min-height: 66px !important;
}

.faq-panel__num {
  font-size: 0.68rem;
  font-weight: 800;
  color: #fff;
  background: #1a6b3c;
  border-radius: 6px;
  padding: 3px 8px;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.faq-panel__question {
  font-size: 0.97rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.5;
}

/* ─── Answer ─────────────────────────────────── */
.faq-panel__body :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 24px 24px !important;
}

.faq-answer {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #f0fdf4;
  border-left: 3px solid #22c55e;
  border-radius: 0 12px 12px 0;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.faq-answer__icon { flex-shrink: 0; margin-top: 2px; }

.faq-answer__text {
  font-size: 0.9rem;
  line-height: 1.78;
  color: #374151;
  white-space: pre-line;
  margin: 0;
}

/* ─── Helpful feedback ────────────────────────── */
.faq-feedback {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.faq-feedback__label { font-size: 0.77rem; color: #9ca3af; }
.faq-feedback__thanks { font-size: 0.77rem; color: #22c55e; font-style: italic; }

/* ─── CTA Card ───────────────────────────────── */
.faq-cta {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 28px rgba(0,0,0,0.07);
  padding: 44px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  border-top: 4px solid #1a6b3c;
}
.faq-cta__left  { flex: 1; min-width: 220px; }
.faq-cta__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  flex-shrink: 0;
}
.faq-cta__btn { min-width: 210px; }

/* ─── Responsive ─────────────────────────────── */
@media (max-width: 600px) {
  .faq-hero__content { padding: 52px 16px 38px; }
  .faq-stat { padding: 0 16px; }
  .faq-panel__title { padding: 16px !important; }
  .faq-cta { padding: 28px 20px; flex-direction: column; }
  .faq-cta__right { align-items: stretch; width: 100%; }
  .faq-cta__btn { min-width: unset; }
}
</style>