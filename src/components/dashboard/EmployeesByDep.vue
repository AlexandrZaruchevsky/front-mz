<template>
  <div class="bg-secondary-50 flex flex-col rounded-lg">
    <div class="flex flex-row p-2 justify-between text-secondary-50 bg-primary-800 font-semibold text-xl rounded-t-lg">
      <div>
        Employee search
      </div>
      <x-icon @click="$emit('close')" />
    </div>
    <div class="flex flex-row gap-2 p-2">
      <select class="bg-secondary-50 border-2 border-primary-700 px-2 rounded" v-model="currentDepId"
        style="width: 300px; max-width: 300px;">
        <option :value="-1">Все отделы</option>
        <option v-for="dep of deps" :key="dep.id" :value="dep.id">
          {{ dep.name }}
        </option>
      </select>
      <input-field v-focus placeHolder="search ..." v-model="search" />
    </div>
    <template v-if="!isLoading">
      <div class="h-full border m-2 overflow-auto shadow-inner shadow-secondary-500 p-2 flex flex-col gap-0.5">
        <EmplEntityV1 v-for="empl of emplList" :key="empl.id" :empl="empl" />
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
import type { Employee } from '@/model/Employee';
import { useStatStore } from '@/stores/StatStore';
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import DepService from '@/services/DepService';
import type { DepV1 } from '@/model/DepV1';
import EmplEntity from './EmplEntity.vue';
import EmplEntityV1 from './EmplEntityV1.vue';

import debounce from "lodash.debounce"

const isLoading = ref<boolean>(false);
const search = ref<string>("");

const { empls } = storeToRefs(useStatStore());
const { fetchEmplByDep } = useStatStore();

const depService = new DepService("departments");
const deps = ref<Array<DepV1>>(new Array())

const props = defineProps({
  depId: {
    type: Number,
    required: false
  }
});


const currentDepId = ref<number>(-1);

const emplList = computed<Array<Employee>>(() => {
  if (typeof search.value == 'string') {
    if (parseInt(search.value.trim())) {
      return empls.value
        .filter(empl => empl.kspd)
        .filter(empl => empl.kspd.includes(search.value.trim()))
    } else if (search.value.trim() != '') {
      return empls.value.filter(empl => {
        const fio = [empl.lastName?.trim(), empl.firstName?.trim(), empl.middleName?.trim()].join('').toLowerCase();
        return fio.includes(search.value.trim().toLowerCase());
      });
    }
  }
  return empls.value
})

const fetchEmpl = async (): Promise<void> => {
  isLoading.value = true;
  if (currentDepId.value) {
    await fetchEmplByDep(currentDepId.value).then(() => isLoading.value = false)
  } else {
    await fetchEmplByDep().then(() => isLoading.value = false)
  }
}

watch(currentDepId, async (): Promise<void> => {
  await fetchEmpl()
})

onMounted(async (): Promise<void> => {

  if (typeof props.depId == 'number') {
    currentDepId.value = props.depId
  }

  await fetchEmpl();

  deps.value = await depService.getAllDeps();

})

</script>