<template>
  <div class="card">
    <div class="card-header">Header</div>
    <div class="tool-buttons">
      <slot name="tool-buttons" />
    </div>
    <div class="card-body">
      <slot name="card-body" />
    </div>
    <div class="tool-pagination">
      <slot name="tool-pagination" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
    <!-- <div v-if="navigation">
      <button @click="pageNavigation.next">Next function</button>
      <button @click="pageNavigation.previos">Previos function</button>
    </div>
    <div v-if="navigation">{{ pageNavigation.currentPage }} - - - {{ currentPage }}</div> -->
  </div>
</template>
  
<script lang="ts">
// import { IPageNavigation } from "@/model/Page"
// import { IPageNavigation } from "@/model/Page";
import { computed } from "vue";
export default {
  props: {
    // pageNavigation: {
    //   type: IPageNavigation,
    //   required: false,
    //   default: () => new IPageNavigation()
    // },
    header: {
      type: String,
      required: false,
      default: "Header"
    },
    navigation: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    // const currentPage = computed<number>(() => props.pageNavigation.currentPage + 1)
    // return {
    //   currentPage
    // }
  }
}
</script>

<style scoped lang="scss">
.card {
  @apply bg-white rounded-lg shadow-xl border flex flex-col text-slate-800;

  .card-header {
    @apply p-2 border-b text-xl font-semibold;
  }

  .card-body {
    @apply h-full overflow-auto;
  }
}
</style>
  