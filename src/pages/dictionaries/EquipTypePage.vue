<template>
  <overlay-z>
    <card-entity 
      :header="header" 
      class="w-1/3"
      editable 
      :cardFunc="cardFunction"
    >
      <template #body>
        <form @submit.prevent="saveEntity">
          <div class="flex flex-col gap-1">
            <div class="p-2">
              <input-default class="p-2" :inP="entity.name" v-model="entity.name" />
            </div>
          </div>
        </form>
      </template>
    </card-entity>
  </overlay-z>
</template>

<script setup lang="ts">

import router from '@/router';
import { useEquipTypeStore } from '@/stores/EquipTypeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { serviceRequest, entity, cardFunction } = storeToRefs(useEquipTypeStore());
const { fetchEntity, setAdd, saveEntity } = useEquipTypeStore();

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "EquipTypes | Add" : "EquipTypes | Update"
})

const route = useRoute()

const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    setAdd(false);
    router.push({ name: "EquipTypes" })
  }
}
else {
  setAdd(false);
  fetchEntity(parseInt(paramId));
}

</script>