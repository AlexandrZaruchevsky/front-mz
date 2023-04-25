<template>
  <overlay-z-v1>
    <template v-if="isLoading">
      <div class="flex flex-row items-center justify-center h-full" style="max-width: 600px; height: 200px;">
        <icon-spiner-refresh />
      </div>
    </template>
    <template v-else>
    <card-entity-v1 class="card-shadow" style="min-width: 600px; max-width: 600px;" :cardFunc="cardFunction">
      <template #body>
        <div>
          <ArmEntityV1 v-model="arm" :editable="true" @change-mol="isSetMol = true" @change-pop="isSetPop = true" />
        </div>
        <div class="mt-4">
          <div class="flex gap-2 items-center">
            <header v-if="!isArmDetails" class="text-center font-bold">
              Details ->
            </header>
            <div class="flex my-1">
              <IconAdd size="md" class="shadow hover:shadow-secondary-600 rounded hover:shadow" @click="$router.push({path:`/v1/arms/${arm.id}/details/add`})" />
            </div>
          </div>
          <div v-if="isArmDetails" class="shadow-inner shadow-secondary-500 overflow-auto"
            style="min-height: 120px; max-height: 120px;">
            <ArmDetailListV1 @armDetailEdit="armDetailEdit" :armDetails="arm.armDetails" />
          </div>
        </div>
      </template>
    </card-entity-v1>
    </template>
  </overlay-z-v1>
  <overlay-z-v1 class="z-20" v-if="isSetMol">
    <card-choice-v1 :choiceList="choiceEmplList" :searchFunc="fetchEmployeeList" rowVisible="3"
      :choiceFunc="choiceEmplFunc" class="shadow-xl mt-20" @hide="isSetMol = false" />
  </overlay-z-v1>
  <overlay-z-v-1 class="z-20" v-if="isSetPop">
    <card-choice-v1 :choiceList="choicePopList" :searchFunc="fetchPOPList" rowVisible="3" :choiceFunc="choicePopFunc"
      class="shadow-xl mt-20" @hide="isSetPop = false" />
  </overlay-z-v-1>
  <RouterView />
</template>
<script setup lang="ts">
import { useChoiceStore } from '@/stores/ChoiceStore';
import ArmEntityV1 from './ArmEntityV1.vue';
import ArmDetailListV1 from './ArmDetailListV1.vue';

import { useArmStoreV1 } from '@/stores/v1/ArmStoreV1';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { EntityChoice } from '@/model/Choice';
import type { Arm } from '@/model/Arm';
import router from '@/router';

const { arm, cardFunction } = storeToRefs(useArmStoreV1())
const { initForm } = useArmStoreV1();

const isLoading=ref<boolean>(true)

onMounted(async () => {
  await initForm().then(()=>{
    isLoading.value=false
  });
})

// onUpdated(async () => {
//   await initForm();
// })

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
    console.log(en);
    arm.value.mol = en.key;
    arm.value.molFio = en.value
    console.log(arm.value);
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
    arm.value.popId = en.key;
    arm.value.popName = en.value
    isSetPop.value = false;
  }
}
/**End */


const isArmDetails = computed(() => arm.value.armDetails.length > 0)

const armDetailEdit = (id: number = -1) => {
  if (id > 0) {
    router.push({ path: `/v1/arms/${arm.value.id}/details/${id}` })
  }
}

</script>