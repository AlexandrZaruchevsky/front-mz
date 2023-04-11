<template>
  <div class="dashboard">
    <div class="dashboard-header">
      Dashboard Admin
    </div>
    <div class="dashboard-body bg-secondary-200">
      <div class="relative w-full h-full flex flex-row items-baseline flex-wrap gap-4 justify-center overflow-auto">
        <transition name="fade">
          <DashboardEmployees v-if="!isShowEmplByDep" @choiceDep="choiceDep" />
        </transition>
        <transition name="fade">
          <EmployeesByDep 
          v-if="isShowEmplByDep" 
          @close="isShowEmplByDep = false" 
          :depId="depId" 
          class="w-full h-full absolute"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import DashboardEmployees from '@/components/dashboard/DashboardEmployees.vue';
import EmployeesByDep from '@/components/dashboard/EmployeesByDep.vue';
import { ref } from 'vue';

const isShowEmplByDep = ref<boolean>(false);

const depId = ref<number>(-1);

const choiceDep = (id: number) => {
  depId.value = id;
  isShowEmplByDep.value = true;
}

</script>
<style lang="scss" scoped>
.dashboard {
  @apply h-full;
}

.dashboard-header {
  @apply p-2 text-2xl font-bold border-b-2 border-primary-600;
}

.dashboard-body {
  height: calc(100vh - 132px);
  @apply p-2;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>