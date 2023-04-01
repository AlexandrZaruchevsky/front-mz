<template>
  <overlay-z>
    <card-entity :header="headerForm" class="w-1/3" editable :cardFunc="cardFunction">
      <template #body>
        <form @submit.prevent="saveEntity" class="p-2">
          <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <select class="py-1 px-2 bg-white rounded w-full border-2 border-slate-400" v-model="entity.equipTypeId">
              <option value="-1">Тип не определён</option>
              <option v-for="opt in equipTypeListForEntity" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <select class="py-1 px-2 bg-white rounded w-full border-2 border-slate-400" v-model="entity.equipModelId">
              <option value="-1">Модель не определёна</option>
              <option v-for="opt in equipModelListForEntity" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" :inP="entity.shortName" v-model="entity.shortName" />
            </div>
            <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" :inP="entity.fullName" v-model="entity.fullName" />
            </div>
            <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" :inP="entity.serialNumber" v-model="entity.serialNumber" />
            </div>
            <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" :inP="entity.inventoryNumber" v-model="entity.inventoryNumber" />
            </div>
            <div class="px-2 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" :inP="entity.manufacturer" v-model="entity.manufacturer" />
            </div>
            <div class="px-1 py-1 border-b-2 border-slate-300 border-dotted">
              <input-default class="p-2" type="date" :inP="entity.dateOfManufacture" v-model="entity.dateOfManufacture" />
            </div>
          </div>
        </form>
      </template>
    </card-entity>
  </overlay-z>
</template>

<script setup lang="ts">

// import router from '@/router';
import { useEquipStore } from '@/stores/EquipStore';
import { storeToRefs } from 'pinia';
// import { computed } from 'vue';
// import { useRoute } from 'vue-router';

const { entity, headerForm, cardFunction, equipTypeListForEntity, equipModelListForEntity } = storeToRefs(useEquipStore());
const { saveEntity, editForm } = useEquipStore();

editForm();

// const header = computed(() => {
//   return serviceRequest.value.isAdd() ? "Equip | Add" : "Equip | Update"
// })

// const route = useRoute()

// const paramId = route.params.id as string;

// if (!parseInt(paramId)) {
//   if (paramId === "add") {
//     setAdd();
//   } else {
//     setAdd(false);
//     router.push({ name: "Equips" })
//   }
// }
// else {
//   setAdd(false);
//   fetchEntity(parseInt(paramId));
// }

</script>