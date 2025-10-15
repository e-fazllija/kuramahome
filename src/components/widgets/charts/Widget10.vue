<template>
  <!--begin::Stats Widget-->
  <div class="card card-xl-stretch mb-xl-10" 
       :class="widgetClasses">
    
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-center flex-column w-100 text-center">
        <span 
          class="card-label fw-bold fs-3 mb-1"
          :class="{ 'cursor-pointer text-hover-primary': clickable }"
          @click="handleTitleClick">
          {{ title }}
        </span>
        <span v-if="subtitle" class="text-muted fw-semobold fs-7">{{ subtitle }}</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Numero Animato-->
      <div class="text-center mb-6">
        <div class="fw-bold fs-1 mb-2" 
             :class="numberColorClass"
             :style="{ animation: isAnimating ? 'numberPop 0.6s ease-out' : 'none' }">
          {{ animatedValue }}
        </div>
        <div class="text-muted fs-6">{{ valueLabel }}</div>
      </div>
      <!--end::Numero Animato-->




      <!--begin::Labels-->
      <div v-if="leftLabel || rightLabel" class="d-flex justify-content-center align-items-center mt-4 gap-3">
        <div v-if="leftLabel">
          <div class="badge badge-light-info p-3">
            <i class="ki-duotone ki-chart-simple fs-2 text-info me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            <span class="fw-bold fs-7 text-info">{{ leftLabel }}</span>
          </div>
        </div>
        <div v-if="rightLabel">
          <div class="badge badge-light-success p-3">
            <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold fs-7 text-success">{{ rightLabel }}</span>
          </div>
        </div>
      </div>
      <!--end::Labels-->

    </div>
    <!--end::Body-->
  </div>
  <!--end::Stats Widget-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "widget-10",
  props: {
    widgetClasses: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    valueLabel: {
      type: String,
      required: true
    },
    leftLabel: {
      type: String,
      default: ""
    },
    rightLabel: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "primary", // primary, success, info, warning
      validator: (value: string) => ["primary", "success", "info", "warning"].includes(value)
    },
    icon: {
      type: String,
      default: "ki-profile-user"
    },
    tooltipText: {
      type: String,
      default: ""
    },
    badgeText: {
      type: String,
      default: ""
    },
    clickable: {
      type: Boolean,
      default: false
    },
    clickRoute: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const router = useRouter();
    const animatedValue = ref<number>(0);
    const isAnimating = ref<boolean>(false);

    // Configurazione tema semplificata
    const themeConfig = computed(() => {
      const themes = {
        primary: { numberColor: "text-primary" },
        success: { numberColor: "text-success" },
        info: { numberColor: "text-info" },
        warning: { numberColor: "text-warning" }
      };
      return themes[props.theme as keyof typeof themes] || themes.primary;
    });

    // Classi CSS calcolate
    const numberColorClass = computed(() => themeConfig.value.numberColor);

    // Animazione del numero
    const animateNumber = (target: number, duration: number = 2000) => {
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;
      
      isAnimating.value = true;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          animatedValue.value = target;
          clearInterval(timer);
          isAnimating.value = false;
        } else {
          animatedValue.value = Math.floor(current);
        }
      }, 16);
    };


    onMounted(() => {
      // Avvia animazione dopo un breve delay
      setTimeout(() => {
        animateNumber(props.value);
      }, 300);
    });

    const handleTitleClick = () => {
      if (props.clickable && props.clickRoute) {
        router.push(props.clickRoute);
      }
    };

    return {
      animatedValue,
      isAnimating,
      numberColorClass,
      leftLabel: props.leftLabel,
      rightLabel: props.rightLabel,
      handleTitleClick
    };
  }
});
</script>

<!-- CSS moved to global file: widgets.css -->
