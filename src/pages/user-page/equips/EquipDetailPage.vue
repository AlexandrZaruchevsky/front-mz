<template>
  <overlay-z class="bg-opacity-0">
    <card-entity header="Equip Child" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12" editable :cardFunc="cardFuncChild">
      <template #body>
        <form @submit.prevent="" class="p-2">
          <div class="flex flex-row gap-2 items-center px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <label class="label-input" for="type">
              Тип оборудования:
            </label>
            <select name="type" class="py-1 px-2 bg-white w-full border-b-2 border-slate-400"
              v-model="equipChild.equipTypeId">
              <option value="-1">Тип не определён</option>
              <option v-for="opt in equipTypeListForChild" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-row gap-2 items-center px-2 py-1 border-b-2 border-slate-300 border-dotted">
            <label class="label-input" for="model">
              Модель оборудования:
            </label>
            <select name="model" class="py-1 px-2 bg-white w-full border-b-2 border-slate-400"
              v-model="equipChild.equipModelId">
              <option value="-1">Модель не определёна</option>
              <option v-for="opt in equipModelListForChild" :key="opt.id" :value="opt.id">
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <div class="input-field-wraper">
              <label class="label-input" for="shortName">
                Краткое наименование:
              </label>
              <input class="input-field" type="text" name="shortName"
                v-model="equipChild.shortName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="fullName">
                Полное наименование:
              </label>
              <input class="input-field" type="text" name="fullName"
                v-model="equipChild.fullName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="serialNumber">
                Серийный номер:
              </label>
              <input class="input-field" type="text" name="serialNumber"
                v-model="equipChild.serialNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="inventoryNumber">
                Инвентарный номер:
              </label>
              <input class="input-field" type="text" name="inventoryNumber"
                v-model="equipChild.inventoryNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="manufacturer">
                Изготовитель:
              </label>
              <input class="input-field" type="text" name="manufacturer"
                v-model="equipChild.manufacturer" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="dateOfManufacture">
                Дата производства:
              </label>
              <input class="input-field" type="date" name="dateOfManufacture"
                v-model="equipChild.dateOfManufacture" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="ipV4">
                ip-адрес:
              </label>
              <input class="input-field" type="text" name="ipV4"
                v-model="equipChild.ipV4" />
              <!-- <button style="min-width: 80px;" class="whitespace-nowrap px-2 py-0.5 border rounded hover:bg-slate-200">Ping</button> -->
            </div>
          </div>
        </form>
      </template>
    </card-entity>
    <router-view />
  </overlay-z>
</template>

<script setup lang="ts">

import { useEquipStore } from '@/stores/EquipStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const { equipChild, cardFuncChild, equipTypeListForChild, equipModelListForChild } = storeToRefs(useEquipStore());
const { editChildForm } = useEquipStore();

// const details = computed<string>(()=>`/equips/${entity.value.id}/details`);

editChildForm();

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