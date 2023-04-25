<template>
  <overlay-z-v1>
    <template v-if="isLoading">
      <div class="flex flex-row items-center justify-center h-full" style="max-width: 500px; max-height: 300px;">
        <icon-spiner-refresh />
      </div>
    </template>
    <template v-else>
      <card-entity-v1 class="card-shadow mt-4" style="min-width: 500px; max-width: 500px;" :cardFunc="cardFunctionDetail">
        <template #body>
          <div>
            <ArmDetailEntityV1 v-model="armDetail" :editable="true" @change-equip="isSetEquip = true" />
          </div>
        </template>
      </card-entity-v1>
    </template>
  </overlay-z-v1>
  <overlay-z-v1 class="z-20" v-if="isSetEquip">
    <!-- <card-choice-v1 :choiceList="choiceEquipList" :searchFunc="fetchEquipList" rowVisible="3"
      :choiceFunc="choiceEquipFunc" class="shadow-xl mt-20" @hide="isSetEquip = false" /> -->
    <card-choice-v2 
      :choiceList="choiceEquipList" 
      :searchFunc="fetchEquipListWithSort" 
      rowVisible="3"
      :choiceFunc="choiceEquipFunc" 
      class="shadow-xl mt-20" 
      @hide="isSetEquip = false" 
      :sortList="options"
    />
  </overlay-z-v1>
</template>
<script setup lang="ts">
import ArmDetailEntityV1 from './ArmDetailEntityV1.vue';

import { useChoiceStore } from '@/stores/ChoiceStore';

import { useArmStoreV1 } from '@/stores/v1/ArmStoreV1';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { EntityChoice } from '@/model/Choice';
import type { Arm } from '@/model/Arm';
import { SelectOption } from '@/model/Page';

const { armDetail, cardFunctionDetail } = storeToRefs(useArmStoreV1())
const { initFormArmDetail } = useArmStoreV1()

// onMounted(async () => {
//   await initFormArmDetail();
// })

const isLoading = ref<boolean>(true);

initFormArmDetail().then(() => {
  isLoading.value = false
});

const options=ref<Array<SelectOption>>([
  new SelectOption("name", "NAME"),
  new SelectOption("inventoryNumber", "Inventory Number"),
])

// onUpdated(async () => {
//   await initForm();
// })

/**Set Equip */
const { choiceEquipList } = storeToRefs(useChoiceStore())
const { fetchEquipList, fetchEquipListWithSort } = useChoiceStore()

const isSetEquip = ref<boolean>(false);

watch(isSetEquip, async () => {
  if (isSetEquip.value)
    await fetchEquipListWithSort();
})

const choiceEquipFunc = (en: EntityChoice = new EntityChoice()) => {
  if (en.key != -1 && typeof en.key == "number") {
    armDetail.value.equipId = en.key;
    armDetail.value.equipName = en.value
    armDetail.value.name = en.value
    console.log(armDetail.value);

    isSetEquip.value = false;
  }
}

/**End */


</script>