<template>
  <overlay-z class="z-20">
    <card-entity header="ArmDetails" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12"
      :cardFunc="cardFunction">
      <template #body>
        <div class="p-2">
          <div class="flex flex-col gap-1">
            <div class="input-field-wraper">
              <label class="label-input">Наименование:</label>
              <input-field v-model="entity.name" disabled />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Description:</label>
              <input-field v-model="entity.description" disabled />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">МОЛ:</label>
              <input-field v-model="entity.molFio" disabled />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">POP:</label>
              <input-field v-model="entity.popName" disabled />
            </div>
          </div>
        </div>
        <div class="p-2 border-t flex flex-col">
          <!-- <div><button-z-v1 title="add" class="bg-primary-600" /></div> -->
          <div class="flex flec-col h-full border border-secondary-300 rounded p-1"
            style="min-height: 200px; max-height: 200px;">
            <div class="overflow-auto w-full">
              <div v-for="armDetail of armDetailList" :key="armDetail.id" class="flex flex-col gap-2">
                <div
                  class="flex flex-row gap-2 rounded-md px-2 py-1 border-secondary-400 border-b-2 border-dotted w-full hover:bg-secondary-200 hover:cursor-pointer"
                  @click="$router.push({ path: `/arms/${entity.id}/details/${armDetail.id}` })">

                  <div class="w-1/3">{{ armDetail.name }}</div>
                  <div class="w-1/3">{{ armDetail.domainName }}</div>
                  <div class="w-1/3">{{ armDetail.ipV4 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card-entity>
    <div class="relative">
      <icon-plus 
        class="absolute right-4 bottom-4 bg-primary-800" size="md" 
        @click="$router.push({path:`/arms/${entity.id}/details/add`})"
      />
    </div>
  </overlay-z>
  <router-view />
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useArmDetailStore } from '@/stores/ArmDetailStore';


const { entity, armDetailList, cardFunction } = storeToRefs(useArmDetailStore());
const { initForm } = useArmDetailStore();

// const details = computed<string>(() => `/equips/${entity.value.id}/details`);
onMounted(async () => {
  await initForm();
})


</script>

<style lang="scss">
.input-field-wraper {
  @apply flex flex-row gap-2 items-center px-2 py-1 border-b-2 border-slate-300 border-dotted;
}

.input-field {
  @apply px-2 py-0.5 w-full border-b-2 border-teal-800 border-opacity-20;
}

.input-field:focus {
  @apply border-opacity-60 outline-none;
}

.label-input {
  min-width: 184px;
  @apply whitespace-nowrap;
}
</style>