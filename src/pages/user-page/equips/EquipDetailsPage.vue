<template>
  <overlay-z class="flex flex-col w-full">
    <card-entity :header="header" class="w-full h-full lg:w-10/12 xl:w-8/12 2xl:w-7/1">
      <template #body>
        <div class="p-4 flex flex-col">
          <div class="flex flex-row gap-4 py-2 border-b-2 border-slate-500">
            <div class="flex flex-row gap-2 w-1/2">
              <span>Наименование</span>
              <strong class="border-b-2 border-slate-400 px-2 whitespace-nowrap overflow-hidden">{{ entity.shortName }}</strong>
            </div>
            <div class="flex flex-row gap-2 w-1/2">
              <span>Инвентарный номер:</span>
              <strong class="border-b-2 border-slate-400 px-2">{{ entity.inventoryNumber }}</strong>
            </div>
          </div>
          <div>
            <div class="py-2 border-b"><button-z-v1 title="add" class="bg-slate-500" @click="$router.push({path:`/equips/${entity.id}/details/add`})" /></div>
            <div class="flex flex-col gap-1 pt-2">
              <div 
                v-for="equipChild in equipChildren" 
                :key="equipChild.id" 
                class="flex flex-row py-0.5 rounded-lg border-b-2 border-slate-400 border-dotted hover:cursor-pointer hover:bg-slate-200"
                @click="$router.push({path:`/equips/${entity.id}/details/${equipChild.id}`})"
              >
                <div class="px-2 py-0.5">
                  {{equipChild.shortName}}
                </div>
                <div class="px-2 py-0.5">
                  {{equipChild.equipTypeName}}
                </div>
                <div class="px-2 py-0.5">
                  {{equipChild.inventoryNumber}}
                </div>
                <div class="px-2 py-0.5">
                  {{equipChild.serialNumber}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card-entity>
  </overlay-z>
  <router-view />
</template>

<script setup lang="ts">

import { useEquipStore } from '@/stores/EquipStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const { entity, equipChildren } = storeToRefs(useEquipStore());
const { detailForm } = useEquipStore();

// const details = computed<string>(() => `/equips/${entity.value.id}/details`);

detailForm();

const header = computed<string>(() => `Equip details [ ${entity.value.id} ]`)

</script>
