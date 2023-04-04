<template>
  <overlay-z class="z-20">
    <card-entity :header="headerForm" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12" editable
      :cardFunc="cardFunction">
      <template #body>
        <form @submit.prevent class="p-2">
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
              <label class="label-input" >Краткое наименование:</label>
              <input-field v-model="entity.shortName" v-focus />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Полное наименование:</label>
              <input-field v-model="entity.fullName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Серийный номер:</label>
              <input-field v-model="entity.serialNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Инвентарный номер:</label>
              <input-field v-model="entity.inventoryNumber" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Изготовитель:</label>
              <input-field v-model="entity.manufacturer" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Дата производства:</label>
              <input-field type="date" v-model="entity.dateOfManufacture" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">МОЛ:</label>
              <input-field v-model="entity.molFio" />
              <div style="min-width: 80px;"
                class="whitespace-nowrap px-2 py-0.5 border border-slate-500 rounded hover:bg-slate-200 hover:cursor-pointer"
                @click="isSetMol = true">
                Set MOL
              </div>
            </div>
            <div class="input-field-wraper">
              <label class="label-input">ip-адрес:</label>
              <input-field v-model="entity.ipV4" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input" for="groupAccounting">
                Групповой учёт:
              </label>
              <input class="" type="checkbox" name="groupAccounting" v-model="entity.groupAccounting" />
              <router-link v-if="isDetails" :to="details" class="ml-4 underline">details</router-link>
            </div>
          </div>
        </form>
      </template>
    </card-entity>
    <router-view />
  </overlay-z>
  <overlay-z class="z-20" v-if="isSetMol" @click="isSetMol = false">
    <card-choice-v1 :choiceList="choiceEmplList" :searchFunc="fetchEmployeeList" rowVisible="3" :choiceFunc="choiceFunc"
      class="shadow-xl mt-20" @click.stop />
  </overlay-z>
</template>

<script setup lang="ts">

import { useEquipStore } from '@/stores/EquipStore';
import { useChoiceStore } from '@/stores/ChoiceStore';
import { EntityChoice } from '@/model/Choice';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';


const { entity, isDetails, headerForm, cardFunction, equipTypeListForEntity, equipModelListForEntity } = storeToRefs(useEquipStore());
const { editForm } = useEquipStore();

const details = computed<string>(() => `/equips/${entity.value.id}/details`);

editForm();

const isSetMol = ref<boolean>(false);

const { choiceEmplList } = storeToRefs(useChoiceStore())
const { fetchEmployeeList } = useChoiceStore()

watch(isSetMol, async () => {
  if (isSetMol.value)
    await fetchEmployeeList();
})

const choiceFunc = (en: EntityChoice = new EntityChoice()) => {
  if (en.key != -1) {
    entity.value.employeeMol = en.key as string;
    entity.value.molFio = en.value
    isSetMol.value = false;
  }
}

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