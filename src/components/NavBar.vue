<template>
  <nav class="navbar">
    <div class="nav-container">

      <!-- Brand -->
      <router-link to="/" class="nav-brand">
        <span class="logo-text luxury-title">Nairobi Travel Guide</span>
      </router-link>

      <!-- Navigation -->
      <ul class="nav-links">

        <li>
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>

        <!-- 🏨 Explore Hotels Dropdown -->
        <li class="dropdown" @mouseenter="showHotelsDropdown = true" @mouseleave="showHotelsDropdown = false">
          <button class="nav-link dropdown-toggle">
            Plan Your Trip
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon" :class="{ 'rotate': showHotelsDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <ul class="dropdown-menu" :class="{ 'show': showHotelsDropdown }">
            <li>
              <router-link to="/vacation" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                Vacation Hotels
              </router-link>
            </li>
            <li>
              <router-link to="/transit" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
                Transit Hotels
              </router-link>
            </li>

            <li>
              <router-link to="/airport" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Airport Transfers
              </router-link>
            </li>
            <li>
              <router-link to="/safari" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                Tours and Safaris
              </router-link>
            </li>
          </ul>
        </li>

        <li>
          <router-link to="/explore" class="nav-link" active-class="active">
            Explore
          </router-link>
        </li>

        <li>
          <router-link to="/contactus" class="nav-link" active-class="active">
            Contact Us
          </router-link>
        </li>

        <li>
          <router-link to="/blog" class="nav-link" active-class="active">
            Blog
          </router-link>
        </li>

        <!-- 🔐 Admin/Editor Dropdown -->
        <li v-if="isLoggedIn && (isAdmin || isManager)" class="dropdown" @mouseenter="showAdminDropdown = true" @mouseleave="showAdminDropdown = false">
          <button class="nav-link dropdown-toggle">
            My Functions
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon" :class="{ 'rotate': showAdminDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <ul class="dropdown-menu" :class="{ 'show': showAdminDropdown }">
            <!-- Only show Administrator link to admins -->
            <li v-if="isAdmin">
              <router-link to="/administrator" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Administrator
              </router-link>
            </li>

            <!-- Show Click Analytics to both admins and managers -->
            <li v-if="isAdmin || isManager">
              <router-link to="/clickanalytics" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Click Analytics
              </router-link>
            </li>
          </ul>
        </li>

      </ul>

      <!-- CTA -->
      <div class="nav-actions" v-if="!isLoggedIn && !isAuthPage">
        <router-link to="/login" class="btn-outline">
        Sign In
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import AuthService from "@/services/authService"
import '@/assets/navbar.css'

const route = useRoute()

// 🔥 Reactive auth state
const isLoggedIn = ref(AuthService.isLoggedIn())
const isAdmin    = ref(AuthService.hasAbility("admin"))
const isManager  = ref(AuthService.hasAbility("manager"))

// 🔽 Dropdown states
const showHotelsDropdown = ref(false)
const showAdminDropdown  = ref(false)

// 🔄 Re-check auth on every navigation
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = AuthService.isLoggedIn()
    isAdmin.value    = AuthService.hasAbility("admin")
    isManager.value  = AuthService.hasAbility("manager")
  },
  { immediate: true }
)

// Hide CTA on auth pages
const isAuthPage = ref(false)

watch(
  () => route.path,
  (path) => {
    isAuthPage.value = ["/login", "/signup"].includes(path.toLowerCase())
  },
  { immediate: true }
)
</script>