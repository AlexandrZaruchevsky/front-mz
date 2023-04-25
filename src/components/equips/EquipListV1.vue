<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full" navigation editFloat searchable :cardData="cardDataV1">
      <template #tool-buttons>
        <SelectZV1 style="width: 200px; min-width: 200px; max-width: 200px;" class="select-list"
          :defaultOption="defaultOptionEquipType" :options="equipTypeList" v-model="pageRequest.equipTypeId" />
        <SelectZV1 style="width: 200px; min-width: 200px; max-width: 200px;" class="select-list"
          :defaultOption="defaultOptionEquipModel" :options="equipModelList" v-model="pageRequest.equipModelId" />
      </template>
      <template #body>
        <template v-if="!isLoading">
          <div class="p-2">
            <div class="flex flex-col gap-0.5">
              <EquipEntityListV1 v-for="equip of equips" :key="equip.id" :equip="equip" @onClick="gotoEquipEdit" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center">
            <icon-spiner-refresh />
          </div>
        </template>
      </template>
    </card-z-v3>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { useEquipStoreV1 } from '@/stores/v1/EquipStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import EquipEntityListV1 from './EquipEntityListV1.vue';
import router from '@/router';
import { SelectOption } from '@/model/Page';

const isLoading = ref<boolean>(false);

const { equips, cardDataV1, equipTypeList, equipModelList, pageRequest } = storeToRefs(useEquipStoreV1());

const { fetchEquips, fetchEquipTypes } = useEquipStoreV1();

const defaultOptionEquipType = ref<SelectOption>(new SelectOption("-1", 'All types'));
const defaultOptionEquipModel = ref<SelectOption>(new SelectOption("-1", 'All models'));

onMounted(async () => {
  isLoading.value = true;
  await fetchEquips().then(async () => {
    await fetchEquipTypes().then(() => {
      isLoading.value = false
    })
  })
})

const gotoEquipEdit = (id: number = -1) => {
  router.push({ path: `/v1/equips/${id}` });
}

</script>