<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const phase = ref(1);

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const serviceForm = ref({
  user_id:         null,
  name:            '',
  description:     '',
  category:        '',
  website_url:     '',
  service_image_1: null,
});

const categories = ref([]);
const errors = ref({});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

onMounted(async () => {
  try {
    const response = await api.get('/public-categories');
    categories.value = response.data.Category ?? [];
  } catch (err) {
    console.error('Categories fetch failed:', err.response ?? err.message);
  }
});

const submitPhase1 = async () => {
  errors.value = {};
  try {
    const response = await api.post('/manager-register', form.value);
    serviceForm.value.user_id = response.data.user_id;
    phase.value = 2;
  } catch (err) {
    if (err.response && err.response.data.errors) {
      errors.value = err.response.data.errors;
    } else {
      console.error('Phase 1 error:', err);
      alert('Registration failed. Please try again.');
    }
  }
};

const handleImageUpload = (event, field) => {
  serviceForm.value[field] = event.target.files[0];
};

const submitPhase2 = async () => {
  errors.value = {};
  try {
    const formData = new FormData();
    formData.append('user_id',         serviceForm.value.user_id);
    formData.append('name',            serviceForm.value.name);
    formData.append('description',     serviceForm.value.description);
    formData.append('category',        serviceForm.value.category);
    formData.append('website_url',     serviceForm.value.website_url);
    formData.append('service_image_1', serviceForm.value.service_image_1);

    await api.post('/manager-register/service', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Registration complete! Please check your email to verify your account then log in.');
    router.push('/login');

  } catch (err) {
    if (err.response && err.response.data.errors) {
      errors.value = err.response.data.errors;
    } else {
      console.error('Phase 2 error:', err);
      alert('Service registration failed. Please try again.');
    }
  }
};
</script>

<template>
  <section class="about-hero">
    <div class="overlay"></div>

    <div class="about-card glass-card">

      <!-- ======================== PHASE 1 ======================== -->
      <template v-if="phase === 1">
        <h1>Manager Registration</h1>
        <p>
          This section is strictly for managers who want their restaurants, hotels, transport agencies,
          or other tourist-related destinations featured on the website.
        </p>

        <form @submit.prevent="submitPhase1" class="manager-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input v-model="form.name" type="text" id="name" placeholder="Your Name" required>
            <span class="error" v-if="errors.name">{{ errors.name[0] }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="form.email" type="email" id="email" placeholder="Email" required>
            <span class="error" v-if="errors.email">{{ errors.email[0] }}</span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Password"
                required
              >
              <button
                type="button"
                class="eye-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <!-- Eye Off -->
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.83 9L15 12.16V12A3 3 0 0 0 12 9H11.83M7.53 9.8L9.08 11.35C9.03 11.56 9 11.77 9 12A3 3 0 0 0 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17A5 5 0 0 1 7 12C7 11.21 7.2 10.47 7.53 9.8M2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.08L19.73 22L21 20.73L3.27 3M12 7A5 5 0 0 1 17 12C17 12.64 16.87 13.26 16.64 13.82L19.57 16.75C21.07 15.5 22.27 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.35C10.74 7.13 11.35 7 12 7Z" />
                </svg>
                <!-- Eye On -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9A3 3 0 0 0 9 12A3 3 0 0 0 12 15A3 3 0 0 0 15 12A3 3 0 0 0 12 9M12 17A5 5 0 0 1 7 12A5 5 0 0 1 12 7A5 5 0 0 1 17 12A5 5 0 0 1 12 17M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" />
                </svg>
              </button>
            </div>
            <span class="error" v-if="errors.password">{{ errors.password[0] }}</span>
          </div>

          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <div class="input-wrapper">
              <input
                v-model="form.password_confirmation"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                id="password_confirmation"
                placeholder="Confirm Password"
                required
              >
              <button
                type="button"
                class="eye-toggle"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                :aria-label="showPasswordConfirmation ? 'Hide password' : 'Show password'"
              >
                <!-- Eye Off -->
                <svg v-if="showPasswordConfirmation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.83 9L15 12.16V12A3 3 0 0 0 12 9H11.83M7.53 9.8L9.08 11.35C9.03 11.56 9 11.77 9 12A3 3 0 0 0 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17A5 5 0 0 1 7 12C7 11.21 7.2 10.47 7.53 9.8M2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.08L19.73 22L21 20.73L3.27 3M12 7A5 5 0 0 1 17 12C17 12.64 16.87 13.26 16.64 13.82L19.57 16.75C21.07 15.5 22.27 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.35C10.74 7.13 11.35 7 12 7Z" />
                </svg>
                <!-- Eye On -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9A3 3 0 0 0 9 12A3 3 0 0 0 12 15A3 3 0 0 0 15 12A3 3 0 0 0 12 9M12 17A5 5 0 0 1 7 12A5 5 0 0 1 12 7A5 5 0 0 1 17 12A5 5 0 0 1 12 17M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" />
                </svg>
              </button>
            </div>
            <span class="error" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>
          </div>

          <button type="submit" class="btn-primary">Next — Add Service Details</button>
        </form>
      </template>

      <!-- ======================== PHASE 2 ======================== -->
      <template v-if="phase === 2">
        <h1>Service Details</h1>
        <p>Almost done! Fill in your service details to complete your registration.</p>

        <form @submit.prevent="submitPhase2" class="manager-form">

          <div class="form-group">
            <label for="service_name">Service / Property Name</label>
            <input v-model="serviceForm.name" type="text" id="service_name" placeholder="e.g. Emakoko Lodge" required>
            <span class="error" v-if="errors.name">{{ errors.name[0] }}</span>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="serviceForm.description" id="description" placeholder="Describe your property or service…" rows="3" required></textarea>
            <span class="error" v-if="errors.description">{{ errors.description[0] }}</span>
          </div>

          <div class="form-group">
            <label for="website_url">Website URL</label>
            <input v-model="serviceForm.website_url" type="url" id="website_url" placeholder="https://yourwebsite.com" required>
            <span class="error" v-if="errors.website_url">{{ errors.website_url[0] }}</span>
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select v-model="serviceForm.category" id="category" required>
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
            <span class="error" v-if="errors.category">{{ errors.category[0] }}</span>
          </div>

          <div class="form-group">
            <label>Service Image</label>
            <input type="file" accept="image/*" @change="handleImageUpload($event, 'service_image_1')" required>
            <span class="error" v-if="errors.service_image_1">{{ errors.service_image_1[0] }}</span>
          </div>

          <div class="button-row">
            <button type="button" class="btn-secondary" @click="phase = 1">Back</button>
            <button type="submit" class="btn-primary">Complete Registration</button>
          </div>

        </form>
      </template>

    </div>
  </section>
</template>

<style scoped>
.about-hero {
  min-height: 100vh;
  background-image: url("public/images/Evening rays.png");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.about-card {
  position: relative;
  padding: 30px;
  max-width: 500px;
  width: 100%;
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

.about-card h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 16px;
}

.about-card p {
  font-size: 1.1rem;
  margin-bottom: 24px;
  color: #e5e7eb;
}

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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 15px;
  border-radius: 8px;
  border: 4px solid #ccc;
  font-size: 1rem;
  background: rgba(255,255,255,0.85);
  font-family: inherit;
  resize: vertical;
}

/* Password input wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding-right: 44px; /* room for the eye icon */
  box-sizing: border-box;
}

.eye-toggle {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: color 0.2s ease;
}

.eye-toggle:hover {
  color: #2c261b;
}

.eye-toggle svg {
  width: 22px;
  height: 22px;
}

.error {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 4px;
}

.button-row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

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
  color: #aa2f2f;
}

.btn-secondary {
  background-color: transparent;
  color: #e5e7eb;
  padding: 12px 28px;
  border-radius: 1000px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background-color: rgba(255,255,255,0.15);
}

@media (max-width: 1024px) {
  .about-card { max-width: 90%; padding: 30px; }
}

@media (max-width: 600px) {
  .about-card h1 { font-size: 1.6rem; }
  .about-card p  { font-size: 1rem; }
}
</style>