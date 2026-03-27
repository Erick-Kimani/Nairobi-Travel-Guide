<template>
  <v-container
    fluid
    class="signup-root d-flex flex-column align-center justify-center"
  >
    <!-- Animated overlay elements -->
    <div class="bg-overlay"></div>
    <div class="grain-overlay"></div>

    <!-- Decorative floating orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Decorative corner accent -->
    <div class="corner-accent top-left">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="80" stroke="rgba(255,160,60,0.25)" stroke-width="1.5" fill="none"/>
        <circle cx="0" cy="0" r="50" stroke="rgba(255,160,60,0.18)" stroke-width="1" fill="none"/>
      </svg>
    </div>
    <div class="corner-accent bottom-right">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="80" stroke="rgba(255,160,60,0.25)" stroke-width="1.5" fill="none"/>
        <circle cx="120" cy="120" r="50" stroke="rgba(255,160,60,0.18)" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- APP TITLE -->
    <div class="app-title mb-8 animate-drop">
      <div class="title-eyebrow">✦ WELCOME TO ✦</div>
      <div class="title-main">
        <span class="title-nairobi">Nairobi</span>
        <span class="title-travel"> Travel Guide</span>
      </div>
      <div class="title-tagline">Discover the city that never stops surprising</div>
    </div>

    <!-- GLASS CARD -->
    <v-card class="pa-8 glass-card animate-rise" elevation="0">

      <!-- Decorative top band -->
      <div class="card-top-accent">
        <span class="accent-dot"></span>
        <span class="accent-line"></span>
        <span class="accent-label">CREATE YOUR ACCOUNT</span>
        <span class="accent-line"></span>
        <span class="accent-dot"></span>
      </div>

      <v-card-title class="card-heading text-center mt-4 mb-2">
        Begin Your Journey
      </v-card-title>
      <p class="card-subheading text-center mb-6">Sign up and unlock Nairobi's finest experiences</p>

      <v-card-text class="px-0">

        <!-- ── GOOGLE SIGN-IN BUTTON ── -->
        <button class="google-btn mb-2" @click="signupWithGoogle">
          <!-- Official Google 'G' SVG logo -->
          <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.39 3.07 29.49 1 24 1 14.82 1 7.01 6.48 3.44 14.22l7.1 5.52C12.3 13.67 17.69 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v9h12.67c-.55 2.96-2.2 5.47-4.67 7.16l7.18 5.57C43.36 37.61 46.52 31.5 46.52 24.5z"/>
            <path fill="#FBBC05" d="M10.54 28.26A14.57 14.57 0 0 1 9.5 24c0-1.48.25-2.91.69-4.26l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.56 10.77l7.98-6.51z"/>
            <path fill="#34A853" d="M24 47c5.49 0 10.1-1.82 13.47-4.93l-7.18-5.57c-1.88 1.27-4.29 2-6.29 2-6.31 0-11.7-4.17-13.46-9.74l-7.98 6.51C7.01 41.52 14.82 47 24 47z"/>
          </svg>
          <span class="google-btn-text">Continue with Google</span>
        </button>

        <!-- DIVIDER -->
        <div class="divider my-5">
          <span class="divider-line"></span>
          <span class="divider-text">or register manually</span>
          <span class="divider-line"></span>
        </div>

        <!-- FULL NAME -->
        <div class="field-wrapper">
          <v-text-field
            v-model="name"
            label="Full Name"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-account"
            class="styled-field"
            required
          />
        </div>

        <!-- EMAIL -->
        <div class="field-wrapper">
          <v-text-field
            v-model="email"
            label="Email Address"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-email"
            type="email"
            class="styled-field"
            required
          />
        </div>

        <!-- PASSWORD -->
        <div class="field-wrapper">
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            class="styled-field"
            required
          />
        </div>

        <!-- CONFIRM PASSWORD -->
        <div class="field-wrapper">
          <v-text-field
            v-model="password_confirmation"
            label="Confirm Password"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-lock-check"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            class="styled-field"
            required
          />
        </div>

        <!-- SIGN UP BUTTON -->
        <button class="signup-btn mt-5" @click="signup">
          <span class="btn-text">Create My Account</span>
          <span class="btn-icon">→</span>
        </button>

        <!-- LOGIN LINK -->
        <div class="login-prompt text-center mt-5">
          <span>Already exploring with us?</span>
          <button class="login-link" @click="goToLogin">Login In →</button>
        </div>
      </v-card-text>

      <!-- Card bottom watermark -->
      <div class="card-watermark">NBO</div>
    </v-card>

    <!-- Bottom badge -->
    <div class="bottom-badge mt-6 animate-drop-delayed">
      🌍 &nbsp;Trusted by 10,000+ Nairobi explorers
    </div>

  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { event } from 'vue-gtag'

const router = useRouter();


const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const showPassword = ref(false);

async function signup() {
  try {
    await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });

    // ✅ GA4: Track successful registration
    event('sign_up', { method: 'email' });

    alert("Registration successful! Please log in.");
    router.push("/login");
  } catch (error) {
    console.error("Signup Failed:", error.response?.data || error.message);
    alert("Signup failed. Please check your details.");
  }
}

function signupWithGoogle() {
  // ✅ GA4: Track Google sign-up attempt
  event('sign_up', { method: 'google' });
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/redirect`;
}

function goToLogin() {
  router.push("/login");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Root ── */
.signup-root {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('public/images/Upperhill Nairobi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'DM Sans', sans-serif;
}

/* ── Overlays ── */
.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 5, 0, 0.72) 0%,
    rgba(80, 30, 0, 0.55) 50%,
    rgba(10, 5, 0, 0.70) 100%
  );
  z-index: 0;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* ── Orbs ── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  animation: orb-float 8s ease-in-out infinite alternate;
}
.orb-1 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(255, 120, 30, 0.28), transparent 70%);
  top: -100px; left: -120px;
  animation-delay: 0s;
}
.orb-2 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(255, 200, 60, 0.18), transparent 70%);
  bottom: -80px; right: -80px;
  animation-delay: -3s;
}
.orb-3 {
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(200, 80, 20, 0.22), transparent 70%);
  top: 40%; left: 60%;
  animation-delay: -5s;
}
@keyframes orb-float {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.08); }
}

/* ── Corner accents ── */
.corner-accent {
  position: absolute;
  width: 160px;
  height: 160px;
  z-index: 1;
  pointer-events: none;
}
.top-left    { top: 0; left: 0; }
.bottom-right { bottom: 0; right: 0; }

/* ── App Title ── */
.app-title {
  text-align: center;
  z-index: 2;
  position: relative;
}
.title-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: rgba(255, 180, 80, 0.9);
  text-transform: uppercase;
  margin-bottom: 8px;
}
.title-main {
  line-height: 1.05;
  text-shadow: 0 4px 24px rgba(0,0,0,0.5);
}
.title-nairobi {
  font-family: 'Playfair Display', serif;
  font-size: 3.6rem;
  font-weight: 900;
  color: #FF8C2A;
  display: inline;
}
.title-travel {
  font-family: 'Playfair Display', serif;
  font-size: 3.6rem;
  font-weight: 700;
  color: #fff;
  display: inline;
}
.title-tagline {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 300;
  color: rgba(255, 235, 200, 0.75);
  margin-top: 10px;
  letter-spacing: 0.04em;
}

/* ── Card ── */
.glass-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  border-radius: 28px !important;
  background: rgba(255, 252, 245, 0.10) !important;
  border: 1px solid rgba(255, 200, 120, 0.30) !important;
  box-shadow:
    0 8px 60px rgba(0, 0, 0, 0.45),
    0 2px 8px rgba(255,140,40,0.10),
    inset 0 1px 0 rgba(255,255,255,0.18) !important;
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  overflow: visible !important;
}

/* ── Card top accent ── */
.card-top-accent {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 4px;
}
.accent-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #FF8C2A;
  display: inline-block;
}
.accent-line {
  flex: 1;
  max-width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,140,40,0.6));
  display: inline-block;
}
.accent-line:last-of-type {
  background: linear-gradient(90deg, rgba(255,140,40,0.6), transparent);
}
.accent-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  color: rgba(255, 180, 80, 0.85);
  text-transform: uppercase;
  font-weight: 500;
}

/* ── Card headings ── */
.card-heading {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  color: #fff !important;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.card-subheading {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  color: rgba(255, 220, 170, 0.75);
  font-weight: 300;
  letter-spacing: 0.02em;
}

/* ── Google Button ── */
.google-btn {
  width: 100%;
  height: 52px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.97rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: background 0.2s, border-color 0.2s, transform 0.18s, box-shadow 0.18s;
  position: relative;
  overflow: hidden;
}
.google-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
  border-radius: inherit;
  pointer-events: none;
}
.google-btn:hover {
  background: rgba(255, 255, 255, 0.20);
  border-color: rgba(255, 255, 255, 0.38);
  transform: translateY(-2px);
  box-shadow:
    0 6px 22px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.google-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.google-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
}
.google-btn-text {
  font-weight: 500;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* ── Fields ── */
.field-wrapper {
  position: relative;
  margin-bottom: 2px;
}

:deep(.styled-field .v-field) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07) !important;
  border-color: rgba(255,180,80,0.25) !important;
  transition: background 0.25s, box-shadow 0.25s;
}
:deep(.styled-field .v-field:hover) {
  background: rgba(255, 255, 255, 0.12) !important;
}
:deep(.styled-field .v-field--focused) {
  background: rgba(255, 255, 255, 0.14) !important;
  box-shadow: 0 0 0 2px rgba(255,140,40,0.35) !important;
}
:deep(.styled-field .v-label),
:deep(.styled-field .v-field__input),
:deep(.styled-field input) {
  color: #fff !important;
}
:deep(.styled-field .v-label) {
  color: rgba(255,200,130,0.7) !important;
}
:deep(.styled-field .v-icon) {
  color: rgba(255,160,60,0.8) !important;
}

/* ── Sign Up Button ── */
.signup-btn {
  width: 100%;
  height: 54px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #FF6B00 0%, #FF9A3C 60%, #FFB347 100%);
  color: #fff;
  box-shadow:
    0 6px 24px rgba(255, 100, 0, 0.45),
    0 2px 6px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.25);
  transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
}
.signup-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  border-radius: inherit;
}
.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 32px rgba(255, 100, 0, 0.55),
    0 4px 10px rgba(0,0,0,0.25),
    inset 0 1px 0 rgba(255,255,255,0.3);
  filter: brightness(1.06);
}
.signup-btn:active {
  transform: translateY(0px);
  box-shadow: 0 4px 14px rgba(255, 100, 0, 0.35);
}
.btn-text { font-weight: 500; letter-spacing: 0.05em; }
.btn-icon { font-size: 1.1rem; transition: transform 0.2s; }
.signup-btn:hover .btn-icon { transform: translateX(4px); }

/* ── Divider ── */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255,200,120,0.2);
}
.divider-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,200,130,0.5);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ── Login Prompt ── */
.login-prompt {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 220, 180, 0.75);
}
.login-link {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #FF9A3C;
  margin-left: 6px;
  padding: 0;
  transition: color 0.18s, letter-spacing 0.18s;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
}
.login-link:hover {
  color: #FFB347;
  text-decoration-color: rgba(255, 160, 60, 0.5);
  letter-spacing: 0.03em;
}

/* ── Card watermark ── */
.card-watermark {
  position: absolute;
  bottom: 18px;
  right: 24px;
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 900;
  color: rgba(255,140,40,0.06);
  letter-spacing: 0.08em;
  pointer-events: none;
  user-select: none;
}

/* ── Bottom badge ── */
.bottom-badge {
  z-index: 2;
  position: relative;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(255, 220, 160, 0.7);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,200,100,0.18);
  border-radius: 999px;
  padding: 8px 20px;
  backdrop-filter: blur(8px);
}

/* ── Animations ── */
.animate-drop {
  animation: drop-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.animate-drop-delayed {
  animation: drop-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
}
.animate-rise {
  animation: rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}
@keyframes drop-in {
  from { opacity: 0; transform: translateY(-22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rise-in {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
</style>