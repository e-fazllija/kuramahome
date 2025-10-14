<template>
<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
    <!--begin::Navbar-->
    <div v-if="!loading" class="card mb-5 mb-xl-10">
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
       
          <!--begin::Info-->
          <div class="flex-grow-1">
            <!--begin::Title-->
            <div
              class="d-flex justify-content-between align-items-start flex-wrap mb-2"
            >
              <!--begin::User-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <div class="d-flex align-items-center mb-2">
                  <a
                    href="#"
                    class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                    >{{ formData.Name }} {{ formData.LastName }}</a
                  >  
                </div>
                <!--end::Name-->
  
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                    {{ formData.Role }}
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                    {{ formData.Address }}, {{ formData.Town }}, {{ formData.Region }}
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                  >
                    <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                    {{ formData.Email }}
                  </a>
                </div>
                <!--end::Info-->
              </div>
              <!--end::User-->
  
              <!--begin::Actions-->
              <div class="d-flex my-4">
               
                <!--begin::Menu-->
                <!-- <div class="me-0">
                  <button
                    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end"
                    data-kt-menu-flip="top-end"
                  >
                    <i class="bi bi-three-dots fs-3"></i>
                  </button>
                  <Dropdown3></Dropdown3>
                </div> -->
                <!--end::Menu-->
              </div>
              <!--end::Actions-->
            </div>
            <!--end::Title-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Details-->
      </div>
    </div>
    <!--end::Navbar-->
    <Settings v-if="!loading" :profileDetails=formData @formUpdateSubmitted="getItem()"></Settings>
    <router-view></router-view>
  </template>
  
  <script lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, ref, onMounted } from "vue";
  import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
  import Settings from "@/views/pages/profile/Settings.vue"
  import { useRoute, useRouter } from "vue-router";
  import { useAuthStore, type User } from "@/stores/auth";
  import { getAgent, Agent } from "@/core/data/agents"

  export default defineComponent({
    name: "kt-account",
    components: {
      Dropdown3,
      Settings
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = route.params.id;
        const store = useAuthStore();
        
        const formData = ref<User>();
        const loading = ref<boolean>(true);

        async function getItem(){
            loading.value = true;
            formData.value = await store.getUser(id.toString())
            loading.value = false;
        }

        onMounted(async () => {
            await getItem();
        })

      return {
        getAssetPath,
        id,
        formData,
        loading,
        getItem
      };
    },
  });
  </script>
  