<template>
  <div>
    <div class="flex flex-row p-1 bg-slate-100">
      <div v-for="item in menu" :key="item.name" class="hover:cursor-pointer"
        :class="item.visible ? 'border-r border-b-2 border-b-neutral-400 px-2 font-semibold text-slate-800' : 'border-r px-2 font-semibold text-slate-500'"
        @click="itemClick(item.name)">
        {{ item.title }}
      </div>
    </div>
    <div style="min-height: 200px; max-height: 200px;" class=" flex flex-col ">
      
      <div v-if="getItem('boss')?.visible" class="flex flex-row gap-2 p-2">
        <span>
          Руководитель:
        </span>
        <strong>
          {{ org?.boss?.lastName }} {{ org?.boss?.firstName }} {{ org?.boss?.middleName }}
        </strong>
      </div>
      
      <div v-if="getItem('deps')?.visible" class="p-2 h-full overflow-y-auto flex flex-col gap-1">
        <div v-for="dep in org?.departments" class="border-b-2 py-1 border-dotted">
          {{ dep.name }}
        </div>
      </div>

      <div v-if="getItem('pops')?.visible" class="p-2 h-full overflow-y-auto flex flex-col gap-1">
        <div v-for="pop in org?.pofs" class="border-b-2 py-1 border-dotted">
          {{ pop.shortName }}
        </div>
      </div>

      <div v-if="getItem('poss')?.visible" class="p-2 h-full overflow-y-auto flex flex-col gap-1">
        <div v-for="pos in org?.positions" class="border-b-2 py-1 border-dotted">
          {{ pos.name }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Organization } from '@/model/Organization';
import { ref, type PropType } from 'vue';

interface IMenu {
  name: string,
  title: string,
  visible: boolean
}

const menu = ref<Array<IMenu>>([
  {
    name: "boss",
    title: "Руководитель",
    visible: true
  },
  {
    name: "deps",
    title: "Подразделения",
    visible: false
  },
  {
    name: "pops",
    title: "Точки присутствия",
    visible: false
  },
  {
    name: "poss",
    title: "Должности",
    visible: false
  },
]);

const getItem = (name:string)=>{
  return menu.value.filter(item => item.name == name)[0]
}

const itemClick = (name: string) => {
  menu.value.forEach(item => item.visible = false);
  menu.value.filter(item => item.name == name)[0].visible = true

}

defineProps({
  org: Object as PropType<Organization>
})

</script>