<template>
  <div class="flex flex-col gap-2 bg-white rounded-lg p-4"
    style="min-height: 400px; max-height: 400px; min-width: 400px; max-width: 400px;">
    <div>
      <input type="text" class="px-2 py-1 rounded border-2 outline-none focus:border-slate-500 focus:shadow-lg w-full"
        v-model="searchText" @keyup="search" ref="searchInput" />
    </div>
    <div class="border-t-2 border-dotted"></div>
    <div></div>
    <div class="flex flex-col h-full overflow-auto border rounded p-2">
      <template v-if="choiceList.length > 0">
        <div v-for="entity of choiceList" :key="entity.key" class="flex flex-col mb-1">
          <div class="border border-slate-500 rounded-lg p-2">
            <div class="flex justify-between gap-2 items-center">
              <span class="overflow-hidden whitespace-nowrap">{{ entity.value }}</span>
              <button class="px-2 py-0.5 border border-slate-500 rounded hover:bg-slate-300"
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
import debounce from 'lodash.debounce';
import { ref, computed, watch, onMounted } from 'vue';

export default {
  name: "CardChoiceV1",
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
  },
  setup(props) {
    const searchText = ref<string>("");
    const searchInput = ref<HTMLElement>();
    
    onMounted(()=>{
      searchInput.value?.focus()  
    })

    const search = debounce(() => {
      if (typeof props.searchFunc != "function") {
        console.log("search function not implemented");
      } else {
        props.searchFunc(searchText.value);
      }
    }, 500);
    const rowCount = computed<number>(() => {
      if (typeof props.rowVisible == "string" && parseInt(props.rowVisible)) {
        return parseInt(props.rowVisible);
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
    return {
      searchText,
      search,
      rowCount,
      choice,
      searchInput
    }
  }
}
</script>