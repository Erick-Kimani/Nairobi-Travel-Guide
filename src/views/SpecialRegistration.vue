<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

// Form state
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

// Submission errors
const errors = ref({});

// Form submission
const submitForm = async () => {
  errors.value = {};
  try {
    // Send registration request to your API
    const response = await api.post('/manager-register', form.value); // ✅ Removed role field
    
    alert('Manager registration successful! Your service ID is: ' + response.data.manager.service_id);
    router.push('/login');
  } catch (err) {
    if (err.response && err.response.data.errors) {
      errors.value = err.response.data.errors;
    } else {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  }
};
</script>

<template>
  <section class="about-hero">
    <div class="overlay"></div>

    <div class="about-card glass-card">
      <h1>Manager Registration</h1>
      <p>
        This section is strictly for managers who want their restaurants, hotels, transport agencies,
        or other tourist-related destinations featured on the website.
      </p>

      <form @submit.prevent="submitForm" class="manager-form">
        <!-- Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="form.name" type="text" id="name" placeholder="Your Name" required>
          <span class="error" v-if="errors.name">{{ errors.name[0] }}</span>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" placeholder="Email" required>
          <span class="error" v-if="errors.email">{{ errors.email[0] }}</span>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" placeholder="Password" required>
          <span class="error" v-if="errors.password">{{ errors.password[0] }}</span>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" id="password_confirmation" placeholder="Confirm Password" required>
          <span class="error" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>
        </div>

        <button type="submit" class="btn-primary">Register as Manager</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.about-hero {
  height: 100vh;
  background-image: url("public/images/Evening rays.png");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

/* Glass Card */
.about-card {
  position: relative;
  padding: 30px;
  max-width: 500px;
  border-radius: 40px;
  color: #aa2f2f;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px) saturate(180%);
  border: 10px solid rgba(255, 255, 255, 0.25);
  display: flex;
  flex-direction: column;
}

/* Headings */
.about-card h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 16px;
}

/* Paragraph */
.about-card p {
  font-size: 1.2rem;
  margin-bottom: 24px;
  color: #e5e7eb;
}

/* Form */
.manager-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #e5e7eb;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  padding: 10px 15px;
  border-radius: 8px;
  border: 4px solid #ccc;
  font-size: 1.0rem;
}

.error {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 4px;
}

/* Button */
.btn-primary {
  background-color: #2c261b;
  color: #79ddcb;
  padding: 12px 28px;
  border-radius: 1000px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background-color: #e6c75a;
  color:#aa2f2f;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-card {
    max-width: 90%;
    padding: 30px;
  }
}

@media (max-width: 600px) {
  .about-card h1 {
    font-size: 1.6rem;
  }

  .about-card p {
    font-size: 1rem;
  }
}
</style>