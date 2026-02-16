<template>
  <v-container
    fluid
    class="d-flex flex-column align-center justify-center login-background"
    style="min-height: 100vh; background-image: url('public/images/Hotair balloon.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
    <v-card class="pa-8 glass-card" elevation="16">
      <v-btn icon="mdi-bell-outline" class="mr-2"  router-link to="/specialregistration" />
      <v-card-title class="text-h4 text-center mb-6">
        Create Your Account
      </v-card-title>

      <v-card-text>
        <!-- FULL NAME -->
        <v-text-field
          v-model="name"
          label="Full Name"
          variant="outlined"
          color="deep-orange-darken-2"
          prepend-inner-icon="mdi-account"
          required
        />

        <!-- EMAIL -->
        <v-text-field
          v-model="email"
          label="Email Address"
          variant="outlined"
          color="deep-orange-darken-2"
          prepend-inner-icon="mdi-email"
          type="email"
          required
        />

        <!-- PASSWORD -->
        <v-text-field
          v-model="password"
          label="Password"
          variant="outlined"
          color="deep-orange-darken-2"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          required
        />

        <!-- CONFIRM PASSWORD -->
        <v-text-field
          v-model="password_confirmation"
          label="Confirm Password"
          variant="outlined"
          color="deep-orange-darken-2"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          type="password"
          required
        />


        
        <!-- NORMAL SIGN UP -->
        <v-btn
          color="deep-orange-darken-2"
          block
          class="mt-5"
          size="large"
          @click="signup"
        >
          Sign Up
        </v-btn>

        

        <!-- LOGIN LINK -->
        <div class="text-center mt-4">
          <span>Already have an account?</span>
          <v-btn variant="text" color="deep-orange-darken-2" @click="goToLogin">
            Login
          </v-btn>
        </div>
        
      </v-card-text>
    </v-card>
  </v-container>
  
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import TokenService from "@/services/TokenService";

const router = useRouter();

// Form fields
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const showPassword = ref(false);

// ===============================
// NORMAL USER SIGN UP FUNCTION
// ===============================
async function signup() {
  try {
    const response = await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });


    alert("Registration successful! Please log in.");
    router.push("/login");
  } catch (error) {
    console.error("Signup Failed:", error.response?.data || error.message);
    alert("Signup failed. Please check your details.");
  }
}


// LOGIN PAGE NAVIGATION
function goToLogin() {
  router.push("/login");
}
</script>

<style scoped>
.login-background {
  min-height: 100vh;
  background-image: url('public/images/Hotair balloon.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.glass-card {
  width: 100%;
  max-width: 480px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.18);
  border: 15px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #212121;
}
</style>
