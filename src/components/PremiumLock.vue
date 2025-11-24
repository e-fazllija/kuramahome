<template>
  <div class="premium-lock-container d-flex flex-column align-items-center justify-content-center p-10">
    <!--begin::Icon Container-->
    <div class="mb-7 premium-icon-wrapper">
      <div class="symbol symbol-120px symbol-circle">
        <span class="symbol-label premium-lock-icon">
          <i class="ki-duotone ki-crown fs-5x text-primary">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
          </i>
        </span>
      </div>
      <!--begin::Sparkle Effect-->
      <div class="premium-sparkle sparkle-1"></div>
      <div class="premium-sparkle sparkle-2"></div>
      <div class="premium-sparkle sparkle-3"></div>
      <!--end::Sparkle Effect-->
    </div>
    <!--end::Icon Container-->

    <!--begin::Badge-->
    <div class="premium-badge mb-4">
      <span class="badge badge-primary badge-lg px-4 py-2">
        <i class="ki-duotone ki-star fs-6 me-1">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        Premium Feature
      </span>
    </div>
    <!--end::Badge-->

    <!--begin::Title-->
    <h3 class="fw-bold fs-2 mb-4 premium-lock-title">
      Sblocca Funzionalità Premium
    </h3>
    <!--end::Title-->

    <!--begin::Description-->
    <p class="text-center mb-8 premium-lock-description">
      Ottieni accesso completo a tutti i dati e le analisi avanzate
      <br class="d-none d-md-block">
      con il <span class="fw-bold text-primary">piano Premium</span>
    </p>
    <!--end::Description-->

    <!--begin::Action Button-->
    <router-link 
      to="/dashboard/subscription/manage" 
      class="btn btn-primary btn-lg px-10 py-4 premium-lock-btn"
    >
      <i class="ki-duotone ki-rocket fs-3 me-3">
        <span class="path1"></span>
        <span class="path2"></span>
      </i>
      <span class="fw-bold fs-5">Sblocca Premium</span>
      <i class="ki-duotone ki-arrow-right fs-4 ms-3">
        <span class="path1"></span>
        <span class="path2"></span>
      </i>
    </router-link>
    <!--end::Action Button-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PremiumLock",
});
</script>

<style scoped>
/* Container principale */
.premium-lock-container {
  min-height: 350px;
  border-radius: 16px;
  position: relative;
  overflow: visible;
}

/* Icon Wrapper */
.premium-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Icona Corona */
.premium-lock-icon {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.15) 0%, rgba(0, 119, 204, 0.35) 100%);
  border: 3px solid rgba(0, 119, 204, 0.3);
  box-shadow: 0 8px 32px rgba(0, 119, 204, 0.25);
  animation: premiumGlow 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

@keyframes premiumGlow {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0, 119, 204, 0.25), 0 0 0 0 rgba(0, 119, 204, 0.4);
  }
  50% {
    transform: scale(1.08) rotate(5deg);
    box-shadow: 0 12px 40px rgba(0, 119, 204, 0.35), 0 0 0 15px rgba(0, 119, 204, 0);
  }
}

/* Sparkle Effect */
.premium-sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(0, 119, 204, 1) 0%, rgba(0, 119, 204, 0) 70%);
  border-radius: 50%;
  animation: sparkle 2s ease-in-out infinite;
  z-index: 1;
}

.sparkle-1 {
  top: -10px;
  left: 20px;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 30px;
  right: -15px;
  animation-delay: 0.7s;
}

.sparkle-3 {
  bottom: -5px;
  left: -10px;
  animation-delay: 1.4s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) rotate(180deg);
  }
}

/* Badge */
.premium-badge {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bottone upgrade */
.premium-lock-btn {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 119, 204, 0.3), 0 4px 8px rgba(0, 119, 204, 0.2);
  border: none;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.premium-lock-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.premium-lock-btn:hover::before {
  left: 100%;
}

.premium-lock-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 119, 204, 0.4), 0 6px 12px rgba(0, 119, 204, 0.3);
}

.premium-lock-btn:active {
  transform: translateY(-1px) scale(0.98);
}

/* Light Mode */
[data-bs-theme="light"] .premium-lock-container {
  background-color: transparent;
}

[data-bs-theme="light"] .premium-lock-title {
  color: #1a1a1a !important;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.9), 0 1px 3px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
}

[data-bs-theme="light"] .premium-lock-description {
  color: #444444 !important;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

[data-bs-theme="light"] .premium-badge .badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.2) 100%);
  border: 1px solid rgba(0, 119, 204, 0.3);
  color: #0077CC;
  backdrop-filter: blur(4px);
}

/* Dark Mode */
[data-bs-theme="dark"] .premium-lock-container {
  background-color: transparent;
}

[data-bs-theme="dark"] .premium-lock-title {
  color: #ffffff !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.5px;
}

[data-bs-theme="dark"] .premium-lock-description {
  color: #e0e0e0 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  line-height: 1.6;
}

[data-bs-theme="dark"] .premium-badge .badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.2) 0%, rgba(0, 119, 204, 0.35) 100%);
  border: 1px solid rgba(0, 119, 204, 0.4);
  color: #66b3ff;
  backdrop-filter: blur(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .premium-lock-container {
    padding: 2rem 1.5rem !important;
    min-height: 250px;
  }
  
  .premium-lock-title {
    font-size: 1.5rem !important;
  }
  
  .symbol-100px {
    width: 80px !important;
    height: 80px !important;
  }
  
  .premium-lock-btn {
    font-size: 0.95rem !important;
    padding: 0.75rem 1.5rem !important;
  }
}
</style>

