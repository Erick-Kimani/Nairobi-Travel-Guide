import { createRouter, createWebHistory } from "vue-router"

// Views
import Home from "@/views/Home.vue"
import AboutUs from "@/views/Aboutus.vue"
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import ContactUs from "@/views/ContactUs.vue"
import ClickAnalytics from "@/views/ClickAnalytics.vue"
import Transit from "@/views/Transit.vue"
import TransitDetails from "@/views/TransitDetails.vue"
import Administrator from "@/views/Administrator.vue"
import Choice from "@/views/Choice.vue"
import Safari from "@/views/Safari.vue"
import SafariDetails from "@/views/SafariDetails.vue"
import Airport from "@/views/Airport.vue"
import AirportDetails from "@/views/AirportDetails.vue"
import Vacation from "@/views/Vacation.vue"
import VacationDetails from "@/views/VacationDetails.vue"
import SpecialRegistration from "@/views/SpecialRegistration.vue"

// Blog (Landing Page)
import Blog from "@/components/Blog.vue"

// Services
import api from "@/services/api"
import TokenService from "@/services/TokenService"
import AuthService from "@/services/authService"

const routes = [
  /* =========================
     🌍 PUBLIC ROUTES
  ========================== */

  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta: {
      hideLayout: true // 🚫 Hide Navbar & Footer
    }
  },
  {
    path: "/specialregistration",
    name: "specialregistration",
    component: SpecialRegistration,
    meta: {
      guestOnly: true,
      hideLayout: true // 🚫 Hide Navbar & Footer
    }
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { 
      guestOnly: true,
      hideLayout: true // 🚫 Hide Navbar & Footer
     }
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: { 
      guestOnly: true,
      hideLayout: true // 🚫 Hide Navbar & Footer
     }
  },

  /* =========================
     🔒 PROTECTED ROUTES
  ========================== */

  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: AboutUs,
    meta: { requiresAuth: true }
  },
  {
    path: "/choice",
    name: "choice",
    component: Choice,
    meta: { requiresAuth: true }
  },
  {
    path: "/contactus",
    name: "contactus",
    component: ContactUs,
    meta: { requiresAuth: true }
  },
  {
    path: "/vacation",
    name: "vacation",
    component: Vacation,
    meta: { requiresAuth: true }
  },
  {
    path: "/vacationdetails",
    name: "vacationdetails",
    component: VacationDetails,
    meta: { requiresAuth: true }
  },
  {
    path: "/transit",
    name: "transit",
    component: Transit,
    meta: { requiresAuth: true }
  },
  {
    path: "/transitdetails",
    name: "transitdetails",
    component: TransitDetails,
    meta: { requiresAuth: true }
  },
 
  {
    path: "/safari",
    name: "safari",
    component: Safari,
    meta: { requiresAuth: true }
  },
  {
    path: "/safaridetails",
    name: "safaridetails",
    component: SafariDetails,
    meta: { requiresAuth: true }
  },
  {
    path: "/airport",
    name: "airport",
    component: Airport,
    meta: { requiresAuth: true }
  },
  {
    path: "/airportdetails",
    name: "airportdetails",
    component: AirportDetails,
    meta: { requiresAuth: true }
  },
   
  {
    path: "/administrator",
    name: "administrator",
    component: Administrator,
    meta: {
      requiresAuth: true,
      ability: "admin" , 
    }
  },
  {
    path: "/clickanalytics",
    name: "clickanalytics",
    component: ClickAnalytics,
    meta: {
      requiresAuth: true,
      ability: ["admin", "manager"]
    }
  },

  /* =========================
     ❗ FALLBACK
  ========================== */

  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/* =========================
   🔐 GLOBAL AUTH GUARD
========================== */

router.beforeEach(async (to, from, next) => {
  const token = TokenService.getToken()

  // 🚫 Logged-in users shouldn't see login/signup
  if (to.meta.guestOnly && token) {
    return next("/home")
  }

  // 🔒 Auth required
  if (to.meta.requiresAuth && !token) {
  return next("/login")
}

  // 🔐 Ability / role check
  if (to.meta.ability) {
    const hasAbility = AuthService.hasAbility(to.meta.ability)
    if (!hasAbility) {
      alert("404 Page Not Found .")
      return next("/home")
    }
  }

  next()
})

export default router
