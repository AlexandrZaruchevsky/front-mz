<template>
  <div class="card">
    <div class="card-header" v-if="header">{{ header }}</div>
    <div class="tool-buttons">
      <button-z v-if="editable" title="add" class="bg-green-600" @click="addEntity" />
      <div v-if="searchable" class="flex items-end gap-2 w-full">
        <select class="select-z" v-model="selectedSort" @change="changeSort">
          <option v-for="opt in cardData.sortOptions" :value="opt.key" :key="opt.key">{{ opt.value }}</option>
        </select>
        <input type="text" v-model="searchText" @input="setSearch" @keyup.enter="search" />
      </div>
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
    <div class="tool-pagination border-t" v-if="navigation">
      <select class="select-z" v-model="selectedPageSize" @change="changePageSize">
        <option v-for="opt in cardData.pageSizeOptions" :value="opt.key" :key="opt.key">{{ opt.value }}</option>
      </select>
      <div class="flex gap-2">
        <button-z-v1 @click="previos" title="Previos" class="btn bg-slate-600" :disabled="cardData.page.first" />
        <button-z-v1 @click="next" title="Next" class="btn bg-slate-600" :disabled="cardData.page.last" />
      </div>
      <div class="mr-16"></div>
    </div>
    <div class="card-footer" v-if="footer">
      <div class="flex gap-2">
        <span class="pr-2 border-r">Всего записей - {{ cardData.page.totalElements }}</span>
        <span class="pr-2 border-r">Страница - {{ currentPage }} / {{ cardData.page.totalPages }}</span>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { CardData } from "@/model/Page";
import { computed, ref } from "vue";
export default {
  name: "CardZV2",
  props: {
    cardData: {
      type: CardData,
      required: false,
      default: new CardData()
    },
    header: {
      type: String,
      // required: false,
      // default: "Header"
    },
    navigation: {
      type: [Boolean, String],
      default: false
    },
    footer: {
      type: [Boolean, String],
      default: false
    },
    editable: {
      type: [Boolean, String],
      default: false
    },
    searchable: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {

    const selectedPageSize = ref(props.cardData.pageRequest.pageSize);
    const selectedSort = ref<string>(props.cardData.pageRequest.sortBy);
    const searchText = ref<string>(props.cardData.pageRequest.search);
    const currentPage = computed<number>(() => props.cardData.page.number + 1)

    const addEntity = () => {
      props.cardData.addEntity()
    }

    const search = () => {
      props.cardData.search();
    }

    const setSearch = () => {
      props.cardData.setSearch(searchText.value);
    }

    const changePageSize = () => {
      props.cardData.changeSizePage(selectedPageSize.value)
    }

    const changeSort = () => {
      searchText.value = "";
      props.cardData.changeSort(selectedSort.value)
    }

    const previos = () => {
      props.cardData.previos()
    }

    const next = () => {
      props.cardData.next()
    }

    return {
      previos,
      next,
      selectedPageSize,
      changePageSize,
      selectedSort,
      changeSort,
      searchText,
      search,
      setSearch,
      addEntity,
      currentPage
    }

  }
}
</script>

<style scoped lang="scss">
.btn {
  min-width: 80px;
}

.card {
  @apply bg-white rounded-lg shadow-xl flex flex-col text-slate-800;

  .card-header {
    @apply p-2 border-b text-xl font-semibold bg-slate-700 rounded-t-lg bg-opacity-80 text-slate-100;
  }

  .card-body {
    @apply h-full overflow-auto;
  }

  .tool-buttons {
    @apply flex items-end px-2 py-1 gap-2 shadow-lg mb-2;
  }

  .tool-pagination {
    @apply flex items-center justify-between px-2 py-1;
  }

  .card-footer {
    @apply p-2 border-t text-sm;
  }
}

.select-z {
  @apply px-2 py-1 border rounded bg-white
}

input {
  @apply w-full px-2 py-1 border-b-2 focus:outline-none focus:border-b-slate-600;
}
</style>
  