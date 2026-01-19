<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Informazioni Proprietario</h2>
          <div
            class="btn btn-icon btn-sm btn-active-icon-primary"
            data-bs-dismiss="modal"
          >
            <i class="ki-duotone ki-cross fs-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column align-items-center text-center py-5">
            <div class="mb-4">
              <i class="ki-duotone ki-information-5 fs-3x text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </div>
            <p class="fs-5 fw-semibold mb-2">
              Questo {{ entityTypeLabel }} appartiene a:
            </p>
            <div class="d-flex align-items-center gap-2 mb-4">
              <span v-if="ownerInfo.Role === 'Agent'" class="fs-1">👤</span>
              <span v-else-if="ownerInfo.Role === 'Agency'" class="fs-1">🏢</span>
              <span v-else-if="ownerInfo.Role === 'Admin'" class="fs-1">👑</span>
              <span class="fs-4 fw-bold">
                {{ ownerInfo.FirstName }} {{ ownerInfo.LastName }}
              </span>
            </div>
            <div v-if="ownerInfo.Role === 'Agent' && ownerInfo.AgencyName" class="text-muted">
              <span class="fs-6">Agenzia: {{ ownerInfo.AgencyName }}</span>
            </div>
            <p class="text-muted mt-4 mb-0">
              Per visualizzare i dettagli completi, contatta il proprietario.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-light"
            data-bs-dismiss="modal"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { OwnerInfo } from "@/core/helpers/accessLevel";
import { getEntityTypeLabel } from "@/core/helpers/accessLevel";
import { Modal } from "bootstrap";

interface Props {
  modalId: string;
  ownerInfo: OwnerInfo;
  entityType: string; // "Property", "Request", "Customer"
}

const props = defineProps<Props>();

const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

const entityTypeLabel = computed(() => getEntityTypeLabel(props.entityType));

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value);
  }
});

const show = () => {
  if (modalInstance) {
    modalInstance.show();
  }
};

const hide = () => {
  if (modalInstance) {
    modalInstance.hide();
  }
};

defineExpose({
  show,
  hide,
});
</script>

<style scoped>
.modal-content {
  border-radius: 0.5rem;
}

.modal-header {
  border-bottom: 1px solid #e4e6ef;
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.modal-body {
  padding: 2rem 1.5rem;
}

.modal-footer {
  border-top: 1px solid #e4e6ef;
  padding: 1rem 1.5rem;
}
</style>
