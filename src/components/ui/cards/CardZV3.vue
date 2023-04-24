<template>
  <div class="card relative card-shadow">
    <div v-if="editFloat" class="absolute floating-button button-0 z-10 bottom-0 right-10"
      style="min-height: 60px;min-width: 60px;" @click="addEntity">
      <div class="absolute rigth-0 bottom-8">
        <icon-plus class="bg-primary-600" size="xl" />
      </div>
    </div>
    <div class="card-header" v-if="header">{{ header }}</div>
    <div class="flex flex-col">
      <div>
        <slot name="tool-additional" />
      </div>
      <div class="tool-buttons">
        <button-z v-if="editable" title="add" class="bg-green-600" @click="addEntity" />
        <slot name="tool-buttons" />
        <div v-if="searchable" class="flex items-end gap-2 w-full">
          <SelectZV1 
            class="select-list" 
            :options="cardData.sortOptions" 
            v-model="selectedSort" 
            @change="changeSort" 
            v-show="chSort==true"
          />
          <input-field v-model="searchText" @input="setSearch" @keyup="search" v-focus/>
        </div>
      </div>
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
    <div class="tool-pagination" v-if="navigation">
      <div class="flex gap-2">
        <span class="pr-2 border-r" style="min-width: 110px;">Page  {{ currentPage }} of {{ cardData.page.totalPages }}</span>
      </div>
      <select class="select-z" v-model="selectedPageSize" @change="changePageSize">
        <option v-for="opt in cardData.pageSizeOptions" :value="opt.key" :key="opt.key">{{ opt.value }}</option>
      </select>
      <div class="flex items-center">
        <IconAngelDoubleLeft @click="first" size="sm" :disabled="cardData.page.first" />
        <IconAngelLeft @click="previos" :disabled="cardData.page.first" size="sm" />
        <IconAngelRight @click="next" :disabled="cardData.page.last" size="sm" />
        <IconAngelDoubleRight @click="last" :disabled="cardData.page.last" size="sm" />
      </div>
      <div class="mr-16"></div>
    </div>
  </div>
</template>
  
<script lang="ts">
import debounce from 'lodash.debounce'
import { CardDataV1 } from "@/model/Page";
import { computed, ref } from "vue";
export default {
  name: "CardZV3",
  props: {
    cardData: {
      type: CardDataV1,
      required: false,
      default: new CardDataV1()
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
    editFloat: {
      type: [Boolean, String],
      default: false
    },
    searchable: {
      type: [Boolean, String],
      default: false
    },
    chSort: {
      type: [Boolean, String],
      default: true
    },
  },
  setup(props) {

    const selectedPageSize = ref(props.cardData.pageRequest.pageSize);
    const selectedSort = ref<string>(props.cardData.pageRequest.sortBy);
    const searchText = ref<string>(props.cardData.pageRequest.search);
    const currentPage = computed<number>(() => props.cardData.page.empty ? 0 : props.cardData.page.number + 1)

    const addEntity = () => {
      props.cardData.addEntity()
    }

    const search = debounce(() => {
      props.cardData.search();
    }, 500)

    // const search = () => {
    //   props.cardData.search();
    // }

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

    const first = () => {
      props.cardData.first()
    }

    const last = () => {
      props.cardData.last()
    }

    return {
      previos,
      next,
      first,
      last,
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
  @apply h-full bg-white rounded-lg flex flex-col;

  .card-header {
    @apply p-2 border-b text-xl font-semibold bg-primary-800 rounded-t-lg bg-opacity-80 text-primary-50;
  }

  .card-body {
    @apply h-full overflow-auto;
  }

  .tool-buttons {
    @apply flex items-end p-4 gap-2 shadow-lg mb-2;
  }

  .tool-pagination {
    @apply flex items-center justify-start gap-4 p-4  border-t;
  }

  .card-footer {
    @apply p-8 border-t text-sm;
  }
}

.select-z {
  @apply px-2 py-1 border-primary-800 border rounded bg-white
}

input {
  @apply w-full px-2 py-1 border-b-2 focus:outline-none focus:border-b-slate-600;
}
</style>
  