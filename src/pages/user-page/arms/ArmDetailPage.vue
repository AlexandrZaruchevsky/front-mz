<template>
  <overlay-z class="z-20 pt-10">
    <card-entity :header="headerForm" class="w-full sm:w-3/4 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12" editable
      :cardFunc="cardFuncDetail">
      <template #body>
        <div class="p-2">
          <div class="flex flex-col gap-1">
            <div class="input-field-wraper">
              <label class="label-input">Equip:</label>
              <input-field v-model="armDetail.equipName" />
              <div style="min-width: 80px;"
                class="text-center whitespace-nowrap px-2 py-0.5 border border-slate-500 rounded hover:bg-slate-200 hover:cursor-pointer"
                @click="isSetEquip = true">
                Equip
              </div>
            </div>
            <div class="input-field-wraper">
              <label class="label-input" >Наименование:</label>
              <input-field v-model="armDetail.name" v-focus />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Network-name:</label>
              <input-field v-model="armDetail.domainName" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">ip-address:</label>
              <input-field v-model="armDetail.ipV4" />
            </div>
            <div class="input-field-wraper">
              <label class="label-input">Description:</label>
              <input-field v-model="armDetail.description" />
            </div>
          </div>
        </div>
      </template>
    </card-entity>
  </overlay-z>
  <overlay-z class="z-20" v-if="isSetEquip">
    <card-choice-v1 :choiceList="choiceEquipList" :searchFunc="fetchEquipList" rowVisible="3" :choiceFunc="choiceEquipFunc"
      class="shadow-xl mt-20" @hide="isSetEquip = false" />
  </overlay-z>
</template>

<script setup lang="ts">

import { useChoiceStore } from '@/stores/ChoiceStore';
import { EntityChoice } from '@/model/Choice';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useArmDetailStore } from '@/stores/ArmDetailStore';

const { armDetail, headerForm, cardFuncDetail } = storeToRefs(useArmDetailStore());
const { editForm } = useArmDetailStore();

editForm();

const { choiceEquipList } = storeToRefs(useChoiceStore())
const { fetchEquipList } = useChoiceStore()

/**Set Equip */

const isSetEquip = ref<boolean>(false);

watch(isSetEquip, async () => {
  if (isSetEquip.value)
    await fetchEquipList();
})

const choiceEquipFunc = (en: EntityChoice = new EntityChoice()) => {
  if (en.key != -1 && typeof en.key == "number") {
    armDetail.value.equipId = en.key;
    armDetail.value.equipName = en.value
    isSetEquip.value = false;
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