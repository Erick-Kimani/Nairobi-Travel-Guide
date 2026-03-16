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

        <!-- Plan Your Trip Dropdown -->
        <li class="dropdown" @mouseenter="showHotelsDropdown = true" @mouseleave="showHotelsDropdown = false">
          <button class="nav-link dropdown-toggle">
            Plan Your Trip
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon" :class="{ 'rotate': showHotelsDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <ul class="dropdown-menu" :class="{ 'show': showHotelsDropdown }">

            <!-- Vacation Hotels → Palm tree icon (SVGrepo) -->
            <li>
              <router-link to="/vacation" class="dropdown-item">
                <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M493.656,124.29c-15.374-54.334-60.399-77.447-112.012-68.662c-47.529,8.09-72.358,67.34-83.923,103.27
                    c3.44-47.59-5.354-113.771-62.132-144.674C148.834-32.997,93.926,51.562,88.435,62.543c-5.491,10.982-5.5,13.084,9.883,12.08
                    c4.582-0.3,44.51-11.538,83.692-4.452l18.437-17.004l8.545,23.962c32.464,11.376,58.511,40.529,63.204,84.241
                    c-26.338-32.379-66.962-53.226-112.707-53.226c-79.539,0-144.014,62.723-144.014,140.093c0,6.228,0.129,1.759,0.129,1.759
                    c0.223,2.933,2.144,5.464,4.907,6.468c2.762,0.996,5.86,0.283,7.91-1.827c0,0,1.604-2.497,8.811-9.086
                    c12.697-11.617,26.664-21.852,41.627-30.577l13.684-25.541l18.463,9.806c27.703-11.041,57.919-17.133,89.569-17.133
                    c20.873,0,41.138,2.651,60.467,7.618c-44.57-2.951-111.746,20.282-138.334,77c-32.945,70.282-0.524,126.066,4.161,130.432
                    c3.844,3.578,8.494,0.79,9.755-5.448c2.753-13.632,10.321-39.113,24.219-67.692l-5.611-22.666l15.452,3.955
                    c19.364-34.147,47.719-70,87.827-94.15c-30.997,68.291-56.512,168.095-17.63,300.844h95.488c0,0-96.939-93.893-46.56-286.431
                    c10.948,14.147,24.88,34.678,36.506,59.686l14.696,1.854l-6.564,17.587c8.048,21.534,13.839,45.591,14.645,71.337
                    c0.206,6.572,4.17,11.437,6.194,7.13c31.024-66.113,21.268-133.779-22.22-173.261c27.42,9.042,49.829,31.091,67.288,56.314
                    l20.822,4.47l-3.878,23.473c14.611,27.78,23.576,55.286,26.777,71.055c1.26,6.211,4.555,10.261,8.528,3.192
                    c23.67-42.124,26.725-122.96-16.052-167.212c-33.168-34.3-91.688-36.558-127.729-27.051c23.661-39.783,86.969-42.743,86.969-42.743
                    S405.803,108.34,408,105.045c2.196-3.294,14.276,22.462,14.276,22.462l63.745,26.038c0,0,8.184,5.595,9.78-3.912
                    C496.762,143.893,497.345,135.048,493.656,124.29z"/>
                </svg>
                Vacation Hotels
              </router-link>
            </li>

            <!-- Transit Hotels → Hotel building icon (SVGrepo) -->
            <li>
              <router-link to="/transit" class="dropdown-item">
                <svg width="30" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M12.691406 0L11.564453 2.3320312L9 2.6386719L10.949219 4.3613281L10.435547 7L12.691406 5.6816406L14.949219 7L14.435547 4.3613281L16.384766 2.6386719L13.820312 2.3320312L12.691406 0 z M 14.949219 7L10.435547 7L9.3007812 7C6.3307812 7 4 9.3307812 4 12.300781L4 45C4 45.55 4.45 46 5 46L22 46L22 36L28 36L28 46L45 46C45.55 46 46 45.55 46 45L46 12.300781C46 9.3307812 43.669219 7 40.699219 7L39.564453 7L35.050781 7L31.359375 7L26.845703 7L23.154297 7L18.640625 7L14.949219 7 z M 18.640625 7L20.896484 5.6816406L23.154297 7L22.640625 4.3613281L24.589844 2.6386719L22.025391 2.3320312L20.896484 0L19.769531 2.3320312L17.205078 2.6386719L19.154297 4.3613281L18.640625 7 z M 26.845703 7L29.103516 5.6816406L31.359375 7L30.845703 4.3613281L32.794922 2.6386719L30.230469 2.3320312L29.103516 0L27.974609 2.3320312L25.410156 2.6386719L27.359375 4.3613281L26.845703 7 z M 35.050781 7L37.308594 5.6816406L39.564453 7L39.050781 4.3613281L41 2.6386719L38.435547 2.3320312L37.308594 0L36.179688 2.3320312L33.615234 2.6386719L35.564453 4.3613281L35.050781 7 z M 10 12L16 12L16 16L10 16L10 12 z M 22 12L28 12L28 16L22 16L22 12 z M 34 12L40 12L40 16L34 16L34 12 z M 10 20L16 20L16 24L10 24L10 20 z M 22 20L28 20L28 24L22 24L22 20 z M 34 20L40 20L40 24L34 24L34 20 z M 10 28L16 28L16 32L10 32L10 28 z M 22 28L28 28L28 32L22 32L22 28 z M 34 28L40 28L40 32L34 32L34 28 z M 10 36L16 36L16 40L10 40L10 36 z M 34 36L40 36L40 40L34 40L34 36 z"/>
                </svg>
                Transit Hotels
              </router-link>
            </li>

            <!-- Airport Transfers → Airplane icon (SVGrepo) -->
            <li>
              <router-link to="/airport" class="dropdown-item">
                <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M29.854,4.163 L22.402,11.642 L26.908,24.037 C27.13,24.747 26.992,25.627 26.705,25.914 C25.89,26.73 25.309,26.342 25,26 L17.795,16.266 L9.819,24.27 L11.255,29.6 C10.688,29.032 7.38,24.602 7.301,24.521 C7.248,24.469 2.896,21.225 2.427,20.753 L7.538,22.133 L15.665,14.152 L6,7 C5.723,6.752 5.358,6.02 6.104,5.271 C6.392,4.984 7.262,4.897 7.97,5.12 L20.311,9.592 L27.864,2.175 C28.392,1.647 29.425,1.701 29.888,2.164 C30.35,2.627 30.382,3.636 29.854,4.163 Z M31.207,0.82 C29.961,-0.43 27.771,-0.137 26.518,1.119 L20.141,7.481 L8.313,3.061 C7.18,2.768 6.039,2.389 4.634,3.798 C3.917,4.516 2.427,6.01 4.634,8.221 L12.744,14.861 L7.467,20.127 L2.543,18.896 C1.813,18.708 1.321,18.855 0.946,19.269 C0.757,19.505 -0.614,20.521 0.342,21.479 L6.067,25.933 L10.521,31.658 C11.213,32.352 11.856,31.919 12.735,31.084 C13.292,30.526 13.172,30.239 13.004,29.426 L11.892,24.536 L17.133,19.277 L23.763,27.389 C25.969,29.6 27.46,28.105 28.177,27.389 C29.583,25.979 29.205,24.837 28.912,23.702 L24.529,11.854 L30.88,5.481 C32.133,4.226 32.454,2.069 31.207,0.82 Z"/>
                </svg>
                Airport Transfers
              </router-link>
            </li>

            <!-- Tours and Safaris → Binoculars icon (SVGrepo) -->
            <li>
              <router-link to="/safari" class="dropdown-item">
                <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M184.297,115.479c21.824,6.823,39.669,20.913,52.011,39.309l1.722-9.817
                    c6.339-30.336-7.542-63.542-38.33-73.158c-30.788-9.608-61.109,9.791-73.166,38.339l-2.944,6.372
                    c10.286-3.554,21.005-5.477,31.859-5.477C165.148,111.047,174.865,112.544,184.297,115.479z"/>
                  <path d="M60.34,321.976l60.356-60.348C87.365,261.628,60.34,288.646,60.34,321.976z"/>
                  <path d="M275.676,154.755c12.359-18.362,30.204-32.452,52.028-39.276c9.432-2.936,19.132-4.432,28.832-4.432
                    c10.854,0,21.591,1.923,31.875,5.494l-2.943-6.388c-12.058-28.548-42.378-47.947-73.167-38.339
                    c-30.772,9.616-44.669,42.822-38.331,73.158L275.676,154.755z"/>
                  <path d="M391.304,201.272c-56.175,0-103.369,38.365-116.848,90.318c-2.642-1.439-5.469-2.542-8.446-3.337
                    c1.723-6.589,3.948-12.969,6.64-19.115l0.134,0.811c20.085-45.538,65.625-77.439,118.522-77.439
                    c25.972,0,50.172,7.718,70.475,20.954l-12.593-27.318c-19.584-46.391-68.852-77.925-118.89-62.296
                    c-36.993,11.556-58.951,44.101-63.718,80.208c-3.294-1.27-6.84-2.007-10.586-2.007c-3.729,0-7.292,0.736-10.57,2.007
                    c-4.766-36.107-26.725-68.651-63.734-80.208c-50.021-15.628-99.29,15.905-118.89,62.296l-12.576,27.318
                    c20.302-13.236,44.502-20.954,70.474-20.954c52.881,0,98.436,31.901,118.506,77.439l0.15-0.811
                    c2.693,6.146,4.918,12.526,6.64,19.115c-2.976,0.794-5.82,1.898-8.462,3.337c-13.48-51.953-60.658-90.318-116.833-90.318
                    C54.035,201.272,0,255.315,0,321.976c0,66.653,54.035,120.696,120.696,120.696c53.751,0,99.273-35.137,114.893-83.694
                    c5.937,3.671,12.911,5.82,20.403,5.82c7.51,0,14.466-2.149,20.42-5.82c15.62,48.558,61.142,83.694,114.892,83.694
                    C457.966,442.672,512,388.63,512,321.976C512,255.315,457.966,201.272,391.304,201.272z M120.696,403.739
                    c-45.154,0-81.763-36.609-81.763-81.763s36.609-81.762,81.763-81.762c45.171,0,81.763,36.608,81.763,81.762
                    S165.867,403.739,120.696,403.739z M391.304,403.739c-45.171,0-81.762-36.609-81.762-81.763s36.592-81.762,81.762-81.762
                    c45.155,0,81.764,36.608,81.764,81.762S436.459,403.739,391.304,403.739z"/>
                  <path d="M330.948,321.976l60.356-60.348C357.957,261.628,330.948,288.646,330.948,321.976z"/>
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

        <!-- Admin/Editor Dropdown -->
        <li v-if="isLoggedIn && (isAdmin || isManager)" class="dropdown" @mouseenter="showAdminDropdown = true" @mouseleave="showAdminDropdown = false">
          <button class="nav-link dropdown-toggle">
            My Functions
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon" :class="{ 'rotate': showAdminDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <ul class="dropdown-menu" :class="{ 'show': showAdminDropdown }">
            <li v-if="isAdmin">
              <router-link to="/administrator" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Administrator
              </router-link>
            </li>

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

const isLoggedIn = ref(AuthService.isLoggedIn())
const isAdmin    = ref(AuthService.hasAbility("admin"))
const isManager  = ref(AuthService.hasAbility("manager"))

const showHotelsDropdown = ref(false)
const showAdminDropdown  = ref(false)

watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = AuthService.isLoggedIn()
    isAdmin.value    = AuthService.hasAbility("admin")
    isManager.value  = AuthService.hasAbility("manager")
  },
  { immediate: true }
)

const isAuthPage = ref(false)

watch(
  () => route.path,
  (path) => {
    isAuthPage.value = ["/login", "/signup"].includes(path.toLowerCase())
  },
  { immediate: true }
)
</script>