<template>
  <div class="flex flex-row gap-2 h-full">
    <template v-if="armsInfo && armsInfo?.length > 0">
      <div class="p-1 flex flex-col gap-1">
        <div v-for="arm of armsInfo" :key="arm.id" class="py-0.5 px-2 text-center cursor-pointer hover:underline"
          :class="armId == arm.id ? 'bg-secondary-300 rounded-lg' : ''" @click="changeArm(arm.id)">
          {{ arm.name }}
        </div>
      </div>
      <div class="relative flex flex-col w-full h-full overflow-auto" style="max-height: 276px;">
        <div class="p-2">
          <div v-for="armDetail of armInfo?.armDetails" :key="armDetail.id"
            class="flex flex-row px-2 py-1 border-b-2 border-secondary-500 border-dotted gap-2 cursor-pointer "
            @click="showArmDetail(armDetail)">
            <span class="w-full">{{ armDetail.name }}</span>
          </div>
        </div>
        <ArmDetailInfoView v-if="isShowArmDetail" class="absolute w-full h-full" @close="isShowArmDetail = false"
          :armDetail="currentArmDetail" />
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center w-full">
        <div>No content</div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ArmDetailInfo, type ArmInfo } from '@/model/Info';
import { computed, ref, watch } from 'vue';
import type { PropType } from 'vue';
import ArmDetailInfoView from './ArmDetailInfoView.vue';

const props = defineProps({
  armsInfo: {
    type: Object as PropType<Array<ArmInfo>>,
    required: true
  }
})

const isShowArmDetail = ref<boolean>(false);

const currentArmDetail = ref<ArmDetailInfo>(new ArmDetailInfo());

const showArmDetail = (armDetail: ArmDetailInfo) => {
  currentArmDetail.value = armDetail
  isShowArmDetail.value = true
}

const currentArm = ref(-1);

const armId = ref(-1)

const changeArm = (id: number = -1) => {
  currentArm.value = id
  isShowArmDetail.value = false
}

const armInfo = computed<ArmInfo | undefined>(() => {
  if (currentArm.value >= 0) {
    if (Array.isArray(props.armsInfo) && props.armsInfo?.length > 0) {
      return props.armsInfo?.filter(arm => arm.id == currentArm.value)[0]
    }
  } else {
    if (Array.isArray(props.armsInfo) && props.armsInfo?.length > 0) {
      return props.armsInfo[0]
    }
  }
  return undefined
})

watch(armInfo, () => {
  if (armInfo.value) {
    armId.value = armInfo.value.id
  }
})

</script>