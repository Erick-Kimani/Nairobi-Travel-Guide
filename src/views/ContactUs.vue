<template>
  <div class="contact-page">
    <v-container fluid fill-height class="pa-0 d-flex align-center">
      <v-row justify="center" align="center" class="ma-0">
        <v-col cols="11" sm="7" md="5" lg="4" xl="3" class="ml-md-10 ml-lg-16">

          <!-- CONTACT FORM -->
          <v-card class="formal-glass-card" elevation="0">
            <div class="pa-8">
              <div class="mb-8">
                <h2 class="formal-title">Contact Us</h2>
                <div class="gold-divider"></div>
                <p class="subtitle mt-2">Inquiries & Guidance</p>
              </div>

              <v-form @submit.prevent="submitForm">
                <label class="input-label">Full Name</label>
                <v-text-field
                  v-model="contactForm.name"
                  placeholder="Enter your name"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  class="custom-input mb-4"
                  hide-details
                  required
                />

                <label class="input-label">Email Address</label>
                <v-text-field
                  v-model="contactForm.email"
                  placeholder="email@address.com"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  class="custom-input mb-4"
                  hide-details
                  type="email"
                  required
                />

                <label class="input-label">Inquiry Message</label>
                <v-textarea
                  v-model="contactForm.message"
                  placeholder="How may we assist you?"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  rows="3"
                  no-resize
                  class="custom-input mb-4"
                  hide-details
                  required
                />

                <!-- Error Message -->
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  density="compact"
                  class="mb-4"
                  closable
                  @click:close="error = null"
                >
                  {{ error }}
                </v-alert>

                <!-- Success Message -->
                <v-alert
                  v-if="success"
                  type="success"
                  variant="tonal"
                  density="compact"
                  class="mb-4"
                  closable
                  @click:close="success = null"
                >
                  {{ success }}
                </v-alert>

                <v-btn
                  block
                  height="50"
                  class="submit-btn"
                  :loading="loading"
                  type="submit"
                >
                  Send Inquiry
                </v-btn>
              </v-form>

              <!-- View My Messages Button -->
              <v-btn
                block
                height="40"
                class="view-messages-btn mt-4"
                @click="toggleMessageHistory"
                variant="outlined"
              >
                <v-icon left size="18" class="mr-2">mdi-history</v-icon>
                {{ showMessageHistory ? 'Hide My Messages' : 'View My Messages & Replies' }}
              </v-btn>

              <div class="mt-10 pt-6 contact-footer">
                <div class="footer-item">
                  <v-icon size="14" color="amber-lighten-2">mdi-phone</v-icon>
                  <span>+254 700 000 000</span>
                </div>
                <div class="footer-item mt-1">
                  <v-icon size="14" color="amber-lighten-2">mdi-email</v-icon>
                  <span>concierge@luxelodging.com</span>
                </div>
              </div>
            </div>
          </v-card>

          <!-- MESSAGE HISTORY SECTION -->
          <v-expand-transition>
            <v-card
              v-if="showMessageHistory"
              class="formal-glass-card mt-6"
              elevation="0"
            >
              <div class="pa-6">
                <div class="d-flex justify-space-between align-center mb-4">
                  <div>
                    <h3 class="formal-reply-title">My Messages & Replies</h3>
                    <div class="gold-divider"></div>
                  </div>
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    :loading="loadingHistory"
                    @click="fetchMessageHistory"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>

                <!-- Loading State -->
                <div v-if="loadingHistory" class="text-center py-8">
                  <v-progress-circular
                    indeterminate
                    color="amber-lighten-2"
                  ></v-progress-circular>
                  <p class="mt-4 text-caption">Loading messages...</p>
                </div>

                <!-- No Messages -->
                <v-alert
                  v-else-if="messageHistory.length === 0"
                  type="info"
                  variant="tonal"
                  density="compact"
                  class="mb-0"
                >
                  You haven't sent any messages yet.
                </v-alert>

                <!-- Message List -->
                <div v-else class="message-list">
                  <v-card
                    v-for="msg in messageHistory"
                    :key="msg.id"
                    class="message-card mb-4"
                    elevation="0"
                  >
                    <div class="pa-4">
                      <!-- Message Header -->
                      <div class="d-flex justify-space-between align-center mb-3">
                        <div class="d-flex align-center">
                          <v-icon size="20" color="amber-lighten-2" class="mr-2">mdi-email</v-icon>
                          <span class="message-date">{{ formatDate(msg.created_at) }}</span>
                        </div>
                        <v-chip
                          size="x-small"
                          :color="msg.reply ? 'success' : 'grey'"
                          variant="flat"
                        >
                          {{ msg.reply ? 'Replied' : 'Pending' }}
                        </v-chip>
                      </div>

                      <!-- Your Message -->
                      <div class="message-section">
                        <p class="message-label">Your Message:</p>
                        <p class="message-text">{{ msg.message }}</p>
                      </div>

                      <!-- Admin Reply (if exists) -->
                      <div v-if="msg.reply" class="reply-section mt-4 pa-3">
                        <div class="d-flex align-center mb-2">
                          <v-icon size="18" color="amber-lighten-2" class="mr-2">mdi-reply</v-icon>
                          <p class="reply-label">Concierge Reply:</p>
                        </div>
                        <p class="reply-text">{{ msg.reply }}</p>
                        <p class="reply-date mt-2">
                          <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>
                          {{ formatDate(msg.replied_at) }}
                        </p>
                      </div>

                      <!-- No Reply Yet -->
                      <div v-else class="no-reply-section mt-4 pa-3">
                        <p class="no-reply-text">
                          <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                          Awaiting reply from our concierge team...
                        </p>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </v-card>
          </v-expand-transition>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const loadingHistory = ref(false)
const error = ref(null)
const success = ref(null)

const showMessageHistory = ref(false)
const messageHistory = ref([])

/* Format date */
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* Toggle message history visibility */
const toggleMessageHistory = () => {
  showMessageHistory.value = !showMessageHistory.value
  
  // Auto-load messages when opening
  if (showMessageHistory.value) {
    fetchMessageHistory()
  }
}

/* Submit contact form */
const submitForm = async () => {
  // Validate form
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = null
  success.value = null

  try {
    await api.post('/contactuses', contactForm.value)
    success.value = 'Message sent successfully! We will respond shortly.'
    
    // Clear only the message field
    contactForm.value.message = ''
    
    // Auto-show message history after 1 second
    setTimeout(() => {
      showMessageHistory.value = true
      fetchMessageHistory()
    }, 1000)
  } catch (err) {
    console.error('Contact form error:', err)
    error.value = err.response?.data?.message || 'Failed to send message. Please try again.'
  } finally {
    loading.value = false
  }
}

/* Fetch message history - uses authentication (user_id) */
const fetchMessageHistory = async () => {
  loadingHistory.value = true
  error.value = null

  try {
    //  FIXED: Use /contactuses endpoint which filters by user_id automatically
    const res = await api.get('/contactuses')
    
    // Backend returns { Contactus: [...] }
    messageHistory.value = res.data.Contactus || []
    
  } catch (err) {
    console.error('Fetch history error:', err)
    messageHistory.value = []
    
    if (err.response?.status === 401) {
      error.value = 'Please log in to view your messages.'
    } else if (err.response?.status === 403) {
      error.value = 'You do not have permission to view these messages.'
    } else if (err.response?.status === 500) {
      error.value = 'Server error. Please try again later.'
    } else {
      error.value = 'Could not load message history. Please try again.'
    }
  } finally {
    loadingHistory.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('/images/Picture 21 .jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding: 40px 0;
}

.formal-glass-card {
  background: rgba(0, 0, 0, 0.45) !important;
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 19px !important;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
}

.formal-title {
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.formal-reply-title {
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  color: #FFC107;
}

.gold-divider {
  width: 30px;
  height: 1.5px;
  background-color: #FFC107;
  margin-top: 6px;
}

.subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.input-label {
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
}

.submit-btn {
  background: transparent !important;
  border: 1px solid #FFC107 !important;
  color: #FFC107 !important;
  border-radius: 0 !important;
  letter-spacing: 3px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #FFC107 !important;
  color: #000 !important;
}

.view-messages-btn {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  border-radius: 0 !important;
  letter-spacing: 2px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.view-messages-btn:hover {
  border-color: #FFC107 !important;
  color: #FFC107 !important;
}

.contact-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
}

/* Message History Styles */
.message-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px !important;
}

.message-date {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
}

.message-section {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 12px;
}

.message-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
}

.message-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.reply-section {
  background: rgba(76, 175, 80, 0.1);
  border-left: 3px solid #4CAF50;
  border-radius: 8px;
}

.reply-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #4CAF50;
  font-weight: 500;
  margin: 0;
}

.reply-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.reply-date {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  display: flex;
  align-items: center;
}

.no-reply-section {
  background: rgba(255, 193, 7, 0.05);
  border-left: 3px solid rgba(255, 193, 7, 0.3);
  border-radius: 8px;
}

.no-reply-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  display: flex;
  align-items: center;
  font-style: italic;
}
</style>