<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-nav-icon @click="rail = !rail">
        <v-icon>{{ rail ? 'mdi-menu' : 'mdi-menu-open' }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">Admin Dashboard</v-toolbar-title>
      <v-spacer />
      <!-- Bell icon now opens the invite link dialog instead of routing -->
      <v-btn icon="mdi-bell-outline" class="mr-2" @click="openInviteDialog" />
      <v-avatar color="secondary" size="35" class="mr-4">
        {{ userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'AD' }}
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :rail="rail" permanent elevation="2" @click="rail = false">
      <v-list density="comfortable" nav>
        <v-list-item prepend-icon="mdi-account-details" title="Admin Profile" :active="currentView === 'profile'" @click="currentView = 'profile'" rounded="lg" />

        <v-list-group value="categories">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-table-multiple" title="Category Tables" rounded="lg" />
          </template>
          <v-list-item prepend-icon="mdi-room-service" title="Services" :active="currentView === 'services'" @click="currentView = 'services'" rounded="lg" class="pl-8" />
          <v-list-item prepend-icon="mdi-palm-tree" title="Vacations" :active="currentView === 'vacations'" @click="currentView = 'vacations'" rounded="lg" class="pl-8" />
        </v-list-group>

        <v-list-item prepend-icon="mdi-account-multiple" title="User Profiles" :active="currentView === 'userProfiles'" @click="currentView = 'userProfiles'" rounded="lg" />
        <v-list-item prepend-icon="mdi-email-outline" title="Contact Messages" :active="currentView === 'contacts'" @click="loadContacts" rounded="lg" />
        <v-list-item prepend-icon="mdi-cursor-default-click" title="Click Monitoring" :active="currentView === 'clicks'" @click="currentView = 'clicks'" rounded="lg" />
        <v-list-item prepend-icon="mdi-clipboard-check" title="Manager Approval" :active="currentView === 'approvals'" @click="loadManagerApprovals(); currentView = 'approvals'" rounded="lg" />
        <v-list-item prepend-icon="mdi-plus-circle-outline" title="Published Service" :active="currentView === 'publishService'" @click="openPublishView" rounded="lg" />
        <v-list-item prepend-icon="mdi-post-outline" title="Blog Management" :active="currentView === 'blogs'" @click="loadBlogs(); currentView = 'blogs'" rounded="lg" />
        <v-list-item prepend-icon="mdi-frequently-asked-questions" title="FAQs Management" :active="currentView === 'faqs'" @click="loadFaqs(); currentView = 'faqs'" rounded="lg" />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn variant="text" block :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="rail = !rail">
            <v-icon v-if="rail">mdi-chevron-right</v-icon>
            <span v-else>Collapse Menu</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-fade-transition hide-on-leave>

          <!-- Admin Profile -->
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
                <tr><td><strong>Admin Name</strong></td><td>{{ userProfile?.name || 'Loading...' }}</td></tr>
                <tr><td><strong>Email Address</strong></td><td>{{ userProfile?.email || 'Loading...' }}</td></tr>
                <tr><td><strong>Role id</strong></td><td>{{ userProfile?.role_id || 'Loading...' }}</td></tr>
                <tr><td><strong>Active/Inactive</strong></td><td>{{ userProfile?.is_active ? 'Active' : 'Inactive' }}</td></tr>
                <tr>
                  <td><strong>Permissions/Abilities</strong></td>
                  <td>
                    <div class="d-flex ga-1 flex-wrap">
                      <v-chip v-for="ability in userProfile?.abilities" :key="ability" size="x-small" color="deep-orange">{{ ability }}</v-chip>
                      <span v-if="!userProfile?.abilities?.length" class="text-caption text-grey">Default Admin Access</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>

          <!-- Vacations Table -->
          <v-card v-if="currentView === 'vacations'" elevation="2" border>
            <v-data-table :headers="VacationStore.headers" :items="VacationStore.Vacations || []" :hide-default-footer="(VacationStore.Vacations || []).length < 11" hover>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Vacations Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="VacationStore.add()">Add Vacation</v-btn>
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

          <!-- Services Table -->
          <v-card v-else-if="currentView === 'services'" elevation="2" border>
            <v-data-table :headers="ServiceStore.headers" :items="ServiceStore.Services || []" :hide-default-footer="(ServiceStore.Services || []).length < 11" hover>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Service Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="ServiceStore.add()">Add Service</v-btn>
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
            <v-data-table :items="users" :headers="userHeaders" :loading="loadingUsers" hover>
              <template #item.is_active="{ item }">
                <v-chip :color="item.is_active ? 'green' : 'grey'" size="small">{{ item.is_active ? 'Active' : 'Inactive' }}</v-chip>
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
            <v-data-table :headers="contactHeaders" :items="contacts" :item-key="'id'" :loading="loadingContacts" hover>
              <template #item.status="{ item }">
                <v-chip :color="item.reply ? 'green' : 'orange'" size="small">{{ item.reply ? 'Replied' : 'Pending' }}</v-chip>
              </template>
              <template #item.message="{ item }">
                <span>{{ item.message.length > 60 ? item.message.substring(0, 60) + '...' : item.message }}</span>
              </template>
              <template #item.reply="{ item }">
                <span v-if="item.reply" class="text-grey">{{ item.reply.length > 40 ? item.reply.substring(0, 40) + '...' : item.reply }}</span>
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
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="fetchClicks" :loading="loadingClicks" />
            </v-toolbar>
            <v-divider />
            <v-data-table :items="clicks" :headers="clickHeaders" :loading="loadingClicks" hover items-per-page="10">
              <template #item.last_clicked_at="{ item }">{{ new Date(item.last_clicked_at).toLocaleString() }}</template>
            </v-data-table>
          </v-card>

          <!-- Manager Approvals -->
          <v-card v-else-if="currentView === 'approvals'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">Manager Service Approvals</v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="loadManagerApprovals" :loading="loadingApprovals" />
            </v-toolbar>
            <v-divider />
            <v-data-table :headers="approvalHeaders" :items="pendingManagers" :loading="loadingApprovals" hover>
              <template #item.service_image_1="{ item }">
                <v-avatar size="80" rounded="lg" class="my-2 border">
                  <v-img v-if="item.service?.service_image_1" :src="getImageUrl(item.service.service_image_1)" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template #item.website_url="{ item }">
                <a v-if="item.service?.website_url" :href="item.service.website_url" target="_blank" class="text-blue font-weight-medium">Visit Website</a>
                <span v-else class="text-grey text-caption">—</span>
              </template>
              <template #item.category="{ item }">
                <v-chip v-if="getCategoryName(item.service)" color="primary" size="small">{{ getCategoryName(item.service) }}</v-chip>
                <span v-else class="text-grey text-caption">—</span>
              </template>
              <template #item.status="{ item }">
                <v-chip :color="item.service?.status === 'approved' ? 'green' : item.service?.status === 'rejected' ? 'red' : item.service?.status === 'paused' ? 'amber' : 'orange'" size="small">
                  {{ item.service?.status === 'approved' ? 'Approved' : item.service?.status === 'rejected' ? 'Rejected' : item.service?.status === 'paused' ? 'Paused' : 'Pending' }}
                </v-chip>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex ga-2 align-center flex-wrap">
                  <v-btn v-if="item.service?.status === 'pending'" color="green" variant="elevated" size="small" rounded="pill" prepend-icon="mdi-check" @click="approveManager(item)">Approve</v-btn>
                  <v-btn v-if="item.service?.status === 'pending'" color="red" variant="elevated" size="small" rounded="pill" prepend-icon="mdi-close" @click="rejectManager(item)">Reject</v-btn>
                  <template v-if="item.service?.status === 'approved'">
                    <span class="text-green text-caption font-weight-bold">✓ Approved</span>
                    <v-btn color="amber-darken-2" variant="elevated" size="small" rounded="pill" prepend-icon="mdi-pause-circle-outline" @click="pauseManager(item)">Pause</v-btn>
                  </template>
                  <span v-if="item.service?.status === 'rejected'" class="text-red text-caption font-weight-bold">✗ Rejected</span>
                  <template v-if="item.service?.status === 'paused'">
                    <span class="text-amber-darken-2 text-caption font-weight-bold">⏸ Paused</span>
                    <v-btn color="blue" variant="elevated" size="small" rounded="pill" prepend-icon="mdi-play-circle-outline" @click="unpauseManager(item)">Unpause</v-btn>
                  </template>
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- Publish Service -->
          <v-card v-else-if="currentView === 'publishService'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">Publish Approved Service to Category</v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-refresh" @click="loadApprovedServices" :loading="loadingServices" />
            </v-toolbar>
            <v-divider />
            <v-card-text class="pa-6">
              <v-alert v-if="publishSuccess" type="success" variant="tonal" closable class="mb-4" @click:close="publishSuccess = ''">{{ publishSuccess }}</v-alert>
              <div v-if="loadingServices" class="d-flex flex-column align-center py-10 text-grey">
                <v-progress-circular indeterminate color="primary" class="mb-4" />
                <p>Loading approved services…</p>
              </div>
              <div v-else-if="!loadingServices && approvedServices.length === 0 && !publishSuccess" class="d-flex flex-column align-center py-10 text-grey">
                <v-icon size="48" class="mb-3">mdi-inbox-outline</v-icon>
                <p>No approved services available to publish right now.</p>
              </div>
              <div v-else>
                <p class="text-caption text-grey mb-4">Select an approved service below, then click <strong>Publish to Category</strong>.</p>
                <v-row>
                  <v-col v-for="manager in approvedServices" :key="manager.id" cols="12" sm="6" md="4">
                    <v-card :variant="selectedService?.id === manager.id ? 'elevated' : 'outlined'" :color="selectedService?.id === manager.id ? 'primary' : undefined" rounded="lg" class="cursor-pointer" @click="selectedService = manager">
                      <v-img v-if="manager.service?.service_image_1" :src="getImageUrl(manager.service.service_image_1)" height="140" cover />
                      <v-img v-else height="140" cover><div class="d-flex align-center justify-center fill-height bg-grey-lighten-3"><v-icon size="48" color="grey">mdi-image-outline</v-icon></div></v-img>
                      <v-card-title class="text-body-1 font-weight-bold pt-3">{{ manager.service?.name ?? '—' }}</v-card-title>
                      <v-card-subtitle><v-chip size="x-small" color="blue" class="mt-1">{{ getCategoryName(manager.service) }}</v-chip></v-card-subtitle>
                      <v-card-text class="text-caption text-grey pb-2">Manager: {{ manager.name }}</v-card-text>
                      <v-card-actions v-if="selectedService?.id === manager.id"><v-icon color="white" size="18">mdi-check-circle</v-icon><span class="text-caption text-white ml-1">Selected</span></v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pa-4 justify-end">
              <v-btn variant="text" @click="selectedService = null; publishSuccess = ''">Clear Selection</v-btn>
              <v-btn color="primary" variant="elevated" :disabled="!selectedService || addingService" :loading="addingService" prepend-icon="mdi-check" rounded="pill" @click="publishService">Publish to Category</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Blog Management -->
          <v-card v-else-if="currentView === 'blogs'" elevation="2" border>
            <v-data-table :headers="blogHeaders" :items="blogs" :loading="loadingBlogs" :hide-default-footer="blogs.length < 11" hover>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">Blog Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="openBlogDialog()">Add Blog Post</v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.blog_image="{ item }">
                <v-avatar size="100" rounded="lg" class="my-2 border">
                  <v-img v-if="item.blog_image" :src="`http://127.0.0.1:8000/storage/${item.blog_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.description="{ item }">
                <span>{{ item.description?.length > 80 ? item.description.substring(0, 80) + '…' : item.description }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="openBlogDialog(item)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="deleteBlog(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

          <!-- FAQ Management -->
          <v-card v-else-if="currentView === 'faqs'" elevation="2" border>
            <v-data-table
              :headers="faqHeaders"
              :items="faqs"
              :loading="loadingFaqs"
              :hide-default-footer="faqs.length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">FAQs Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn icon="mdi-refresh" class="mr-2" @click="loadFaqs" :loading="loadingFaqs" />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="openFaqDialog()">
                    Add FAQ
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>

              <template v-slot:item.query="{ item }">
                <span class="font-weight-medium">
                  {{ item.query?.length > 80 ? item.query.substring(0, 80) + '…' : item.query }}
                </span>
              </template>

              <template v-slot:item.answer="{ item }">
                <span class="text-grey">
                  {{ item.answer?.length > 100 ? item.answer.substring(0, 100) + '…' : item.answer }}
                </span>
              </template>

              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="openFaqDialog(item)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="deleteFaq(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

        </v-fade-transition>
      </v-container>
    </v-main>

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

    <!-- Service Dialog -->
    <v-dialog v-model="ServiceStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ ServiceStore.isEditing ? 'Update' : 'Create' }} Service</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="ServiceStore.formModel.name" label="Service Name" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-text-field v-model="ServiceStore.formModel.category_id" label="Category ID" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="ServiceStore.formModel.service_image_1" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
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
        <v-card-title class="pa-6 text-h5 d-flex align-center"><v-icon class="mr-2">mdi-email-outline</v-icon>Contact Message Details</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-list lines="two">
            <v-list-item><v-list-item-title class="font-weight-bold">From</v-list-item-title><v-list-item-subtitle>{{ selectedContact?.name }}</v-list-item-subtitle></v-list-item>
            <v-list-item><v-list-item-title class="font-weight-bold">Email</v-list-item-title><v-list-item-subtitle>{{ selectedContact?.email }}</v-list-item-subtitle></v-list-item>
            <v-list-item><v-list-item-title class="font-weight-bold">Received</v-list-item-title><v-list-item-subtitle>{{ formatDate(selectedContact?.created_at) }}</v-list-item-subtitle></v-list-item>
          </v-list>
          <v-divider class="my-4" />
          <div class="mb-4"><h4 class="mb-2">Message:</h4><p class="text-body-1">{{ selectedContact?.message }}</p></div>
          <v-divider class="my-4" v-if="selectedContact?.reply" />
          <div v-if="selectedContact?.reply">
            <h4 class="mb-2 text-green">Your Reply:</h4>
            <p class="text-body-1">{{ selectedContact?.reply }}</p>
            <p class="text-caption text-grey mt-2">Sent: {{ formatDate(selectedContact?.replied_at) }}</p>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="viewDialog = false">Close</v-btn>
          <v-btn color="green" variant="elevated" prepend-icon="mdi-reply" @click="openReplyDialog(selectedContact)">{{ selectedContact?.reply ? 'Update Reply' : 'Send Reply' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reply Dialog -->
    <v-dialog v-model="replyDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ selectedContact?.reply ? 'Update Reply' : 'Send Reply' }}</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <div class="mb-4 pa-4 bg-grey-lighten-4 rounded">
            <p class="text-caption text-grey mb-2">Original Message from {{ selectedContact?.name }}:</p>
            <p class="text-body-2">{{ selectedContact?.message }}</p>
          </div>
          <v-textarea v-model="replyText" label="Your Reply" placeholder="Type your response here..." variant="outlined" rows="5" auto-grow :rules="[v => !!v || 'Reply is required']" />
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="closeReplyDialog">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="150" :loading="sendingReply" @click="sendReply">Send Reply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Blog Dialog -->
    <v-dialog v-model="blogDialog" max-width="620" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ blogIsEditing ? 'Update Blog Post' : 'Create Blog Post' }}</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="blogForm.blog_name" label="Blog Title / Name" variant="outlined"
                :rules="[v => !!v || 'Title is required', v => (v && v.length >= 4) || 'Minimum 4 characters']" counter="80" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="blogForm.blog_description" label="Blog Description" variant="outlined" rows="5" auto-grow
                :rules="[v => !!v || 'Description is required', v => !v || v.length <= 2000 || 'Maximum 2000 characters']"
                counter="2000" hint="Describe the blog post content (max 2000 characters)" persistent-hint />
            </v-col>
            <v-col cols="12">
              <v-file-input v-model="blogForm.blog_image" label="Upload Blog Image (optional)" variant="outlined"
                prepend-inner-icon="mdi-image-outline" accept="image/jpg,image/jpeg,image/png"
                hint="Accepted: JPG, JPEG, PNG" persistent-hint clearable />
            </v-col>
            <v-col v-if="blogIsEditing && blogCurrentImage && !blogForm.blog_image?.length" cols="12">
              <p class="text-caption text-grey mb-2">Current Image:</p>
              <v-avatar size="120" rounded="lg" class="border">
                <v-img :src="`http://127.0.0.1:8000/storage/${blogCurrentImage}`" cover />
              </v-avatar>
              <p class="text-caption text-grey mt-1">Upload a new file above to replace it.</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="closeBlogDialog">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" :loading="savingBlog" @click="saveBlog">
            {{ blogIsEditing ? 'Update Post' : 'Publish Post' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FAQ Dialog -->
    <v-dialog v-model="faqDialog" max-width="620" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 d-flex align-center ga-2">
          <v-icon color="primary">mdi-frequently-asked-questions</v-icon>
          {{ faqIsEditing ? 'Update FAQ' : 'Add New FAQ' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="faqForm.query"
                label="Question"
                placeholder="e.g. What is the fastest way to get around Nairobi?"
                variant="outlined"
                prepend-inner-icon="mdi-help-circle-outline"
                rows="3"
                auto-grow
                :rules="[v => !!v || 'Question is required', v => !v || v.length <= 2000 || 'Maximum 2000 characters']"
                counter="2000"
                hint="Enter the question users commonly ask"
                persistent-hint
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="faqForm.answer"
                label="Answer"
                placeholder="Provide a clear and helpful answer..."
                variant="outlined"
                prepend-inner-icon="mdi-text-box-outline"
                rows="5"
                auto-grow
                :rules="[v => !!v || 'Answer is required', v => !v || v.length <= 2000 || 'Maximum 2000 characters']"
                counter="2000"
                hint="Write a concise, helpful answer (max 2000 characters)"
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="closeFaqDialog">Cancel</v-btn>
          <v-btn
            color="primary" variant="elevated" width="210"
            :loading="savingFaq" prepend-icon="mdi-send"
            @click="saveFaq"
          >
            {{ faqIsEditing ? 'Update FAQ' : 'Publish to FAQ Page' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ══════════════════════════════════════════════════════
         Manager Invite Link Dialog
         Opened by the bell icon in the app bar.
         Generates a one-time, 48-hour invite link the admin
         can copy and send to an approved manager via email.
    ══════════════════════════════════════════════════════ -->
    <v-dialog v-model="inviteDialog" max-width="560" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 d-flex align-center ga-2">
          <v-icon color="primary">mdi-link-variant</v-icon>
          Generate Manager Invite Link
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">

          <p class="text-body-2 text-grey mb-5">
            Generate a one-time invite link to send to an approved manager.
            The link expires in <strong>48 hours</strong> and can only be used once.
          </p>

          <!-- After generation — show the link -->
          <div v-if="generatedInviteLink">
            <v-alert type="success" variant="tonal" class="mb-4">
              Invite link generated successfully. Copy it and send it to the manager.
            </v-alert>
            <v-text-field
              :model-value="generatedInviteLink"
              readonly
              variant="outlined"
              label="Invite Link"
              append-inner-icon="mdi-content-copy"
              @click:append-inner="copyInviteLink"
              hint="Click the copy icon to copy the link"
              persistent-hint
            />
            <p v-if="inviteCopied" class="text-caption text-green mt-2">
              ✓ Link copied to clipboard!
            </p>
          </div>

          <!-- Before generation -->
          <div v-else class="d-flex flex-column align-center py-4">
            <v-icon size="48" color="primary" class="mb-3">mdi-email-fast-outline</v-icon>
            <p class="text-body-2 text-center text-grey">
              Click the button below to generate a unique invite link
              for the approved manager.
            </p>
          </div>

        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="closeInviteDialog">Close</v-btn>
          <!-- Generate button — shown before a link exists -->
          <v-btn
            v-if="!generatedInviteLink"
            color="primary"
            variant="elevated"
            rounded="pill"
            prepend-icon="mdi-link-plus"
            :loading="generatingInvite"
            @click="generateInviteLink"
          >
            Generate Link
          </v-btn>
          <!-- Generate New button — shown after a link has been generated -->
          <v-btn
            v-else
            color="secondary"
            variant="elevated"
            rounded="pill"
            prepend-icon="mdi-refresh"
            :loading="generatingInvite"
            @click="generateInviteLink"
          >
            Generate New Link
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import api from "@/services/api";
import { useVacationStore } from "@/stores/vacation";
import { useServiceStore } from "@/stores/service";

const VacationStore = useVacationStore();
const ServiceStore  = useServiceStore();

const drawer      = ref(true);
const rail        = ref(false);
const currentView = ref("profile");

const users           = ref([]);
const loadingUsers    = ref(false);
const userProfile     = ref(null);
const contacts        = ref([]);
const loadingContacts = ref(false);
const clicks          = ref([]);
const loadingClicks   = ref(false);

const pendingManagers  = ref([]);
const loadingApprovals = ref(false);

const viewDialog      = ref(false);
const replyDialog     = ref(false);
const selectedContact = ref(null);
const replyText       = ref('');
const sendingReply    = ref(false);

const approvedServices = ref([]);
const loadingServices  = ref(false);
const addingService    = ref(false);
const selectedService  = ref(null);
const publishSuccess   = ref('');

// ─── Blog state ───────────────────────────────────────────────────
const blogs            = ref([]);
const loadingBlogs     = ref(false);
const blogDialog       = ref(false);
const blogIsEditing    = ref(false);
const savingBlog       = ref(false);
const editingBlogId    = ref(null);
const blogCurrentImage = ref(null);

const blogForm = ref({
  blog_name:        '',
  blog_description: '',
  blog_image:       null,
});

// ─── FAQ state ────────────────────────────────────────────────────
const faqs         = ref([]);
const loadingFaqs  = ref(false);
const faqDialog    = ref(false);
const faqIsEditing = ref(false);
const savingFaq    = ref(false);
const editingFaqId = ref(null);

const faqForm = ref({
  query:  '',
  answer: '',
});

// ─── Invite Link state ────────────────────────────────────────────
const inviteDialog        = ref(false);
const generatedInviteLink = ref('');
const generatingInvite    = ref(false);
const inviteCopied        = ref(false);

// ─── Table Headers ────────────────────────────────────────────────

const blogHeaders = [
  { title: 'ID',          value: 'id',               width: 60 },
  { title: 'Image',       value: 'blog_image',        sortable: false },
  { title: 'Title',       value: 'blog_name' },
  { title: 'Description', value: 'blog_description',  sortable: false },
  { title: 'Actions',     value: 'actions',            sortable: false },
];

const faqHeaders = [
  { title: 'ID',       value: 'id',      width: 70 },
  { title: 'Question', value: 'query' },
  { title: 'Answer',   value: 'answer',  sortable: false },
  { title: 'Actions',  value: 'actions', sortable: false, width: 100 },
];

const isAdmin = computed(() =>
  userProfile.value?.role?.slug === 'admin' || userProfile.value?.role_id === 1
);

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
  { title: "Total Visits",    key: "total_clicks",    align: "center" },
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

// ─── Helpers ──────────────────────────────────────────────────────

const getImageUrl = (path) => {
  if (!path) return '';
  return `http://127.0.0.1:8000/storage/${path}`;
};

const categoryMap = {
  1: 'Vacation Hotels',
  2: 'Transit Hotels',
  3: 'Airport Transfers',
  4: 'Tours and Safaris',
};

const getCategoryName = (service) => {
  if (service?.category?.name) return service.category.name;
  if (service?.category_id)    return categoryMap[service.category_id] ?? `Category ${service.category_id}`;
  return null;
};

// ─── FAQ CRUD ─────────────────────────────────────────────────────

const loadFaqs = async () => {
  loadingFaqs.value = true;
  try {
    const res  = await api.get('/helpcenters');
    const data = res.data.Helpcenter ?? res.data.Helpcenters ?? res.data ?? [];
    faqs.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Failed to load FAQs', err);
    faqs.value = [];
  } finally {
    loadingFaqs.value = false;
  }
};

const openFaqDialog = async (faq = null) => {
  Object.assign(faqForm.value, { query: '', answer: '' });

  if (faq) {
    faqIsEditing.value = true;
    editingFaqId.value = faq.id;
    Object.assign(faqForm.value, {
      query:  faq.query  ?? '',
      answer: faq.answer ?? '',
    });
  } else {
    faqIsEditing.value = false;
    editingFaqId.value = null;
  }

  await nextTick();
  faqDialog.value = true;
};

const closeFaqDialog = () => {
  faqDialog.value    = false;
  faqIsEditing.value = false;
  editingFaqId.value = null;
  Object.assign(faqForm.value, { query: '', answer: '' });
};

const saveFaq = async () => {
  if (!faqForm.value.query?.trim()) {
    alert('Question is required.');
    return;
  }
  if (!faqForm.value.answer?.trim()) {
    alert('Answer is required.');
    return;
  }

  savingFaq.value = true;
  try {
    if (faqIsEditing.value) {
      await api.put(`/helpcenters/${editingFaqId.value}`, {
        query:  faqForm.value.query,
        answer: faqForm.value.answer,
      });
    } else {
      await api.post('/helpcenters', {
        query:  faqForm.value.query,
        answer: faqForm.value.answer,
      });
    }
    closeFaqDialog();
    await loadFaqs();
  } catch (err) {
    console.error('Failed to save FAQ', err);
    alert('Failed to save FAQ. Please check both fields and try again.');
  } finally {
    savingFaq.value = false;
  }
};

const deleteFaq = async (id) => {
  if (!confirm('Delete this FAQ? It will be removed from the public FAQ page immediately.')) return;
  try {
    await api.delete(`/helpcenters/${id}`);
    await loadFaqs();
  } catch (err) {
    console.error('Failed to delete FAQ', err);
    alert('Failed to delete FAQ.');
  }
};

// ─── Blog CRUD ────────────────────────────────────────────────────

const loadBlogs = async () => {
  loadingBlogs.value = true;
  try {
    const res = await api.get('/blogs');
    blogs.value = res.data.Blog || res.data || [];
  } catch (err) {
    console.error('Failed to load blogs', err);
    blogs.value = [];
  } finally {
    loadingBlogs.value = false;
  }
};

const openBlogDialog = async (blog = null) => {
  Object.assign(blogForm.value, { blog_name: '', blog_description: '', blog_image: null });
  if (blog) {
    blogIsEditing.value    = true;
    editingBlogId.value    = blog.id;
    blogCurrentImage.value = blog.blog_image;
    Object.assign(blogForm.value, {
      blog_name:        blog.blog_name        ?? '',
      blog_description: blog.blog_description ?? '',
      blog_image:       null,
    });
  } else {
    blogIsEditing.value    = false;
    editingBlogId.value    = null;
    blogCurrentImage.value = null;
  }
  await nextTick();
  blogDialog.value = true;
};

const closeBlogDialog = () => {
  blogDialog.value = false;
  Object.assign(blogForm.value, { blog_name: '', blog_description: '', blog_image: null });
  blogIsEditing.value    = false;
  editingBlogId.value    = null;
  blogCurrentImage.value = null;
};

const saveBlog = async () => {
  if (!blogForm.value.blog_name || blogForm.value.blog_name.length < 4) {
    alert('Blog title must be at least 4 characters.');
    return;
  }
  if (!blogForm.value.blog_description) {
    alert('Blog description is required.');
    return;
  }
  savingBlog.value = true;
  const fd = new FormData();
  fd.append('blog_name',        blogForm.value.blog_name);
  fd.append('blog_description', blogForm.value.blog_description);
  const imageFile = Array.isArray(blogForm.value.blog_image)
    ? blogForm.value.blog_image[0]
    : blogForm.value.blog_image;
  if (imageFile) fd.append('blog_image', imageFile);
  try {
    if (blogIsEditing.value) {
      fd.append('_method', 'PUT');
      const res = await api.post(`/blogs/${editingBlogId.value}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      const idx = blogs.value.findIndex(b => b.id === editingBlogId.value);
      if (idx !== -1) blogs.value[idx] = res.data.Blog;
    } else {
      const res = await api.post('/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      blogs.value.push(res.data.Blog);
    }
    closeBlogDialog();
  } catch (err) {
    console.error('Failed to save blog', err);
    alert('Failed to save blog post. Please check all fields and try again.');
  } finally {
    savingBlog.value = false;
  }
};

const deleteBlog = async (id) => {
  if (!confirm('Are you sure you want to delete this blog post? This cannot be undone.')) return;
  try {
    await api.delete(`/blogs/${id}`);
    blogs.value = blogs.value.filter(b => b.id !== id);
  } catch (err) {
    console.error('Failed to delete blog', err);
    alert('Failed to delete blog post.');
  }
};

// ─── Manager Approvals ────────────────────────────────────────────

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
  } catch (err) { console.error('Failed to approve manager', err); alert('Approval failed.'); }
};

const rejectManager = async (manager) => {
  if (!confirm(`Reject ${manager.name}?`)) return;
  try {
    await api.put(`/managers/${manager.id}`, { status: 'rejected' });
    const target = pendingManagers.value.find(m => m.id === manager.id);
    if (target?.service) target.service.status = 'rejected';
  } catch (err) { console.error('Failed to reject manager', err); alert('Rejection failed.'); }
};

const pauseManager = async (manager) => {
  if (!confirm(`Pause "${manager.service?.name ?? manager.name}"?`)) return;
  try {
    await api.patch(`/managers/${manager.id}/pause`);
    const target = pendingManagers.value.find(m => m.id === manager.id);
    if (target?.service) {
      target.service.previous_status = target.service.status;
      target.service.status          = 'paused';
      target.service.is_published    = false;
    }
  } catch (err) { console.error('Failed to pause service', err); alert('Pause failed.'); }
};

const unpauseManager = async (manager) => {
  if (!confirm(`Unpause "${manager.service?.name ?? manager.name}"?`)) return;
  try {
    const res = await api.patch(`/managers/${manager.id}/unpause`);
    const target = pendingManagers.value.find(m => m.id === manager.id);
    if (target?.service) {
      const restored                  = res.data.service?.status ?? target.service.previous_status ?? 'approved';
      target.service.status           = restored;
      target.service.is_published     = restored === 'approved';
      target.service.previous_status  = null;
    }
  } catch (err) { console.error('Failed to unpause service', err); alert('Unpause failed.'); }
};

// ─── Publish Service ──────────────────────────────────────────────

const loadApprovedServices = async () => {
  loadingServices.value  = true;
  approvedServices.value = [];
  publishSuccess.value   = '';
  try {
    const res      = await api.get('/managers');
    const managers = res.data.managers ?? res.data ?? [];
    approvedServices.value = managers.filter(m => m.service && m.service.status === 'approved');
  } catch (err) { console.error('Failed to load approved services', err); }
  finally { loadingServices.value = false; }
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
    publishSuccess.value   = `"${selectedService.value.service?.name ?? 'Service'}" has been added to ${getCategoryName(selectedService.value.service)} successfully!`;
    approvedServices.value = approvedServices.value.filter(m => m.id !== selectedService.value.id);
    selectedService.value  = null;
  } catch (err) { console.error('Failed to publish service', err); alert('Failed to add service.'); }
  finally { addingService.value = false; }
};

// ─── Admin Profile ────────────────────────────────────────────────

const fetchAdminProfile = async () => {
  try {
    const res = await api.get("/me");
    userProfile.value = {
      ...res.data.user,
      abilities: res.data.abilities
        ? Object.keys(res.data.abilities).filter(k => res.data.abilities[k])
        : [],
    };
  } catch (err) { console.error("Failed to load admin profile info", err); }
};

const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const res   = await api.get("/users");
    users.value = res.data.users ?? res.data.user ?? [];
  } catch (err) { console.error("Failed to load users", err); }
  finally { loadingUsers.value = false; }
};

const loadContacts = async () => {
  currentView.value     = 'contacts';
  loadingContacts.value = true;
  try {
    const endpoint = isAdmin.value ? '/contactuses' : '/contactuses/admin/messages';
    const res      = await api.get(endpoint);
    contacts.value = res.data.Contactus ?? res.data.contactus ?? res.data ?? [];
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
  } catch (err) { console.error('Failed to delete contact', err); alert('Failed to delete message'); }
};

const viewContact     = (contact) => { selectedContact.value = contact; viewDialog.value = true; };

const openReplyDialog = (contact) => {
  if (!isAdmin.value) { alert('Only administrators can send replies'); return; }
  selectedContact.value = contact;
  replyText.value       = contact.reply || '';
  viewDialog.value      = false;
  replyDialog.value     = true;
};

const closeReplyDialog = () => { replyDialog.value = false; replyText.value = ''; selectedContact.value = null; };

const sendReply = async () => {
  if (!replyText.value.trim()) { alert('Please enter a reply'); return; }
  sendingReply.value = true;
  try {
    const response = await api.post(`/contactuses/${selectedContact.value.id}/reply`, { reply: replyText.value });
    const index    = contacts.value.findIndex(c => c.id === selectedContact.value.id);
    if (index !== -1) contacts.value[index] = response.data.Contactus;
    alert('Reply sent successfully!');
    closeReplyDialog();
  } catch (err) { console.error('Failed to send reply', err); alert('Failed to send reply.'); }
  finally { sendingReply.value = false; }
};

const fetchClicks = async () => {
  loadingClicks.value = true;
  try {
    const res    = await api.get("/click-analytics");
    clicks.value = res.data;
  } catch (err) { console.error("Failed to load clicks", err); }
  finally { loadingClicks.value = false; }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Invite Link ──────────────────────────────────────────────────

const openInviteDialog = () => {
  generatedInviteLink.value = '';
  inviteCopied.value        = false;
  inviteDialog.value        = true;
};

const closeInviteDialog = () => {
  inviteDialog.value        = false;
  generatedInviteLink.value = '';
  inviteCopied.value        = false;
};

const generateInviteLink = async () => {
  generatingInvite.value = true;
  inviteCopied.value     = false;
  try {
    const res = await api.post('/generate-invite');
    generatedInviteLink.value = res.data.link;
  } catch (err) {
    console.error('Failed to generate invite link', err);
    alert('Failed to generate invite link. Please try again.');
  } finally {
    generatingInvite.value = false;
  }
};

const copyInviteLink = async () => {
  try {
    await navigator.clipboard.writeText(generatedInviteLink.value);
    inviteCopied.value = true;
    setTimeout(() => { inviteCopied.value = false; }, 3000);
  } catch {
    alert('Could not copy automatically. Please copy the link manually.');
  }
};

// ─── Mount ────────────────────────────────────────────────────────

onMounted(async () => {
  try {
    await fetchAdminProfile();
    await Promise.all([
      fetchUsers(),
      fetchClicks(),
      loadManagerApprovals(),
      VacationStore.getVacations(),
      ServiceStore.getServices(),
      loadFaqs(),
    ]);
    await loadContacts();
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
</script>

<style scoped>
.v-main { min-height: 190vh; }
</style>