<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-nav-icon @click="rail = !rail">
        <v-icon>{{ rail ? 'mdi-menu' : 'mdi-menu-open' }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">Analytics Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn icon="mdi-bell-outline" class="mr-2" />
      <v-avatar color="secondary" size="35" class="mr-4">
        {{ userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U' }}
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      elevation="2"
      @click="rail = false"
    >
      <v-list density="comfortable" nav>
        <v-list-item
          prepend-icon="mdi-account-details"
          title="1. My Profile"
          :active="currentView === 'profile'"
          @click="currentView = 'profile'"
          rounded="lg"
        />
      
        <v-list-item
          prepend-icon="mdi-cursor-default-click"
          title="2. Click Monitoring"
          :active="currentView === 'clicks'"
          @click="currentView = 'clicks'"
          rounded="lg"
        />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            variant="text"
            block
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          >
            <v-icon v-if="rail">mdi-chevron-right</v-icon>
            <span v-else>Collapse Menu</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    
    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-fade-transition hide-on-leave>
          
          <!-- User Profile Section -->
          <v-card v-if="currentView === 'profile'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">My Profile Details</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-table hover>
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Field</th>
                  <th class="text-left font-weight-bold">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{{ userProfile?.name || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Email Address</strong></td>
                  <td>{{ userProfile?.email || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Role Id</strong></td>
                  <td>{{ userProfile?.role_id || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Active/Inactive</strong></td>
                  <td>{{ userProfile?.is_active ? 'Active' : 'Inactive' }}</td>
                </tr>
                <tr>
                  <td><strong>Permissions/Abilities</strong></td>
                  <td>
                    <div class="d-flex ga-1 flex-wrap">
                      <v-chip v-for="ability in userProfile?.abilities" :key="ability" size="x-small" color="deep-orange">
                        {{ ability }}
                      </v-chip>
                      <span v-if="!userProfile?.abilities?.length" class="text-caption text-grey">Default Access</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>

          <!-- Click Monitoring Section - GROUPED BY SERVICE -->
          <div v-else-if="currentView === 'clicks'">
            <!-- Summary Card -->
            <v-card elevation="2" border class="mb-4">
              <v-toolbar flat color="white">
                <v-toolbar-title class="text-h6 font-weight-medium">
                  Click Monitoring - Overview
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn 
                  icon="mdi-refresh" 
                  @click="fetchClicks" 
                  :loading="loadingClicks"
                  title="Refresh data"
                ></v-btn>
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-card variant="tonal" color="primary">
                      <v-card-text>
                        <div class="text-h4 font-weight-bold">{{ totalServices }}</div>
                        <div class="text-caption">Total Services Tracked</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-card variant="tonal" color="success">
                      <v-card-text>
                        <div class="text-h4 font-weight-bold">{{ totalClicks }}</div>
                        <div class="text-caption">Total Clicks</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-card variant="tonal" color="secondary">
                      <v-card-text>
                        <div class="text-h4 font-weight-bold">{{ totalUsers }}</div>
                        <div class="text-caption">Unique Users</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Individual Service Tables -->
            <v-card 
              v-for="(serviceGroup, index) in groupedClicksByService" 
              :key="serviceGroup.service_id"
              elevation="2" 
              border
              class="mb-4"
            >
              <v-toolbar flat color="white">
                <v-chip color="secondary" variant="tonal" class="mr-3">
                  Service ID: {{ serviceGroup.service_id }}
                </v-chip>
                <v-toolbar-title class="text-h6 font-weight-medium">
                  {{ serviceGroup.service_name }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-chip color="success" variant="flat" size="small">
                  {{ serviceGroup.total_service_clicks }} Total Clicks
                </v-chip>
              </v-toolbar>
              <v-divider />
              
              <v-data-table
                :items="serviceGroup.clicks"
                :headers="clickHeaders"
                :loading="loadingClicks"
                hover
                items-per-page="10"
                class="elevation-0"
              >
                <!-- Format User ID -->
                <template #item.user_id="{ item }">
                  <v-chip size="small" color="primary" variant="tonal">
                    {{ item.user_id }}
                  </v-chip>
                </template>

                <!-- Format Service ID -->
                <template #item.service_id="{ item }">
                  <v-chip size="small" color="secondary" variant="tonal">
                    {{ item.service_id }}
                  </v-chip>
                </template>

                <!-- Format Total Clicks -->
                <template #item.total_clicks="{ item }">
                  <v-chip 
                    size="small" 
                    :color="item.total_clicks > 5 ? 'success' : 'default'"
                    variant="flat"
                  >
                    {{ item.total_clicks }}
                  </v-chip>
                </template>

                <!-- Format Last Clicked At -->
                <template #item.last_clicked_at="{ item }">
                  <span class="text-caption">
                    {{ formatDate(item.last_clicked_at) }}
                  </span>
                </template>
              </v-data-table>
            </v-card>

            <!-- Empty State -->
            <v-card v-if="!loadingClicks && groupedClicksByService.length === 0" elevation="2" border>
              <v-card-text class="text-center py-12">
                <v-icon size="64" color="grey-lighten-1">mdi-cursor-default-click-outline</v-icon>
                <p class="text-h6 text-grey mt-4">No click data available</p>
                <p class="text-caption text-grey">Clicks will appear here once users interact with services</p>
              </v-card-text>
            </v-card>
          </div>

        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

const drawer = ref(true);
const rail = ref(false); 
const currentView = ref("profile");
const clicks = ref([]);
const loadingClicks = ref(false);
const userProfile = ref(null);

const clickHeaders = [
  { title: "User ID", key: "user_id", align: "start" },
  { title: "User Name", key: "user_name" },
  { title: "Service ID", key: "service_id", align: "start" },
  { title: "Service Name", key: "service_name" },
  { title: "Total Clicks", key: "total_clicks", align: "center" },
  { title: "Last Clicked At", key: "last_clicked_at" },
];

// Computed: Group clicks by service_id
const groupedClicksByService = computed(() => {
  const grouped = {};
  
  clicks.value.forEach(click => {
    const serviceId = click.service_id;
    
    if (!grouped[serviceId]) {
      grouped[serviceId] = {
        service_id: serviceId,
        service_name: click.service_name,
        clicks: [],
        total_service_clicks: 0
      };
    }
    
    grouped[serviceId].clicks.push(click);
    grouped[serviceId].total_service_clicks += click.total_clicks;
  });
  
  // Convert to array and sort by total clicks (descending)
  return Object.values(grouped).sort((a, b) => 
    b.total_service_clicks - a.total_service_clicks
  );
});

// Computed: Summary statistics
const totalServices = computed(() => groupedClicksByService.value.length);

const totalClicks = computed(() => {
  return clicks.value.reduce((sum, click) => sum + click.total_clicks, 0);
});

const totalUsers = computed(() => {
  const uniqueUsers = new Set(clicks.value.map(click => click.user_id));
  return uniqueUsers.size;
});

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Nairobi'
  });
};

// API call to get current user profile
const fetchUserProfile = async () => {
  try {
    const res = await api.get("/me");
    userProfile.value = res.data;
  } catch (err) {
    console.error("Failed to load user profile info", err);
  }
};

const fetchClicks = async () => {
  loadingClicks.value = true;
  try {
    const res = await api.get("/click-analytics");
    clicks.value = res.data;
  } catch (err) {
    console.error("Failed to load clicks", err);
  } finally {
    loadingClicks.value = false;
  }
};

onMounted(async () => {
  try {
    await fetchUserProfile();
    await fetchClicks();
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
</script>

<style scoped>
.v-main {
  min-height: 100vh;
}
</style>