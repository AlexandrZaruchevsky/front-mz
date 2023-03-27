<template>
  <div class="hover:cursor-pointer">
    <div class="md:flex px-2 rounded hover:bg-slate-200  border-b-2 border-dotted hidden">
      <div class="py-1 w-full whitespace-nowrap">{{ org?.shortName }}</div>
      <div class="py-1 w-1/4 text-center whitespace-nowrap">{{ org?.inn }}</div>
      <div class="py-1 w-1/4 text-center whitespace-nowrap">{{ org?.kpp }}</div>
    </div>
    <div class="md:hidden flex flex-col rounded-xl hover:bg-slate-100  border-2 p-4 gap-2 hover:shadow-lg">
      <div class="flex p-1 w-full whitespace-nowrap border-b-2 border-dotted">
        <span class="w-1/4" style="min-width: 122px;">Наименование: </span>
        <strong>{{ org?.shortName }}</strong>
      </div>
      <div class="flex p-1 w-full whitespace-nowrap border-b-2 border-dotted">
        <span class="w-1/4" style="min-width: 122px;">ИНН: </span>
        <strong>{{ org?.inn }}</strong>
      </div>
      <div class="flex p-1 w-full whitespace-nowrap border-b-2 border-dotted">
        <span class="w-1/4" style="min-width: 122px;">КПП: </span>
        <strong>{{ org?.kpp }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Organization } from '@/model/Organization';
import type { PropType } from 'vue';

defineProps({
  org: Object as PropType<Organization>
})

</script>