<template>
  <div class="pagination-container">
    <div class="dataTables_paginate paging_simple_numbers">
      <ul class="pagination">
        <!-- Previous button -->
        <li
          class="paginate_button page-item"
          :class="{ disabled: isInFirstPage }"
        >
          <a class="page-link" @click="onClickPreviousPage" :class="{ 'pe-none': isInFirstPage }">
            <KTIcon icon-name="left" icon-class="fs-3" />
          </a>
        </li>

        <!-- Page numbers -->
        <li
          v-for="(page, i) in pages"
          class="paginate_button page-item page-number"
          :class="{
            active: isPageActive(page.name),
          }"
          :key="i"
        >
          <a class="page-link" @click="onClickPage(page.name)" :class="{ 'pe-none': page.isDisabled }">
            {{ page.name }}
          </a>
        </li>

        <!-- Next button -->
        <li
          class="paginate_button page-item"
          :class="{ disabled: isInLastPage }"
        >
          <a class="page-link" @click="onClickNextPage" :class="{ 'pe-none': isInLastPage }">
            <KTIcon icon-name="right" icon-class="fs-3" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "table-pagination",
  components: {},

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-change"],
  setup(props, { emit }) {
    const startPage = computed(() => {
      if (
        props.totalPages < props.maxVisibleButtons ||
        props.currentPage === 1 ||
        props.currentPage <= Math.floor(props.maxVisibleButtons / 2) ||
        (props.currentPage + 2 > props.totalPages &&
          props.totalPages === props.maxVisibleButtons)
      ) {
        return 1;
      }

      if (props.currentPage + 2 > props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
      }

      return props.currentPage - 2;
    });

    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        props.totalPages
      );
    });

    const pages = computed(() => {
      const range: Array<{
        name: number;
        isDisabled: boolean;
      }> = [];

      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }

      return range;
    });

    const isInFirstPage = computed(() => {
      return props.currentPage === 1;
    });
    const isInLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const onClickPreviousPage = () => {
      if (!isInFirstPage.value) {
        emit("page-change", props.currentPage - 1);
      }
    };
    const onClickPage = (page: number) => {
      if (page !== props.currentPage) {
        emit("page-change", page);
      }
    };
    const onClickNextPage = () => {
      if (!isInLastPage.value) {
        emit("page-change", props.currentPage + 1);
      }
    };
    const isPageActive = (page: number) => {
      return props.currentPage === page;
    };

    return {
      startPage,
      endPage,
      pages,
      isInFirstPage,
      isInLastPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      isPageActive,
      getAssetPath,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  margin: 0;
  gap: 0.25rem;
  flex-wrap: nowrap;
}

.page-item {
  margin: 0;
}

.pe-none {
  pointer-events: none;
  cursor: default !important;
}

/* Hide page numbers on very small screens, keep only prev/next */
@media (max-width: 480px) {
  .page-number {
    display: none;
  }
  
  .page-number.active {
    display: list-item;
  }
}
</style>
