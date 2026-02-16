<template>
  <v-container
    fluid
    class="d-flex flex-column align-center justify-center login-background"
    style="min-height: 100vh; background-image: url('public/images/Hotair balloon.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
    <v-card class="pa-8 login-card glass-card" elevation="16">
      <v-card-title class="text-h4 text-center mb-6">
        Secure Login
      </v-card-title>

      <v-card-text>
        <!-- Login Form -->
        <v-text-field
          v-model="email"
          label="Email Address"
          variant="outlined"
          color="deep-orange-darken-2"
          type="email"
          required
        />

        <v-text-field
          v-model="password"
          label="Password"
          variant="outlined"
          color="deep-orange-darken-2"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          required
        />

        <v-btn
          color="deep-orange-darken-2"
          block
          class="mt-5"
          size="large"
          @click="login"
        >
          Login
        </v-btn>

        <!-- Sign up link -->
        <div class="text-center mt-4">
          <span>Don't have an account?</span>
          <v-btn variant="text" color="deep-orange-darken-2" @click="goToSignup">
            Sign Up
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

const email = ref("");
const password = ref("");
const showPassword = ref(false);

async function login() {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Save token
    TokenService.setToken(response.data);

    localStorage.setItem("isUserLoggedIn", true);

    alert("Login Successful!");

    // Redirect based on abilities/role
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
.login-background {
  min-height: 100vh;
  background-image: url('public/images/Hotair balloon.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Glass Card Styling */
.glass-card {
  width: 100%;
  max-width: 450px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.18);
  border: 15px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #212121;
}
</style>
