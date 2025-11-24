<template>
  <!--begin::Mixed Widget 14-->
  <div
    :class="widgetClasses"
    class="card theme-dark-bg-body"
    :style="`background-color: ${widgetColor}`"
  >
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <!--begin::Wrapper-->
      <div class="d-flex flex-column mb-7">
        <!--begin::Title-->
        <a href="#" class="text-dark text-hover-primary fw-bold fs-3"
          >{{ title }}</a
        >
        <!--end::Title-->
      </div>
      <!--end::Wrapper-->

      <!--begin::Row-->
      <div class="row g-0">
        <!--begin::Col-->
        <div v-for="(item, index) in items" :key="index" class="col-6">
          <div class="d-flex align-items-center mb-9 me-2">
            <!--begin::Symbol-->
            <!-- <div class="symbol symbol-40px me-3">
              <div class="symbol-label bg-body bg-opacity-50">
                <KTIcon icon-name="abstract-42" icon-class="fs-1 text-dark" />
              </div>
            </div> -->
            <!--end::Symbol-->

            <!--begin::Title-->
            <div>
              <div class="fs-5 text-dark fw-bold lh-1">{{item[0]}}</div>
              <div class="fs-7 text-gray-600 fw-semobold">{{item[1]}}</div>
            </div>
            <!--end::Title-->
          </div>
        </div>
        <!--end::Col-->

      </div>
      <!--end::Row-->
    </div>
  </div>
  <!--end::Mixed Widget 14-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "widget-14",
  props: {
    widgetClasses: String,
    widgetColor: String,
    datas: Object,
    title: String
  },
  setup(props) {
    const items = Object.entries(props.datas).slice(1);
    return {
      items,
      getAssetPath,
    };
  },
});
</script>
