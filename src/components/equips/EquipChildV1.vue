<template>
  <overlay-z-v1>
    <div class="pt-4">

      <!-- <card-entity-v1 class="card-shadow" style="min-width: 400px;"> -->
      <card-entity-v1 class="card-shadow" style="min-width: 400px;" :cardFunc="cardFunctionChild">
        <template #body>
          <div class="entity">
            <div class="entity-row">
              <span class="whitespace-nowrap" style="min-width: 180px;">Тип оборудования:</span>
              <SelectZV1 class="select-list w-full" :defaultOption="defaultOptionEquipType"
                :options="equipTypeListForEquipChild" v-model="equipChild.equipTypeId" />
            </div>
            <div class="entity-row">
              <span class="whitespace-nowrap" style="min-width: 180px;">Модель оборудования:</span>
              <SelectZV1 class="select-list w-full" :defaultOption="defaultOptionEquipModel"
                :options="equipModelListForEquipChild" v-model="equipChild.equipModelId" />
            </div>
            <EquipEntityV1 v-model="equipChild" />
          </div>
        </template>
      </card-entity-v1>
    </div>
  </overlay-z-v1>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, ref } from 'vue';
import EquipEntityV1 from './EquipEntityV1.vue'
import { SelectOption } from '@/model/Page';
import { useEquipStoreV1 } from '@/stores/EquipStoreV1';

const { equipChild, equipTypeListForEquipChild, equipModelListForEquipChild, cardFunctionChild } = storeToRefs(useEquipStoreV1());

const defaultOptionEquipType = ref<SelectOption>(new SelectOption("-1",'All types'));
const defaultOptionEquipModel = ref<SelectOption>(new SelectOption("-1",'All models'));

const { initFormChild } = useEquipStoreV1()

onMounted(async () => {
  await initFormChild()
})

onUpdated(async () => {
  await initFormChild();
})

</script>