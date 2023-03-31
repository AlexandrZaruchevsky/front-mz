<template>
  <overlay-z>
    <card-entity 
      header="Organization" 
      editable 
      :cardFunc="cardFunction"
      class="w-full sm:w-11/12 md:w-5/6 lg:w-2/3 xl:w-1/2 h-full"
      slave
    >
      <template #body>
        <div class="flex flex-col gap-2 p-2">
          <div class="flex flex-row gap-2 items-baseline py-1 border-b-2 border-dotted">
            <span class="w-1/4" style="min-width: 188px;">Наименование(краткое):</span>
            <input-default :inP="org.shortName" v-model="org.shortName" />
          </div>
          <div class="flex flex-row gap-2 items-baseline py-1 border-b-2 border-dotted">
            <span class="w-1/4" style="min-width: 188px;">Наименование(полное):</span>
            <input-default :inP="org.fullName" v-model="org.fullName" />
          </div>
          <div class="flex flex-row gap-2 items-baseline py-1 border-b-2 border-dotted">
            <span class="w-1/4" style="min-width: 188px;">ИНН:</span>
            <input-default :inP="org.inn" v-model="org.inn" />
          </div>
          <div class="flex flex-row gap-2 items-baseline py-1 border-b-2 border-dotted">
            <span class="w-1/4" style="min-width: 188px;">КПП:</span>
            <input-default :inP="org.kpp" v-model="org.kpp" />
          </div>
        </div>
      </template>
      <template #body-slave>
        <div class="p-2">
          <org-all-props class="border-2 rounded-lg" :org="org" />
        </div>
      </template>
    </card-entity>
  </overlay-z>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useOrgStore } from '@/stores/OrgStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import OrgAllProps from '@/components/entities/OrgAllProps.vue';

const route = useRoute();

const { org, cardFunction } = storeToRefs(useOrgStore());

const { fetchEntity, setAdd } = useOrgStore()

const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    router.push({ name: "Users" })
  }
}
else {
  setAdd(false);
  fetchEntity(parseInt(paramId));
}

</script>