<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-nav-icon @click="rail = !rail">
        <v-icon>{{ rail ? 'mdi-menu' : 'mdi-menu-open' }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">Admin Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn icon="mdi-bell-outline" class="mr-2" />
      <v-avatar color="secondary" size="35" class="mr-4">
        {{ userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'AD' }}
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
        <!-- Admin Profile -->
        <v-list-item
          prepend-icon="mdi-account-details"
          title="Admin Profile"
          :active="currentView === 'profile'"
          @click="currentView = 'profile'"
          rounded="lg"
        />

        <!-- Category Tables (Expandable Group) -->
        <v-list-group value="categories">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-table-multiple"
              title="Category Tables"
              rounded="lg"
            />
          </template>

          <v-list-item
            prepend-icon="mdi-palm-tree"
            title="Vacations"
            :active="currentView === 'vacations'"
            @click="currentView = 'vacations'"
            rounded="lg"
            class="pl-8"
          />
          <v-list-item
            prepend-icon="mdi-bus"
            title="Transit"
            :active="currentView === 'transit'"
            @click="currentView = 'transit'"
            rounded="lg"
            class="pl-8"
          />
          <v-list-item
            prepend-icon="mdi-account-group"
            title="Meeting"
            :active="currentView === 'meeting'"
            @click="currentView = 'meeting'"
            rounded="lg"
            class="pl-8"
          />
          <v-list-item
            prepend-icon="mdi-room-service"
            title="Services"
            :active="currentView === 'services'"
            @click="currentView = 'services'"
            rounded="lg"
            class="pl-8"
          />
        </v-list-group>

        <!-- User Profiles -->
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="User Profiles"
          :active="currentView === 'userProfiles'"
          @click="currentView = 'userProfiles'"
          rounded="lg"
        />

        <!-- Contact Messages -->
        <v-list-item
          prepend-icon="mdi-email-outline"
          title="Contact Messages"
          :active="currentView === 'contacts'"
          @click="loadContacts"
          rounded="lg"
        />

        <!-- Click Monitoring -->
        <v-list-item
          prepend-icon="mdi-cursor-default-click"
          title="Click Monitoring"
          :active="currentView === 'clicks'"
          @click="currentView = 'clicks'"
          rounded="lg"
        />

        <!-- Manager Approval -->
        <v-list-item
          prepend-icon="mdi-clipboard-check"
          title="Manager Approval"
          :active="currentView === 'approvals'"
          @click="loadManagerApprovals(); currentView = 'approvals'"
          rounded="lg"
        />

        <!-- ── NEW: Publish Service ── -->
        <v-list-item
          prepend-icon="mdi-plus-circle-outline"
          title="Published Service"
          :active="currentView === 'publishService'"
          @click="openPublishView"
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

          <!-- Admin Profile Section -->
          <v-card v-if="currentView === 'profile'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">Logged-in Admin Details</v-toolbar-title>
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
                  <td><strong>Admin Name</strong></td>
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
                      <span v-if="!userProfile?.abilities?.length" class="text-caption text-grey">Default Admin Access</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>

          <!-- Vacations Table -->
          <v-card v-if="currentView === 'vacations'" elevation="2" border>
            <v-data-table
              :headers="VacationStore.headers"
              :items="VacationStore.Vacations || []"
              :hide-default-footer="(VacationStore.Vacations || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Vacations Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="VacationStore.add()">
                    Add Vacation
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.vacation_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.vacation_image" :src="`http://127.0.0.1:8000/storage/${item.vacation_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="VacationStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="VacationStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- Transit Table -->
          <v-card v-else-if="currentView === 'transit'" elevation="2" border>
            <v-data-table
              :headers="TransitStore.headers"
              :items="TransitStore.Transits || []"
              :hide-default-footer="(TransitStore.Transits || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Transit Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="TransitStore.add()">
                    Add Transit
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.transit_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.transit_image" :src="`http://127.0.0.1:8000/storage/${item.transit_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="TransitStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="TransitStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- Meeting Table -->
          <v-card v-else-if="currentView === 'meeting'" elevation="2" border>
            <v-data-table
              :headers="MeetingStore.headers"
              :items="MeetingStore.Meetings || []"
              :hide-default-footer="(MeetingStore.Meetings || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Meeting Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="MeetingStore.add()">
                    Add Meeting
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.meeting_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.meeting_image" :src="`http://127.0.0.1:8000/storage/${item.meeting_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="MeetingStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="MeetingStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- Services Table -->
          <v-card v-else-if="currentView === 'services'" elevation="2" border>
            <v-data-table
              :headers="ServiceStore.headers"
              :items="ServiceStore.Services || []"
              :hide-default-footer="(ServiceStore.Services || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Service Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="ServiceStore.add()">
                    Add Service
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.service_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.service_image" :src="`http://127.0.0.1:8000/storage/${item.service_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="ServiceStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="ServiceStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- User Profiles -->
          <v-card v-else-if="currentView === 'userProfiles'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">User Profiles</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-data-table
              :items="users"
              :headers="userHeaders"
              :loading="loadingUsers"
              hover
            >
              <template #item.is_active="{ item }">
                <v-chip :color="item.is_active ? 'green' : 'grey'" size="small">
                  {{ item.is_active ? 'Active' : 'Inactive' }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>

          <!-- Contact Messages -->
          <v-card v-else-if="currentView === 'contacts'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">Contact Messages</v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="loadContacts" :loading="loadingContacts" />
            </v-toolbar>
            <v-divider />
            <v-data-table
              :headers="contactHeaders"
              :items="contacts"
              :item-key="'id'"
              :loading="loadingContacts"
              hover
            >
              <template #item.status="{ item }">
                <v-chip :color="item.reply ? 'green' : 'orange'" size="small">
                  {{ item.reply ? 'Replied' : 'Pending' }}
                </v-chip>
              </template>
              <template #item.message="{ item }">
                <span>
                  {{ item.message.length > 60 ? item.message.substring(0, 60) + '...' : item.message }}
                </span>
              </template>
              <template #item.reply="{ item }">
                <span v-if="item.reply" class="text-grey">
                  {{ item.reply.length > 40 ? item.reply.substring(0, 40) + '...' : item.reply }}
                </span>
                <span v-else class="text-grey-lighten-1">—</span>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-eye" variant="text" color="blue" size="small" @click="viewContact(item)" />
                  <v-btn icon="mdi-reply" variant="text" color="green" size="small" @click="openReplyDialog(item)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="deleteContact(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- Click Monitoring -->
          <v-card v-else-if="currentView === 'clicks'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">Click Monitoring Logs</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-refresh" @click="fetchClicks" :loading="loadingClicks"></v-btn>
            </v-toolbar>
            <v-divider />
            <v-data-table
              :items="clicks"
              :headers="clickHeaders"
              :loading="loadingClicks"
              hover
              items-per-page="10"
            >
              <template #item.last_clicked_at="{ item }">
                {{ new Date(item.last_clicked_at).toLocaleString() }}
              </template>
            </v-data-table>
          </v-card>

          <!-- ═══════════════════════════════════════════════
               Manager Approvals
               ═══════════════════════════════════════════════ -->
          <v-card v-else-if="currentView === 'approvals'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">
                Manager Service Approvals
              </v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="loadManagerApprovals" :loading="loadingApprovals" />
            </v-toolbar>

            <v-divider />

            <v-data-table
              :headers="approvalHeaders"
              :items="pendingManagers"
              :loading="loadingApprovals"
              hover
            >
              <!-- IMAGE -->
              <template #item.service_image_1="{ item }">
                <v-avatar size="80" rounded="lg" class="my-2 border">
                  <v-img
                    v-if="item.service?.service_image_1"
                    :src="getImageUrl(item.service.service_image_1)"
                    cover
                  />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>

              <!-- WEBSITE -->
              <template #item.website_url="{ item }">
                <a
                  v-if="item.service?.website_url"
                  :href="item.service.website_url"
                  target="_blank"
                  class="text-blue font-weight-medium"
                >
                  Visit Website
                </a>
                <span v-else class="text-grey text-caption">—</span>
              </template>

              <!-- CATEGORY -->
              <template #item.category="{ item }">
                <v-chip
                  v-if="getCategoryName(item.service)"
                  color="primary"
                  size="small"
                >
                  {{ getCategoryName(item.service) }}
                </v-chip>
                <span v-else class="text-grey text-caption">—</span>
              </template>

              <!-- STATUS -->
              <template #item.status="{ item }">
                <v-chip
                  :color="
                    item.service?.status === 'approved' ? 'green' :
                    item.service?.status === 'rejected' ? 'red' : 'orange'
                  "
                  size="small"
                >
                  {{
                    item.service?.status === 'approved' ? 'Approved' :
                    item.service?.status === 'rejected' ? 'Rejected' : 'Pending'
                  }}
                </v-chip>
              </template>

              <!-- ACTIONS -->
              <template #item.actions="{ item }">
                <div class="d-flex ga-2 align-center">
                  <v-btn
                    v-if="item.service?.status === 'pending'"
                    color="green"
                    variant="elevated"
                    size="small"
                    rounded="pill"
                    prepend-icon="mdi-check"
                    @click="approveManager(item)"
                  >
                    Approve
                  </v-btn>

                  <v-btn
                    v-if="item.service?.status === 'pending'"
                    color="red"
                    variant="elevated"
                    size="small"
                    rounded="pill"
                    prepend-icon="mdi-close"
                    @click="rejectManager(item)"
                  >
                    Reject
                  </v-btn>

                  <span
                    v-if="item.service?.status === 'approved'"
                    class="text-green text-caption font-weight-bold"
                  >
                    ✓ Approved
                  </span>

                  <span
                    v-if="item.service?.status === 'rejected'"
                    class="text-red text-caption font-weight-bold"
                  >
                    ✗ Rejected
                  </span>
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- ═══════════════════════════════════════════════
               Publish Service (moved from Choice.vue)
               ═══════════════════════════════════════════════ -->
          <v-card v-else-if="currentView === 'publishService'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">
                Publish Approved Service to Category
              </v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="loadApprovedServices" :loading="loadingServices" />
            </v-toolbar>

            <v-divider />

            <v-card-text class="pa-6">

              <!-- Success banner -->
              <v-alert
                v-if="publishSuccess"
                type="success"
                variant="tonal"
                closable
                class="mb-4"
                @click:close="publishSuccess = ''"
              >
                {{ publishSuccess }}
              </v-alert>

              <!-- Loading state -->
              <div v-if="loadingServices" class="d-flex flex-column align-center py-10 text-grey">
                <v-progress-circular indeterminate color="primary" class="mb-4" />
                <p>Loading approved services…</p>
              </div>

              <!-- Empty state -->
              <div
                v-else-if="!loadingServices && approvedServices.length === 0 && !publishSuccess"
                class="d-flex flex-column align-center py-10 text-grey"
              >
                <v-icon size="48" class="mb-3">mdi-inbox-outline</v-icon>
                <p>No approved services available to publish right now.</p>
              </div>

              <!-- Service selection grid -->
              <div v-else>
                <p class="text-caption text-grey mb-4">
                  Select an approved service below, then click <strong>Publish to Category</strong>.
                </p>

                <v-row>
                  <v-col
                    v-for="manager in approvedServices"
                    :key="manager.id"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card
                      :variant="selectedService?.id === manager.id ? 'elevated' : 'outlined'"
                      :color="selectedService?.id === manager.id ? 'primary' : undefined"
                      rounded="lg"
                      class="cursor-pointer"
                      @click="selectedService = manager"
                    >
                      <v-img
                        v-if="manager.service?.service_image_1"
                        :src="getImageUrl(manager.service.service_image_1)"
                        height="140"
                        cover
                      />
                      <v-img v-else height="140" cover>
                        <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                          <v-icon size="48" color="grey">mdi-image-outline</v-icon>
                        </div>
                      </v-img>

                      <v-card-title class="text-body-1 font-weight-bold pt-3">
                        {{ manager.service?.name ?? '—' }}
                      </v-card-title>

                      <v-card-subtitle>
                        <v-chip size="x-small" color="blue" class="mt-1">
                          {{ getCategoryName(manager.service) }}
                        </v-chip>
                      </v-card-subtitle>

                      <v-card-text class="text-caption text-grey pb-2">
                        Manager: {{ manager.name }}
                      </v-card-text>

                      <v-card-actions v-if="selectedService?.id === manager.id">
                        <v-icon color="white" size="18">mdi-check-circle</v-icon>
                        <span class="text-caption text-white ml-1">Selected</span>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <!-- Footer actions -->
            <v-divider />
            <v-card-actions class="pa-4 justify-end">
              <v-btn
                variant="text"
                @click="selectedService = null; publishSuccess = ''"
              >
                Clear Selection
              </v-btn>
              <v-btn
                color="primary"
                variant="elevated"
                :disabled="!selectedService || addingService"
                :loading="addingService"
                prepend-icon="mdi-check"
                rounded="pill"
                @click="publishService"
              >
                Publish to Category
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-fade-transition>
      </v-container>
    </v-main>

    <!-- ═══════════════════════════════════════════════
         DIALOGS
         ═══════════════════════════════════════════════ -->

    <!-- Vacation Dialog -->
    <v-dialog v-model="VacationStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ VacationStore.isEditing ? 'Update' : 'Create' }} Vacation</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="VacationStore.formModel.name" label="Hotel Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="VacationStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="VacationStore.formModel.vacation_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="VacationStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="VacationStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="VacationStore.formModel.vacation_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="VacationStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="VacationStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Transit Dialog -->
    <v-dialog v-model="TransitStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ TransitStore.isEditing ? 'Update' : 'Create' }} Transit</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="TransitStore.formModel.name" label="Transit Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="TransitStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="TransitStore.formModel.transit_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="TransitStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="TransitStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="TransitStore.formModel.transit_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="TransitStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="TransitStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Meeting Dialog -->
    <v-dialog v-model="MeetingStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ MeetingStore.isEditing ? 'Update' : 'Create' }} Meeting</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="MeetingStore.formModel.name" label="Meeting Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="MeetingStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="MeetingStore.formModel.meeting_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="MeetingStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="TransitStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="MeetingStore.formModel.meeting_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="MeetingStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="MeetingStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Service Dialog -->
    <v-dialog v-model="ServiceStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ ServiceStore.isEditing ? 'Update' : 'Create' }} Service</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="ServiceStore.formModel.name" label="Service Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="ServiceStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="ServiceStore.formModel.service_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="ServiceStore.formModel.service_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="ServiceStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="ServiceStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- View Contact Dialog -->
    <v-dialog v-model="viewDialog" max-width="700" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 d-flex align-center">
          <v-icon class="mr-2">mdi-email-outline</v-icon>
          Contact Message Details
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-list lines="two">
            <v-list-item>
              <v-list-item-title class="font-weight-bold">From</v-list-item-title>
              <v-list-item-subtitle>{{ selectedContact?.name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">Email</v-list-item-title>
              <v-list-item-subtitle>{{ selectedContact?.email }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">Received</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(selectedContact?.created_at) }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider class="my-4" />

          <div class="mb-4">
            <h4 class="mb-2">Message:</h4>
            <p class="text-body-1">{{ selectedContact?.message }}</p>
          </div>

          <v-divider class="my-4" v-if="selectedContact?.reply" />

          <div v-if="selectedContact?.reply">
            <h4 class="mb-2 text-green">Your Reply:</h4>
            <p class="text-body-1">{{ selectedContact?.reply }}</p>
            <p class="text-caption text-grey mt-2">
              Sent: {{ formatDate(selectedContact?.replied_at) }}
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="viewDialog = false">Close</v-btn>
          <v-btn
            color="green"
            variant="elevated"
            prepend-icon="mdi-reply"
            @click="openReplyDialog(selectedContact)"
          >
            {{ selectedContact?.reply ? 'Update Reply' : 'Send Reply' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reply Dialog -->
    <v-dialog v-model="replyDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">
          {{ selectedContact?.reply ? 'Update Reply' : 'Send Reply' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <div class="mb-4 pa-4 bg-grey-lighten-4 rounded">
            <p class="text-caption text-grey mb-2">Original Message from {{ selectedContact?.name }}:</p>
            <p class="text-body-2">{{ selectedContact?.message }}</p>
          </div>

          <v-textarea
            v-model="replyText"
            label="Your Reply"
            placeholder="Type your response here..."
            variant="outlined"
            rows="5"
            auto-grow
            :rules="[v => !!v || 'Reply is required']"
          />
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="closeReplyDialog">Cancel</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            width="150"
            :loading="sendingReply"
            @click="sendReply"
          >
            Send Reply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import { useVacationStore } from "@/stores/vacation";
import { useTransitStore } from "@/stores/transit";
import { useMeetingStore } from "@/stores/meeting";
import { useServiceStore } from "@/stores/service";

const VacationStore = useVacationStore();
const TransitStore  = useTransitStore();
const MeetingStore  = useMeetingStore();
const ServiceStore  = useServiceStore();

// ── Layout state ────────────────────────────────────────────────
const drawer      = ref(true);
const rail        = ref(false);
const currentView = ref("profile");

// ── Data refs ────────────────────────────────────────────────────
const users           = ref([]);
const loadingUsers    = ref(false);
const userProfile     = ref(null);
const contacts        = ref([]);
const loadingContacts = ref(false);
const clicks          = ref([]);
const loadingClicks   = ref(false);

// ── Manager Approvals ────────────────────────────────────────────
const pendingManagers  = ref([]);
const loadingApprovals = ref(false);

// ── Contact reply state ──────────────────────────────────────────
const viewDialog      = ref(false);
const replyDialog     = ref(false);
const selectedContact = ref(null);
const replyText       = ref('');
const sendingReply    = ref(false);

// ── Publish Service state (moved from Choice.vue) ────────────────
const approvedServices = ref([]);
const loadingServices  = ref(false);
const addingService    = ref(false);
const selectedService  = ref(null);
const publishSuccess   = ref('');

// ── Computed ─────────────────────────────────────────────────────
const isAdmin = computed(() =>
  userProfile.value?.role_id === 1 || userProfile.value?.role_name === 'admin'
);

// ── Table headers ────────────────────────────────────────────────
const userHeaders = [
  { title: "ID",        value: "id" },
  { title: "Name",      value: "name" },
  { title: "Email",     value: "email" },
  { title: "Role ID",   value: "role_id" },
  { title: "Role Name", value: "role_name" },
  { title: "Status",    value: "is_active" },
];

const contactHeaders = [
  { title: 'ID',       value: 'id' },
  { title: 'Name',     value: 'name' },
  { title: 'Email',    value: 'email' },
  { title: 'Message',  value: 'message' },
  { title: 'Reply',    value: 'reply' },
  { title: 'Status',   value: 'status',     sortable: false },
  { title: 'Received', value: 'created_at' },
  { title: 'Actions',  value: 'actions',    sortable: false },
];

const clickHeaders = [
  { title: "User ID",         key: "user_id",         align: "start" },
  { title: "User Name",       key: "user_name" },
  { title: "Service ID",      key: "service_id",      align: "start" },
  { title: "Service URL",     key: "service_name" },
  { title: "Total Clicks",    key: "total_clicks",    align: "center" },
  { title: "Last Clicked At", key: "last_clicked_at" },
];

const approvalHeaders = [
  { title: 'ID',           value: 'id' },
  { title: 'Manager Name', value: 'name' },
  { title: 'Email',        value: 'email' },
  { title: 'Image',        value: 'service_image_1', sortable: false },
  { title: 'Website',      value: 'website_url',     sortable: false },
  { title: 'Category',     value: 'category',        sortable: false },
  { title: 'Status',       value: 'status',          sortable: false },
  { title: 'Actions',      value: 'actions',         sortable: false },
];

// ── Helpers ──────────────────────────────────────────────────────
const getImageUrl = (path) => {
  if (!path) return '';
  return `http://127.0.0.1:8000/storage/${path}`;
};

const categoryMap = {
  1: 'Vacation Hotels',
  2: 'Transit Hotels',
  3: 'Meeting Rooms',
  4: 'Service Apartments',
  5: 'Transportation Services/Guided Tours',
};

const getCategoryName = (service) => {
  if (service?.category?.name) return service.category.name;
  if (service?.category_id)    return categoryMap[service.category_id] ?? `Category ${service.category_id}`;
  return null;
};

// ── Manager approval functions ───────────────────────────────────
const loadManagerApprovals = async () => {
  loadingApprovals.value = true;
  try {
    const res = await api.get('/managers');
    pendingManagers.value = res.data.managers ?? res.data ?? [];
  } catch (err) {
    console.error('Failed to load manager approvals', err);
    pendingManagers.value = [];
  } finally {
    loadingApprovals.value = false;
  }
};

const approveManager = async (manager) => {
  if (!confirm(`Approve ${manager.name}? This will publish their service.`)) return;
  try {
    await api.put(`/managers/${manager.id}`, { status: 'approved' });
    const target = pendingManagers.value.find(m => m.id === manager.id);
    if (target?.service) target.service.status = 'approved';
  } catch (err) {
    console.error('Failed to approve manager', err);
    alert('Approval failed. Please try again.');
  }
};

const rejectManager = async (manager) => {
  if (!confirm(`Reject ${manager.name}? Their service will not be published.`)) return;
  try {
    await api.put(`/managers/${manager.id}`, { status: 'rejected' });
    const target = pendingManagers.value.find(m => m.id === manager.id);
    if (target?.service) target.service.status = 'rejected';
  } catch (err) {
    console.error('Failed to reject manager', err);
    alert('Rejection failed. Please try again.');
  }
};

// ── Publish Service functions (moved from Choice.vue) ────────────
const loadApprovedServices = async () => {
  loadingServices.value  = true;
  approvedServices.value = [];
  publishSuccess.value   = '';
  try {
    const res = await api.get('/managers');
    const managers = res.data.managers ?? res.data ?? [];
    approvedServices.value = managers.filter(
      (m) => m.service && m.service.status === 'approved'
    );
  } catch (err) {
    console.error('Failed to load approved services', err);
  } finally {
    loadingServices.value = false;
  }
};

const openPublishView = async () => {
  currentView.value = 'publishService';
  await loadApprovedServices();
};

const publishService = async () => {
  if (!selectedService.value) return;
  addingService.value = true;
  try {
    await api.post(`/managers/${selectedService.value.id}/publish`);
    publishSuccess.value = `"${selectedService.value.service?.name ?? 'Service'}" has been added to ${getCategoryName(selectedService.value.service)} successfully!`;
    approvedServices.value = approvedServices.value.filter(
      (m) => m.id !== selectedService.value.id
    );
    selectedService.value = null;
  } catch (err) {
    console.error('Failed to publish service', err);
    alert('Failed to add service. Please try again.');
  } finally {
    addingService.value = false;
  }
};

// ── Admin profile ────────────────────────────────────────────────
const fetchAdminProfile = async () => {
  try {
    const res = await api.get("/me");
    userProfile.value = res.data;
  } catch (err) {
    console.error("Failed to load admin profile info", err);
  }
};

// ── Users ────────────────────────────────────────────────────────
const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const res = await api.get("/users");
    users.value = res.data.user;
  } catch (err) {
    console.error("Failed to load users", err);
  } finally {
    loadingUsers.value = false;
  }
};

// ── Contacts ─────────────────────────────────────────────────────
const loadContacts = async () => {
  currentView.value     = 'contacts';
  loadingContacts.value = true;
  try {
    const endpoint = isAdmin.value ? '/contactuses' : '/my-contacts';
    const res = await api.get(endpoint);
    contacts.value = res.data.Contactus || [];
  } catch (err) {
    console.error('Failed to load contacts', err);
    contacts.value = [];
  } finally {
    loadingContacts.value = false;
  }
};

const deleteContact = async (id) => {
  if (!confirm('Are you sure you want to delete this message?')) return;
  try {
    await api.delete(`/contactuses/${id}`);
    contacts.value = contacts.value.filter(c => c.id !== id);
  } catch (err) {
    console.error('Failed to delete contact', err);
    alert('Failed to delete message');
  }
};

const viewContact = (contact) => {
  selectedContact.value = contact;
  viewDialog.value      = true;
};

const openReplyDialog = (contact) => {
  if (!isAdmin.value) {
    alert('Only administrators can send replies');
    return;
  }
  selectedContact.value = contact;
  replyText.value       = contact.reply || '';
  viewDialog.value      = false;
  replyDialog.value     = true;
};

const closeReplyDialog = () => {
  replyDialog.value     = false;
  replyText.value       = '';
  selectedContact.value = null;
};

const sendReply = async () => {
  if (!replyText.value.trim()) {
    alert('Please enter a reply');
    return;
  }
  sendingReply.value = true;
  try {
    const response = await api.post(`/contactuses/${selectedContact.value.id}/reply`, {
      reply: replyText.value,
    });
    const index = contacts.value.findIndex(c => c.id === selectedContact.value.id);
    if (index !== -1) contacts.value[index] = response.data.Contactus;
    alert('Reply sent successfully!');
    closeReplyDialog();
  } catch (err) {
    console.error('Failed to send reply', err);
    alert('Failed to send reply. Please try again.');
  } finally {
    sendingReply.value = false;
  }
};

// ── Clicks ───────────────────────────────────────────────────────
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

// ── Utilities ────────────────────────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ── Lifecycle ────────────────────────────────────────────────────
onMounted(async () => {
  try {
    await fetchAdminProfile();
    if (isAdmin.value) {
      await fetchUsers();
      await fetchClicks();
      await loadManagerApprovals();
    }
    await loadContacts();
    await Promise.all([
      VacationStore.getVacations(),
      TransitStore.getTransits(),
      MeetingStore.getMeetings(),
      ServiceStore.getServices(),
    ]);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
</script>

<style scoped>
.v-main {
  min-height: 190vh;
}
</style>