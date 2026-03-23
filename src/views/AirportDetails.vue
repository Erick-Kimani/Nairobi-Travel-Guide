<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.js'
import { useTransfersStore } from '@/Store/Transfers'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const store     = useTransfersStore()
const authStore = useAuthStore()

const transfer    = computed(() => store.selectedTransfer)
const currentUser = computed(() => authStore.user)

function goBack() {
  router.push('/airport')
}

const numericPrice = computed(() => {
  if (!transfer.value?.price) return 0
  const num = parseFloat(String(transfer.value.price).replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
})

async function handleVisit() {
  if (!transfer.value?.website) return
  try {
    await api.post('/track-click', {
      service_id:   transfer.value.id,
      service_name: transfer.value.name,
      name:         currentUser.value?.name ?? 'Guest',
    })
  } catch (error) {
    console.error('Transfer click tracking failed:', error)
  } finally {
    window.open(transfer.value.website, '_blank')
  }
}
</script>

<template>
  <div class="detail-root">

    <!-- ░░░ HERO ░░░ -->
    <div class="hero">

      <v-img
        :src="transfer?.image"
        cover
        class="hero-img"
        position="center center"
      />

      <!-- cinematic multi-layer scrim -->
      <div class="hero-scrim" />

      <!-- ── top bar ── -->
      <div class="hero-topbar">
        <button class="back-btn" @click="goBack" type="button" aria-label="Go back">
          <v-icon size="18">mdi-arrow-left</v-icon>
        </button>

        <div class="hero-breadcrumb">
          <span>Airport Transfers</span>
          <span class="bc-sep">›</span>
          <span class="bc-current">{{ transfer?.name }}</span>
        </div>
      </div>

      <!-- ── bottom title block ── -->
      <div class="hero-bottom" v-if="transfer">

        <!-- rating row -->
        <div class="star-row">
          <!-- <v-icon v-for="n in 5" :key="n" size="14" class="star-icon">mdi-star</v-icon>
          <span class="star-label">5-Star Transfer</span> -->
        </div>

        <h1 class="hero-title">{{ transfer.name }}</h1>

        <!-- eyebrow under title -->
        <div class="hero-eyebrow">
          <span class="pulse-dot" />
          <span>Premium Transfer</span>
          <span class="eyebrow-sep">·</span>
          <span>Kenya</span>
          <span class="eyebrow-sep">·</span>
          <span>Airport Service</span>
        </div>

        <!-- tag chips -->
        <div class="hero-tags">
          <span class="htag">
            <v-icon size="12">mdi-shield-check</v-icon> Verified
          </span>
          <span class="htag">
            <v-icon size="12">mdi-airplane</v-icon> Airport-Ready
          </span>
          <span class="htag">
            <v-icon size="12">mdi-clock-fast</v-icon> Punctual
          </span>
          <span class="htag">
            <v-icon size="12">mdi-map-marker</v-icon> Kenya
          </span>
        </div>
      </div>

      <!-- scroll nudge -->
      <div class="scroll-nudge">
        <div class="nudge-line" />
        <span class="nudge-label">Scroll to explore</span>
      </div>

    </div>

    <!-- ░░░ LIFTED CONTENT ░░░ -->
    <div class="content-lift" v-if="transfer">
      <div class="content-card">

        <!-- gold accent top bar -->
        <div class="card-accent-bar" />

        <div class="card-inner">

          <!-- ── LEFT: About ── -->
          <div class="card-text">
            <p class="section-label">About this transfer</p>
            <p class="card-desc">{{ transfer.description }}</p>

            <!-- highlights row -->
            <div class="highlights">
              <div class="highlight-item">
                <div class="hi-icon-wrap">
                  <v-icon size="18" class="hi-icon">mdi-airplane-takeoff</v-icon>
                </div>
                <div>
                  <div class="hi-val">Airport</div>
                  <div class="hi-key">Pick-up</div>
                </div>
              </div>
              <div class="highlight-item">
                <div class="hi-icon-wrap">
                  <v-icon size="18" class="hi-icon">mdi-car-estate</v-icon>
                </div>
                <div>
                  <div class="hi-val">Premium</div>
                  <div class="hi-key">Vehicles</div>
                </div>
              </div>
              <div class="highlight-item">
                <div class="hi-icon-wrap">
                  <v-icon size="18" class="hi-icon">mdi-clock-check-outline</v-icon>
                </div>
                <div>
                  <div class="hi-val">24/7</div>
                  <div class="hi-key">Available</div>
                </div>
              </div>
              <div class="highlight-item">
                <div class="hi-icon-wrap">
                  <v-icon size="18" class="hi-icon">mdi-account-tie</v-icon>
                </div>
                <div>
                  <div class="hi-val">Pro</div>
                  <div class="hi-key">Drivers</div>
                </div>
              </div>
            </div>
          </div>

          <!-- vertical divider -->
          <div class="card-divider" />

          <!-- ── RIGHT: Action ── -->
          <div class="card-action">

            <p class="section-label">Book Your Transfer</p>

            <!-- CTA button -->
            <button
              v-if="transfer.website"
              @click="handleVisit"
              class="visit-btn"
              type="button"
            >
              <span class="vbtn-text">Visit Official Website</span>
              <span class="vbtn-arrow">
                <v-icon size="16">mdi-arrow-right</v-icon>
              </span>
            </button>
            <span v-else class="no-site">Website not available</span>

            <!-- trust badges -->
            <div class="trust-badges">
              <div class="trust-badge">
                <v-icon size="15" class="tb-icon">mdi-shield-check-outline</v-icon>
                <span>Safe & Verified</span>
              </div>
              <div class="trust-badge">
                <v-icon size="15" class="tb-icon">mdi-airplane-clock</v-icon>
                <span>Flight Monitoring</span>
              </div>
              <div class="trust-badge">
                <v-icon size="15" class="tb-icon">mdi-headset</v-icon>
                <span>Passenger Support</span>
              </div>
            </div>

            <!-- decorative lines -->
            <div class="deco-lines">
              <span /><span /><span />
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- error state -->
    <div class="error-wrap" v-else>
      <v-alert type="error" icon="mdi-alert-circle">
        Transfer data missing. Please return to the gallery.
      </v-alert>
    </div>

  </div>
</template>

<style scoped>
/* ── Google Font import ─────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

/* ── CSS Variables ──────────────────────────────────────────────── */
:root {
  --gold:      #ff9800;
  --gold-dim:  rgba(255,152,0,0.18);
  --dark-base: #0a0a0a;
  --dark-card: #141414;
  --text-main: #f0f0f0;
  --text-mute: #7a7a7a;
  --text-body: #a8a8a8;
}

/* ── Root ───────────────────────────────────────────────────────── */
.detail-root {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  background: var(--dark-base);
  display: flex;
  flex-direction: column;
}

/* ── Hero ───────────────────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  height: 92vh;
  min-height: 560px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-img {
  width: 100% !important;
  height: 100% !important;
  animation: heroZoom 14s ease forwards;
}
@keyframes heroZoom {
  from { transform: scale(1.08); }
  to   { transform: scale(1.0);  }
}

.hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to top,
      rgba(10,10,10,1.00)  0%,
      rgba(10,10,10,0.72) 28%,
      rgba(10,10,10,0.22) 55%,
      transparent         80%),
    linear-gradient(to bottom,
      rgba(10,10,10,0.45)  0%,
      transparent          22%),
    linear-gradient(to right,
      rgba(10,10,10,0.30)  0%,
      transparent          35%),
    linear-gradient(160deg,
      transparent          45%,
      rgba(180,100,0,0.10) 100%);
}

/* ── Top bar ────────────────────────────────────────────────────── */
.hero-topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  animation: fadeDown 0.7s ease both;
}
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0);     }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.20);
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(14px);
  color: #fff;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s, transform 0.2s;
}
.back-btn:hover {
  border-color: var(--gold);
  background: rgba(255,152,0,0.22);
  transform: translateX(-2px);
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: rgba(255,255,255,0.40);
}
.bc-sep     { color: rgba(255,255,255,0.20); }
.bc-current { color: rgba(255,255,255,0.72); }

/* ── Hero bottom ────────────────────────────────────────────────── */
.hero-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: 0 52px 68px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 16px;
  animation: fadeUp 0.7s 0.1s ease both;
}
.star-icon  { color: var(--gold) !important; }
.star-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  margin-left: 8px;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0 0 20px;
  text-shadow: 0 4px 32px rgba(0,0,0,0.60);
  animation: fadeUp 0.7s 0.2s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 20px;
  animation: fadeUp 0.7s 0.3s ease both;
}
.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 0 rgba(255,152,0,0.6);
  animation: pulse 2.6s ease infinite;
  flex-shrink: 0;
}
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0   rgba(255,152,0,0.55); }
  60%  { box-shadow: 0 0 0 9px rgba(255,152,0,0);    }
  100% { box-shadow: 0 0 0 0   rgba(255,152,0,0);    }
}
.eyebrow-sep { color: rgba(255,255,255,0.20); }

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  animation: fadeUp 0.7s 0.4s ease both;
}
.htag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.65);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 5px 13px;
  backdrop-filter: blur(8px);
  transition: border-color 0.2s, color 0.2s;
}
.htag:hover {
  border-color: rgba(255,152,0,0.40);
  color: var(--gold);
}
.htag .v-icon { color: var(--gold) !important; }

/* Scroll nudge */
.scroll-nudge {
  position: absolute;
  bottom: 28px;
  right: 36px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  animation: fadeUp 0.7s 0.6s ease both;
}
.nudge-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255,152,0,0.6));
  animation: nudgePulse 2s ease infinite;
}
@keyframes nudgePulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1;   }
}
.nudge-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  writing-mode: vertical-rl;
}

/* ── Content card ───────────────────────────────────────────────── */
.content-lift {
  position: relative;
  z-index: 10;
  margin-top: -64px;
  padding: 0 36px 72px;
  animation: fadeUp 0.8s 0.5s ease both;
}

.content-card {
  position: relative;
  background: var(--dark-card);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 -12px 60px rgba(0,0,0,0.70),
    0   0px  1px rgba(255,152,0,0.12),
    inset 0 1px 0 rgba(255,255,255,0.05);
  max-width: 1140px;
  margin: 0 auto;
}

.card-accent-bar {
  position: absolute;
  top: 0; left: 0;
  width: 88px;
  height: 3px;
  background: linear-gradient(to right, var(--gold), transparent);
}

.card-inner {
  display: flex;
  align-items: flex-start;
  padding: 48px 52px;
  gap: 0;
}

/* Left — description */
.card-text {
  flex: 1.7;
  padding-right: 44px;
}

.section-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 16px;
}

.card-desc {
  font-size: 1rem;
  line-height: 1.90;
  color: var(--text-body);
  margin: 0 0 36px;
}

/* Highlights row */
.highlights {
  display: flex;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  overflow: hidden;
}

.highlight-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-right: 1px solid rgba(255,255,255,0.06);
  transition: background 0.2s;
}
.highlight-item:last-child { border-right: none; }
.highlight-item:hover      { background: rgba(255,152,0,0.05); }

.hi-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,152,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.hi-icon { color: var(--gold) !important; }

.hi-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.2;
}
.hi-key {
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-mute);
}

/* Vertical divider */
.card-divider {
  width: 1px;
  align-self: stretch;
  flex-shrink: 0;
  margin: 0 44px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255,152,0,0.28) 20%,
    rgba(255,152,0,0.28) 80%,
    transparent 100%
  );
}

/* Right — action */
.card-action {
  flex: 0.85;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.visit-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  margin: 0 0 28px;
  background: linear-gradient(135deg, rgba(255,152,0,0.14), rgba(255,152,0,0.06));
  border: 1px solid rgba(255,152,0,0.35);
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, transform 0.2s;
}
.visit-btn:hover {
  background: linear-gradient(135deg, rgba(255,152,0,0.26), rgba(255,152,0,0.12));
  border-color: rgba(255,152,0,0.65);
  transform: translateY(-2px);
}
.visit-btn:active { transform: translateY(0); }

.vbtn-text {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0.02em;
}
.vbtn-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold);
  color: #000;
  flex-shrink: 0;
  transition: transform 0.2s;
}
.visit-btn:hover .vbtn-arrow { transform: translateX(3px); }

/* Trust badges */
.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-mute);
  transition: color 0.2s;
}
.trust-badge:hover { color: rgba(255,255,255,0.75); }
.tb-icon { color: var(--gold) !important; }

/* Deco lines */
.deco-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.deco-lines span {
  display: block;
  height: 1px;
  background: rgba(255,152,0,0.22);
  border-radius: 1px;
}
.deco-lines span:nth-child(1) { width: 48px; }
.deco-lines span:nth-child(2) { width: 30px; }
.deco-lines span:nth-child(3) { width: 16px; }

.no-site    { font-size: 0.88rem; color: var(--text-mute); }
.error-wrap { padding: 48px; }

/* ── Mobile ─────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero           { height: 72vh; }
  .hero-bottom    { padding: 0 28px 56px; }
  .scroll-nudge   { display: none; }
  .content-lift   { margin-top: -52px; padding: 0 20px 56px; }

  .card-inner {
    flex-direction: column;
    padding: 36px 28px;
  }
  .card-text    { padding-right: 0; margin-bottom: 32px; }
  .card-divider {
    width: 100%; height: 1px;
    align-self: unset;
    margin: 0 0 32px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255,152,0,0.26) 30%,
      rgba(255,152,0,0.26) 70%,
      transparent
    );
  }
  .highlights { flex-wrap: wrap; }
  .highlight-item { flex: calc(50% - 1px); }
}

@media (max-width: 540px) {
  .hero-title      { font-size: 2.4rem; }
  .hero-breadcrumb { display: none; }
  .highlights      { flex-direction: column; }
  .highlight-item  { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .highlight-item:last-child { border-bottom: none; }
}
</style>