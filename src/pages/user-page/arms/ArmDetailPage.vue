<template>
  <overlay-z class="z-20">
    <card-entity :header="headerForm" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12" editable
      :cardFunc="cardFunction">
      <template #body>
        <form @submit.prevent class="p-2">
          <div class="flex flex-col gap-1">
            <div class="input-field-wraper">
              <label class="label-input" >Наименование:</label>
              <input-field v-model="entity.name" v-focus />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Description:</label>
              <input-field v-model="entity.description" />
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
              <label class="label-input">POP:</label>
              <input-field v-model="entity.popName" />
              <div style="min-width: 80px;"
                class="whitespace-nowrap px-2 py-0.5 border border-slate-500 rounded hover:bg-slate-200 hover:cursor-pointer"
                @click="isSetPop = true">
                Set POP
              </div>
            </div>
          </div>
        </form>
      </template>
    </card-entity>
    <router-view />
  </overlay-z>
  <overlay-z class="z-20" v-if="isSetMol">
    <card-choice-v1 :choiceList="choiceEmplList" :searchFunc="fetchEmployeeList" rowVisible="3" :choiceFunc="choiceEmplFunc"
      class="shadow-xl mt-20" @hide="isSetMol = false" />
  </overlay-z>
  <overlay-z class="z-20" v-if="isSetPop" >
    <card-choice-v1 :choiceList="choicePopList" :searchFunc="fetchPOPList" rowVisible="3" :choiceFunc="choicePopFunc"
      class="shadow-xl mt-20" @hide="isSetPop = false"/>
  </overlay-z>
</template>

<script setup lang="ts">

import { useChoiceStore } from '@/stores/ChoiceStore';
import { EntityChoice } from '@/model/Choice';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useArmStore } from '@/stores/ArmStore';


const { entity, headerForm, cardFunction } = storeToRefs(useArmStore());
const { editForm } = useArmStore();

// const details = computed<string>(() => `/equips/${entity.value.id}/details`);

editForm();

const { choiceEmplList, choicePopList } = storeToRefs(useChoiceStore())
const { fetchEmployeeList, fetchPOPList } = useChoiceStore()

/**Set Mol */

const isSetMol = ref<boolean>(false);

watch(isSetMol, async () => {
  if (isSetMol.value)
    await fetchEmployeeList();
})

const choiceEmplFunc = (en: EntityChoice = new EntityChoice()) => {
  if (en.key != -1 && typeof en.key == "string") {
    entity.value.mol = en.key;
    entity.value.molFio = en.value
    isSetMol.value = false;
  }
}

/**End */

/**Set Point of presence */
const isSetPop = ref<boolean>(false);
watch(isSetPop, async () => {
  if (isSetPop.value)
    await fetchPOPList();
})
const choicePopFunc = (en: EntityChoice = new EntityChoice()) => {
  if (en.key != -1 && typeof en.key == "number") {
    entity.value.popId = en.key;
    entity.value.popName = en.value
    isSetPop.value = false;
  }
}
/**End */

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