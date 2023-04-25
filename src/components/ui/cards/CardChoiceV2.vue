<template>
  <div class="flex flex-col gap-2 bg-white rounded-lg p-4 border border-secondary-500 relative"
    style="min-height: 400px; max-height: 400px; min-width: 600px; max-width: 600px;">
    <div class="absolute right-0 top-12">
      <div class="absolute left-2 bottom-0 hover:cursor-pointer" @click="$emit('hide')">
        <icon-cross />
      </div>
    </div>
    <div class="flex flex-row gap-2 items-center">
      <template v-if="isSelectSearch">
        <select-z-v1 class="select-list" v-model="currentSortBy" :options="sortList" />
      </template>
      <input-field v-model="searchText" @keyup="search" v-focus placeHolder="Search ..." />
    </div>
    <div class="border-t-2 border-dotted"></div>
    <div></div>
    <div
      class="flex flex-col h-full overflow-auto border border-secondary-500 shadow-secondary-300 shadow-inner rounded p-2">
      <template v-if="choiceList.length > 0">
        <div v-for="entity of choiceList" :key="entity.key" class="flex flex-col mb-1">
          <div class="border border-secondary-500 rounded-lg p-2">
            <div class="flex justify-between gap-2 items-center">
              <span class="overflow-hidden whitespace-nowrap">{{ entity.value }}</span>
              <button class="px-2 py-0.5 border border-primary-500 rounded hover:bg-primary-300"
                @click="choice(entity)">choice</button>
            </div>
            <div v-if="rowCount > 1">
              <div class="border-t mt-3"></div>
              <div class="underline">{{ entity.description1 }}</div>
            </div>
            <div v-if="rowCount > 2">
              <div class="border-t mt-1"></div>
              <div>{{ entity.description2 }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-center">No Content</div>
      </template>
    </div>
  </div>
</template>
<script  lang="ts">

import { EntityChoice } from '@/model/Choice';
import type { SelectOption } from '@/model/Page';
import debounce from 'lodash.debounce';
import { ref, computed, onMounted } from 'vue';

export default {
  name: "CardChoiceV2",
  props: {
    choiceList: {
      type: Array<EntityChoice>,
      required: false,
      default: () => new Array()
    },
    rowVisible: {
      type: String,
      required: false,
    },
    searchFunc: {
      type: Function,
      required: false
    },
    choiceFunc: {
      type: Function,
      required: false
    },
    sortList: {
      type: Array<SelectOption>,
      required: false,
      default: () => new Array()
    }
  },
  setup(props) {
    const searchText = ref<string>("");

    const currentSortBy = ref<string | number>(
      props.sortList.length > 0
        ? props.sortList[0].key
        : ''
    );

    const search = debounce(() => {
      if (typeof props.searchFunc != "function") {
        console.log("search function not implemented");
      } else {
        props.searchFunc(currentSortBy.value as string, searchText.value);
      }
    }, 500);

    const rowCount = computed<number>(() => {
      if (typeof props.rowVisible == "string" && Number(props.rowVisible)) {
        return Number(props.rowVisible);
      } else {
        return 1;
      }
    })

    const choice = (entityChoice: EntityChoice = new EntityChoice()) => {
      if (typeof props.choiceFunc != "function") {
        console.log("choice function not implemented");
      } else {
        props.choiceFunc(entityChoice);
      }
    }

    const isSelectSearch = computed(() => props.sortList.length > 0);

    return {
      searchText,
      search,
      rowCount,
      choice,
      isSelectSearch,
      currentSortBy
    }
  }
}
</script>