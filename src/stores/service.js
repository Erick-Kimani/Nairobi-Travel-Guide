import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import api from "@/services/api";

export const useServiceStore = defineStore("Service", () => {

  const headers = [
    { title: "ID", key: "id", align: "start" },
    { title: "Name", key: "name" },
    { title: "Description", key: "description" },
    { title: "Website URL", key: "website_url" },
    { title: "Category ID", key: "category_id"},
    { title: "Service Image", key: "service_image_1" },
    { title: "Actions", key: "actions", align: "end", sortable: false },
  ];

  const Services = ref([]);
  const dialog = shallowRef(false);
  const formModel = ref(createNewRecord());

  const isEditing = computed(() => !!formModel.value.id);

  function createNewRecord() {
    return {
      id: null,
      name: "",
      description: "",
      website_url: "",
      category_id: "",
      service_image_1: null,
    };
  }

  function buildFormData() {
    const fd = new FormData();

    Object.keys(formModel.value).forEach((key) => {
      const value = formModel.value[key];
      if (key === "service_image" && !value) return;
      fd.append(key, value);
    });

    return fd;
  }

  // ✅ Correct save endpoints
  async function save() {
    try {
      const formData = buildFormData();

      if (isEditing.value) {
        await api.post(
          `/services/${formModel.value.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: { _method: "PUT" }, // Laravel-friendly PUT
          }
        );
      } else {
        await api.post(
          "/services",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      await getServices();
      dialog.value = false;
      formModel.value = createNewRecord();

    } catch (error) {
      console.error("Failed to save service hotel", error);
    }
  }

  // ✅ Correct GET endpoint
  async function getServices() {
    try {
      const response = await api.get("/services");
      Services.value = response.data.Service || response.data || [];
    } catch (error) {
      console.error("Failed to fetch service hotels", error);
    }
  }

  function add() {
    formModel.value = createNewRecord();
    dialog.value = true;
  }

  function edit(id) {
    const found = Services.value.find(p => p.id === id);
    if (!found) return;

    formModel.value = {
      id: found.id,
      name: found.name,
      description: found.description,
      website_url: found.website_url,
      category_id: found.category_id,
      service_image_1: null,
    };

    dialog.value = true;
  }

  // ✅ Correct DELETE endpoint
  async function remove(id) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await api.delete(`/services/${id}`);
      await getServices();
    } catch (error) {
      console.error("Failed to delete service hotel", error);
    }
  }

  function reset() {
    dialog.value = false;
    formModel.value = createNewRecord();
  }

  return {
    headers,
    Services,
    formModel,
    dialog,
    isEditing,
    add,
    edit,
    remove,
    save,
    reset,
    getServices,
  };
});
