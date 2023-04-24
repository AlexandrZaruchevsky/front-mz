<template>
  <div class="absolute flex rounded-lg top-2 text-base" @click.stop>
    <div class="bg-secondary-100  rounded-lg w-full">
      <div class="h-full flex flex-col">
        <div class="header flex flex-row justify-between text-xl items-center font-semibold bg-info-700 p-2 rounded-t-lg">
          <div class="text-secondary-50">{{ empl?.lastName }} {{ empl?.firstName }} {{ empl?.middleName }}</div>
          <div><x-icon @click="$emit('close')" /></div>
        </div>
        <div class="flex flex-row gap-2 pl-4 py-1 border-b-2 border-dotted border-secondary-500">
          <div class="px-2 cursor-pointer border-b-2 border-primary-700 border-opacity-0 hover:border-opacity-90"
            :class="changeMenuItem == 'arms' ? 'bg-primary-800 bg-opacity-70 rounded text-secondary-50' : ''"
            @click="changeItem('arms')">
            АРМЫ
          </div>
          <div class="px-2 cursor-pointer border-b-2 border-primary-700 border-opacity-0 hover:border-opacity-90"
          :class="changeMenuItem == 'ozi' ? 'bg-primary-800 bg-opacity-70 rounded text-secondary-50' : ''" @click="changeItem('ozi')">
            ОЗИ
          </div>
        </div>
        <div class="border h-full m-2 mt-1 shadow-inner shadow-secondary-500">
          <ArmsInfo v-if="changeMenuItem=='arms'" :armsInfo="emplInfo.armInfos" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Employee } from '@/model/Employee';
import StatService from '@/services/StatService';
import { onMounted, ref, type PropType} from 'vue';
import ArmsInfo from './ArmsInfo.vue'
import { EmplInfo } from '@/model/Info';

const props = defineProps({
  empl: {
    type: Object as PropType<Employee>,
    required: false
  }
})

type MenuItem = 'arms' | 'ozi'

const changeMenuItem = ref<MenuItem>('arms');

const changeItem = (item: MenuItem = 'arms') => {
  changeMenuItem.value = item
}

const emplInfo = ref<EmplInfo>(new EmplInfo());

const statService = new StatService("stats");

const fetchEmplInfo = async (username: string = "") => {
  await statService.fetchEmplInfoByUsername(username)
    .then(resp => {
      emplInfo.value = resp
    })
}

onMounted(async () => {
  await fetchEmplInfo(props.empl?.accountName);
})

</script>