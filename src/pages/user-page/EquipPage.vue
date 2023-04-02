<template>
  <overlay-z>
    <card-entity :header="headerForm" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12" editable :cardFunc="cardFunction">
      <template #body>
        <form @submit.prevent="" class="p-2">
          <div class="flex flex-row gap-2 items-center px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <label class="label-input" for="type">
              Тип оборудования:
            </label>
            <select name="type" class="py-1 px-2 bg-white w-full border-b-2 border-slate-400"
              v-model="entity.equipTypeId">
              <option value="-1">Тип не определён</option>
              <option v-for="opt in equipTypeListForEntity" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-row gap-2 items-center px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <label class="label-input" for="model">
              Модель оборудования:
            </label>
            <select name="model" class="py-1 px-2 bg-white w-full border-b-2 border-slate-400"
              v-model="entity.equipModelId">
              <option value="-1">Модель не определёна</option>
              <option v-for="opt in equipModelListForEntity" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <div class="input-field-wraper">
              <label class="label-input" for="shortName">
                Краткое наименование:
              </label>
              <input class="input-field" type="text" @keyup.enter="saveEntity" name="shortName"
                v-model="entity.shortName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="fullName">
                Полное наименование:
              </label>
              <input class="input-field" type="text" @keyup.enter="saveEntity" name="fullName"
                v-model="entity.fullName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="serialNumber">
                Серийный номер:
              </label>
              <input class="input-field" type="text" @keyup.enter="saveEntity" name="serialNumber"
                v-model="entity.serialNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="inventoryNumber">
                Инвентарный номер:
              </label>
              <input class="input-field" type="text" @keyup.enter="saveEntity" name="inventoryNumber"
                v-model="entity.inventoryNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="manufacturer">
                Изготовитель:
              </label>
              <input class="input-field" type="text" @keyup.enter="saveEntity" name="manufacturer"
                v-model="entity.manufacturer" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="dateOfManufacture">
                Дата производства:
              </label>
              <input class="input-field" type="date" @keyup.enter="saveEntity" name="dateOfManufacture"
                v-model="entity.dateOfManufacture" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="groupAccounting">
                Групповой учёт:
              </label>
              <input class="" type="checkbox" @keyup.enter="saveEntity" name="groupAccounting"
                v-model="entity.groupAccounting" />
              <router-link v-if="isGroupAccounting && entity.id>0" :to="details" class="ml-4 underline">details</router-link>
            </div>
          </div>
        </form>
        <div v-if="isGroupAccounting && entity.id>0">
        </div>
      </template>
    </card-entity>
    <router-view />
  </overlay-z>
</template>

<script setup lang="ts">

import { useEquipStore } from '@/stores/EquipStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const { entity, headerForm, cardFunction, equipTypeListForEntity, equipModelListForEntity, isGroupAccounting } = storeToRefs(useEquipStore());
const { saveEntity, editForm } = useEquipStore();

const details = computed<string>(()=>`/equips/${entity.value.id}/details`);

editForm();

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