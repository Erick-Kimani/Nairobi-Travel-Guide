<template>
  <v-container
    fluid
    class="login-root d-flex flex-column align-center justify-center"
  >
    <!-- Animated overlay elements -->
    <div class="bg-overlay"></div>
    <div class="grain-overlay"></div>

    <!-- Decorative floating orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Decorative corner accents -->
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
      <div class="title-eyebrow">✦ NAIROBI TRAVEL GUIDE ✦</div>
      <div class="title-main">
        <span class="title-welcome">Welcome</span>
        <span class="title-back"> Back</span>
      </div>
      <div class="title-tagline">Your next Nairobi adventure awaits</div>
    </div>

    <!-- GLASS CARD -->
    <v-card class="pa-8 glass-card animate-rise" elevation="0">

      <!-- Decorative top band -->
      <div class="card-top-accent">
        <span class="accent-dot"></span>
        <span class="accent-line"></span>
        <span class="accent-label">LOGIN IN TO YOUR ACCOUNT</span>
        <span class="accent-line"></span>
        <span class="accent-dot"></span>
      </div>

      <v-card-title class="card-heading text-center mt-3 mb-2">
        Continue Exploring
      </v-card-title>
      <p class="card-subheading text-center mb-6">Log in to access exclusive local insights and plan your perfect Nairobi escape.</p>

      <v-card-text class="px-0">

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

        <!-- LOGIN BUTTON -->
        <button class="login-btn mt-5" @click="login">
          <span class="btn-text">Log In</span>
          <span class="btn-icon">→</span>
        </button>

        <!-- DIVIDER -->
        <div class="divider my-5">
          <span class="divider-line"></span>
          <span class="divider-text">or</span>
          <span class="divider-line"></span>
        </div>

        <!-- SIGN UP LINK -->
        <div class="signup-prompt text-center">
          <span>New to Nairobi Travel Guide?</span>
          <button class="signup-link" @click="goToSignup">Create Account →</button>
        </div>
      </v-card-text>

      <!-- Card watermark -->
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
import TokenService from "@/services/TokenService";

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

async function login() {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    TokenService.setToken(response.data);
    localStorage.setItem("isUserLoggedIn", true);
    alert("Login Successful!");
    const abilities = TokenService.getAbilities();
    if (abilities?.admin === true) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.warn("API login failed:", error.response?.data || error.message);
    alert("Incorrect credentials. Please try again.");
  }
}

function goToSignup() {
  router.push("/signup");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Root ── */
.login-root {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('public/images/Nairobi-Kenyas-Capital-Cityscapes-Skylines-By-Antony-Trivet-Travel-Photographers-16.jpg');
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
  width: 160px; height: 160px;
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
.title-welcome {
  font-family: 'Playfair Display', serif;
  font-size: 3.6rem;
  font-weight: 900;
  color: #FF8C2A;
  display: inline;
}
.title-back {
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
  max-width: 480px;
  border-radius: 28px !important;
  background: rgba(255, 252, 245, 0.10) !important;
  border: 5px solid rgba(255, 200, 120, 0.30) !important;
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

/* ── Login Button ── */
.login-btn {
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
.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  border-radius: inherit;
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 32px rgba(255, 100, 0, 0.55),
    0 4px 10px rgba(0,0,0,0.25),
    inset 0 1px 0 rgba(255,255,255,0.3);
  filter: brightness(1.06);
}
.login-btn:active {
  transform: translateY(0px);
  box-shadow: 0 4px 14px rgba(255, 100, 0, 0.35);
}
.btn-text { font-weight: 500; letter-spacing: 0.05em; }
.btn-icon { font-size: 1.1rem; transition: transform 0.2s; }
.login-btn:hover .btn-icon { transform: translateX(4px); }

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
}

/* ── Sign Up Prompt ── */
.signup-prompt {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 220, 180, 0.75);
}
.signup-link {
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
.signup-link:hover {
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