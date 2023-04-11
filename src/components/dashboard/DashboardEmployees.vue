<template>
  <div class="shadow-2xl flex flex-col rounded-xl bg-secondary-50" style="height: 400px; width: 500px;">
    <div
      class="rounded-t-xl bg-primary-800 text-secondary-100 px-2 py-1 font-semibold text-lg border-primary-700 border-b">
      Employees
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col p-2 h-full">
        <div class="flex flex-col gap-0.5">
          <div 
            class="flex flex-row justify-between border-b-2 border-dotted border-secondary-400 hover:underline hover:cursor-pointer" 
            @click="choiceDep(-1)"
          >
            <span>Общее количество:</span>
            <strong>{{ emplStat.total }}</strong>
          </div>
        </div>
        <div class="mt-2 border-t border-secondary-500">
          <input-field v-focus v-model="search" placeHolder="search ..." />
        </div>
        <div class="flex flex-col gap-0.5 h-full overflow-auto p-2 mt-1 shadow-inner shadow-secondary-500"
          style="max-height: 276px;">
          <div v-for="depStat of list" :key="depStat.depId"
            class="pr-2 flex flex-row gap-4 justify-between border-b-2 border-dotted border-secondary-400 hover:underline hover:cursor-pointer"
            @click="choiceDep(depStat.depId)"
          >
            <span class="overflow-hidden whitespace-nowrap">{{ depStat.depName }}</span>
            <strong>{{ depStat.emplCount }}</strong>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="h-full flex items-center justify-center">
        <icon-spiner-refresh />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { DepStat } from '@/model/Stats';
import { useStatStore } from '@/stores/StatStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const search = ref<string>("");

const { emplStat } = storeToRefs(useStatStore());
const { fetchEmplStat } = useStatStore();

const isLoading = ref<boolean>(false);

const list = computed<Array<DepStat>>(() => {
  if (typeof search.value == 'string' && search.value.trim() != "") {
    return emplStat.value.stats.filter(depStat =>
      depStat.depName.toLowerCase()
        .includes(search.value.trim().toLowerCase()))
  } else {
    return emplStat.value.stats
  }
})

const emit = defineEmits(['choiceDep'])


const choiceDep = (depId: number = -1) => {
  emit('choiceDep', depId);
}

onMounted(async () => {
  isLoading.value = true;
  await fetchEmplStat().then(() => {
    isLoading.value = false;
  });
})

</script>