<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const choices = ref([
  {
    id: 1,
    title: 'Vacation Hotels',
    description: 'Resorts and stays designed for relaxation and leisure.',
    link: '/vacation',
    image: '/images/Picture 25 .jpg'
  },
  {
    id: 2,
    title: 'Transit Hotels',
    description: 'Convenient stays near airports and major travel hubs.',
    link: '/transit',
    image: '/images/Picture 26 .jpg'
  },
  {
    id: 3,
    title: 'Meeting Rooms',
    description: 'Professional spaces for corporate events and workshops.',
    link: '/meeting',
    image: '/images/Picture 28 .jpg'
  },
  {
    id: 4,
    title: 'Service Apartments',
    description: 'Fully furnished apartments for long-term stays.',
    link: '/service',
    image: '/images/Picture 29 .jpg'
  },
  {
    id: 5,
    title: 'Transportation Services/Guided Tours',
    description: 'Comfortable transit options and curated local experiences.',
    link: '/transport',
    image: '/images/Picture 30 .jpg'
  }
])

// ── Add-service modal state ──────────────────────────────────────
const showAddModal     = ref(false)
const approvedServices = ref([])
const loadingServices  = ref(false)
const addingService    = ref(false)
const selectedService  = ref(null)
const successMessage   = ref('')

// Category map mirrors the admin's categoryMap
const categoryMap = {
  1: 'Vacation Hotels',
  2: 'Transit Hotels',
  3: 'Meeting Rooms',
  4: 'Service Apartments',
  5: 'Transportation Services/Guided Tours',
}

const getCategoryName = (service) => {
  if (service?.category?.name) return service.category.name
  if (service?.category_id)    return categoryMap[service.category_id] ?? `Category ${service.category_id}`
  return 'Uncategorized'
}

const getImageUrl = (path) =>
  path ? `http://127.0.0.1:8000/storage/${path}` : null

// Load approved services from the manager approval endpoint
const loadApprovedServices = async () => {
  loadingServices.value = true
  approvedServices.value = []
  try {
    const res = await api.get('/managers')
    const managers = res.data.managers ?? res.data ?? []
    // Filter only approved ones that have a service attached
    approvedServices.value = managers.filter(
      (m) => m.service && m.service.status === 'approved'
    )
  } catch (err) {
    console.error('Failed to load approved services', err)
  } finally {
    loadingServices.value = false
  }
}

const openAddModal = () => {
  selectedService.value = null
  successMessage.value  = ''
  showAddModal.value    = true
  loadApprovedServices()
}

const closeAddModal = () => {
  showAddModal.value   = false
  selectedService.value = null
  successMessage.value  = ''
}

// Publish the selected approved service into its category
const publishService = async () => {
  if (!selectedService.value) return
  addingService.value = true
  try {
    await api.post(`/managers/${selectedService.value.id}/publish`)
    successMessage.value = `"${selectedService.value.service?.name ?? 'Service'}" has been added to ${getCategoryName(selectedService.value.service)} successfully!`
    // Remove it from the list so it can't be added twice
    approvedServices.value = approvedServices.value.filter(
      (m) => m.id !== selectedService.value.id
    )
    selectedService.value = null
  } catch (err) {
    console.error('Failed to publish service', err)
    alert('Failed to add service. Please try again.')
  } finally {
    addingService.value = false
  }
}
</script>


<template>
  <div class="choice-container">
    <header class="header">
      <h1>Select a Category</h1>
      <p>Choose the type of accommodation or space you are looking for.</p>
    </header>

    <div class="card-grid">
      <!-- Existing category cards -->
      <router-link
        v-for="item in choices"
        :key="item.id"
        :to="item.link"
        class="card-border-wrapper"
      >
        <div class="card">
          <img :src="item.image" alt="Category image" class="card-image" />
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="explore-btn">Explore →</span>
          </div>
        </div>
      </router-link>

      <!-- ── Add Card ── -->
      <div class="card-border-wrapper add-card-wrapper" @click="openAddModal">
        <div class="card add-card">
          <div class="add-card-inner">
            <div class="add-icon-ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span class="add-label">Add</span>
            <p class="add-sub">Add an approved service to its category</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════
         Add Service Modal
    ══════════════════════════════════════════════ -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
          <div class="modal-box">
            <!-- Header -->
            <div class="modal-header">
              <h2>Add Approved Service</h2>
              <button class="modal-close" @click="closeAddModal">✕</button>
            </div>

            <!-- Body -->
            <div class="modal-body">
              <!-- Success banner -->
              <transition name="slide-down">
                <div v-if="successMessage" class="success-banner">
                  <span>✓</span> {{ successMessage }}
                </div>
              </transition>

              <!-- Loading state -->
              <div v-if="loadingServices" class="modal-loading">
                <div class="spinner" />
                <p>Loading approved services…</p>
              </div>

              <!-- Empty state -->
              <div
                v-else-if="!loadingServices && approvedServices.length === 0 && !successMessage"
                class="modal-empty"
              >
                <div class="empty-icon">📭</div>
                <p>No approved services available to add right now.</p>
              </div>

              <!-- Service list -->
              <div v-else class="service-list">
                <p class="service-list-hint">
                  Select a service to add it to its designated category:
                </p>
                <div
                  v-for="manager in approvedServices"
                  :key="manager.id"
                  class="service-item"
                  :class="{ 'service-item--selected': selectedService?.id === manager.id }"
                  @click="selectedService = manager"
                >
                  <!-- Thumbnail -->
                  <div class="service-thumb">
                    <img
                      v-if="manager.service?.service_image_1"
                      :src="getImageUrl(manager.service.service_image_1)"
                      alt="Service image"
                    />
                    <div v-else class="thumb-placeholder">🏨</div>
                  </div>

                  <!-- Info -->
                  <div class="service-info">
                    <strong>{{ manager.service?.name ?? '—' }}</strong>
                    <span class="category-badge">{{ getCategoryName(manager.service) }}</span>
                    <p class="manager-name">Manager: {{ manager.name }}</p>
                  </div>

                  <!-- Selected indicator -->
                  <div v-if="selectedService?.id === manager.id" class="selected-check">✓</div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <button class="btn-cancel" @click="closeAddModal">Cancel</button>
              <button
                class="btn-add"
                :disabled="!selectedService || addingService"
                @click="publishService"
              >
                <span v-if="addingService" class="btn-spinner" />
                <span v-else>Add to Category</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* =========================
   Page Layout
========================= */
.choice-container {
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.4rem;
  color: #2c3e50;
}

.header p {
  color: #666;
}

/* =========================
   Grid
========================= */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

/* =========================
   Card Border Wrapper
========================= */
.card-border-wrapper {
  background: url('/images/Picture 5 .jpg') center / cover no-repeat;
  padding: 9px;
  border-radius: 24px;
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.card-border-wrapper:hover {
  transform: translateY(-10px);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.3);
}

/* =========================
   Inner Card
========================= */
.card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  color: inherit;
}

/* =========================
   Card Image
========================= */
.card-image {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

/* =========================
   Card Content
========================= */
.card-content {
  padding: 22px;
}

.card-content h3 {
  margin-bottom: 10px;
  color: #2c3e50;
  font-size: 1.25rem;
}

.card-content p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 18px;
  line-height: 1.6;
}

.explore-btn {
  font-weight: 600;
  color: #42b883;
  font-size: 0.9rem;
}

/* =========================
   Add Card
========================= */
.add-card-wrapper {
  cursor: pointer;
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%);
}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  background: #fafffe;
  border: 2px dashed #b2dfdb;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.add-card-wrapper:hover .add-card {
  background: #f0fdf4;
  border-color: #42b883;
}

.add-card-inner {
  text-align: center;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.add-icon-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
  border: 2px solid #c8e6c9;
  transition: background 0.25s ease, transform 0.25s ease;
}

.add-card-wrapper:hover .add-icon-ring {
  background: #42b883;
  color: #fff;
  transform: scale(1.08);
}

.add-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.add-sub {
  font-size: 0.88rem;
  color: #888;
  max-width: 180px;
  line-height: 1.5;
  margin: 0;
}

/* =========================
   Modal Overlay
========================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-box {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* ── Modal Header ── */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 0;
}

.modal-close {
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  font-size: 0.85rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #ffe0e0;
  color: #e53935;
}

/* ── Modal Body ── */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
}

.modal-loading,
.modal-empty {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.spinner,
.btn-spinner {
  border: 3px solid #e0e0e0;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

.spinner {
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
}

.btn-spinner {
  width: 16px;
  height: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* ── Service List ── */
.service-list-hint {
  font-size: 0.88rem;
  color: #888;
  margin-bottom: 14px;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border: 2px solid #f0f0f0;
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  position: relative;
}

.service-item:hover {
  border-color: #42b883;
  background: #f6fff9;
}

.service-item--selected {
  border-color: #42b883;
  background: #f0fdf4;
}

.service-thumb {
  width: 58px;
  height: 58px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-placeholder {
  font-size: 1.6rem;
}

.service-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-info strong {
  font-size: 0.98rem;
  color: #2c3e50;
}

.category-badge {
  display: inline-block;
  font-size: 0.75rem;
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 20px;
  padding: 2px 10px;
  font-weight: 600;
  width: fit-content;
}

.manager-name {
  font-size: 0.8rem;
  color: #999;
  margin: 0;
}

.selected-check {
  width: 26px;
  height: 26px;
  background: #42b883;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* ── Success Banner ── */
.success-banner {
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 0.92rem;
  font-weight: 500;
}

/* ── Modal Footer ── */
.modal-footer {
  padding: 18px 28px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel {
  padding: 10px 22px;
  border: none;
  background: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.92rem;
  color: #555;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #e8e8e8;
}

.btn-add {
  padding: 10px 26px;
  border: none;
  background: #42b883;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, opacity 0.2s;
}

.btn-add:hover:not(:disabled) {
  background: #37a372;
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* =========================
   Modal Transitions
========================= */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>