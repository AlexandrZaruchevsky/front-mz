<template>
  <overlay-z-v1>
    <div class="flex flex-row" :class="isDetails ? 'bg-secondary-50 card-shadow rounded' : ''"
      style="max-width: 900px; max-height: 415px;">
      <card-entity-v1 :class="!isDetails ? 'card-shadow' : ''" style="min-width: 400px;" :cardFunc="cardFunction">
        <template #body>
          <div class="entity">
            <div class="entity-row">
              <span class="whitespace-nowrap" style="min-width: 180px;">Тип оборудования:</span>
              <SelectZV1 class="select-list w-full" :defaultOption="defaultOptionEquipType"
                :options="equipTypeListForEquip" v-model="equip.equipTypeId" />
            </div>
            <div class="entity-row">
              <span class="whitespace-nowrap" style="min-width: 180px;">Модель оборудования:</span>
              <SelectZV1 class="select-list w-full" :defaultOption="defaultOptionEquipModel"
                :options="equipModelListForEquip" v-model="equip.equipModelId" />
            </div>
            <EquipEntityV1 v-model="equip" />
            <div class="entity-row">
              <span class="whitespace-nowrap" style="min-width: 180px;">Групповой учёт:</span>
              <div>
                <input type="checkbox" v-model="equip.groupAccounting" />
              </div>
            </div>
          </div>
        </template>
      </card-entity-v1>
      <div v-if="isDetails">
        <EquipChildListV1 
          style="min-width: 400px; max-width: 400px;"
          :equips="equipChildren" 
          @equipEdit="equipChildEdit" 
          @equipDelete="deleteChild"
          @equipAdd="equipChildAdd" 
        />
      </div>
    </div>
  </overlay-z-v1>
  <RouterView />
</template>
<script setup lang="ts">
import { useEquipStoreV1 } from '@/stores/EquipStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, ref } from 'vue';
import EquipEntityV1 from '@/components/equips/EquipEntityV1.vue'
import { SelectOption } from '@/model/Page';
import EquipChildListV1 from './EquipChildListV1.vue';
import router from '@/router';
import SelectZV1 from '@/components/ui/inputs/SelectZV1.vue';

const { equip, equipChildren, isDetails, cardFunction, equipTypeListForEquip, equipModelListForEquip } = storeToRefs(useEquipStoreV1())
const { initForm, deleteChild } = useEquipStoreV1();

const equipChildEdit = (id: number = -1) => {
  if (id > 0) {
    router.push({ path: `/v1/equips/${equip.value.id}/children/${id}` })
  }
}

const defaultOptionEquipType = ref<SelectOption>(new SelectOption("-1",'All types'));
const defaultOptionEquipModel = ref<SelectOption>(new SelectOption("-1",'All models'));

const equipChildAdd = () => {
  router.push({ path: `/v1/equips/${equip.value.id}/children/add` })
}

onMounted(async () => {
  await initForm();
})

onUpdated(async () => {
  await initForm();
})


</script>