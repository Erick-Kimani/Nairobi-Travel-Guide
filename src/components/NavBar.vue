<template>
  <nav class="navbar">
    <div class="nav-container">

      <!-- Brand -->
      <router-link to="/" class="nav-brand">
        <span class="logo-text luxury-title">Luxe Stays</span>
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
          <router-link to="/aboutus" class="nav-link" active-class="active">
            About Us
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
          Get Started
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import AuthService from "@/services/authService"

const route = useRoute()

// 🔥 Reactive auth state
const isLoggedIn = ref(AuthService.isLoggedIn())
const isAdmin = ref(AuthService.hasAbility("admin"))
const isManager = ref(AuthService.hasAbility("manager"))

// 🔽 Dropdown states
const showHotelsDropdown = ref(false)
const showAdminDropdown = ref(false)

// 🔄 Re-check auth on every navigation
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = AuthService.isLoggedIn()
    isAdmin.value = AuthService.hasAbility("admin")
    isManager.value = AuthService.hasAbility("manager")
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

<style scoped>
/* Navbar */
.navbar {
  background-color: #102c27;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  font-family: 'Poppins', sans-serif;
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

/* Luxury Title */
.luxury-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.76rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  background: linear-gradient(
    135deg,
    #d4af37,
    #f5e6b0,
    #b8962e
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(212, 175, 55, 0.25);

  transition: all 0.35s ease;
}

/* Brand Hover */
.nav-brand:hover .luxury-title {
  letter-spacing: 2.5px;
  transform: scale(1.03);
  text-shadow:
    0 2px 6px rgba(0, 0, 0, 0.5),
    0 0 14px rgba(212, 175, 55, 0.45);
}

/* Navigation Links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 16px;
  align-items: center;
}

/* Rounded Nav Items */
.nav-link {
  text-decoration: none;
  color: #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Hover Effect */
.nav-link:hover {
  background-color: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

/* Active */
.nav-link.active {
  background-color: #4ade80;
  color: #1a3a34;
  font-weight: 600;
}

/* Dropdown Container */
.dropdown {
  position: relative;
}

/* Dropdown Toggle */
.dropdown-toggle {
  font-family: 'Poppins', sans-serif;
}

/* Dropdown Icon */
.dropdown-icon {
  transition: transform 0.3s ease;
  margin-left: 2px;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a3a34;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  list-style: none;
  padding: 8px 0;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1001;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  top: calc(100% + 8px);
}

/* Dropdown Arrow */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 6px solid rgba(74, 222, 128, 0.2);
}

.dropdown-menu::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 5px solid #1a3a34;
}

/* Dropdown Items */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: rgba(74, 222, 128, 0.15);
  color: #4ade80;
  padding-left: 24px;
}

.dropdown-item svg {
  flex-shrink: 0;
}

/* CTA Button */
.btn-outline {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  border: 2px solid #d4af37;
  padding: 10px 24px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: #d4af37;
  color: #1a3a34;
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>