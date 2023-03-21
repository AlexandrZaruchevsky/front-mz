<template>
  <div class="relative flex h-full">
    <card-default header="Organizations" class="w-full">
      <template v-slot:body>
        <div class=" mb-2 flex gap-2">
          <button-link 
            class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white" 
            to="/admin/organizations/add"
            title="add"
          />
        </div>
        <div class="flex flex-col">
          <div></div>
          <div 
            v-for="org in orgs" 
            class="flex flex-row items-center border-b hover:cursor-pointer bg-teal-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoOrg(org.id)"
          >
            <div class="px-4 py-1">{{ org.id }}</div>
            <div class="px-4 py-1 whitespace-nowrap">{{ org.shortName }}</div>
            <div class="px-4 py-1 w-full">{{ org.fullName }}</div>
            <div class="px-4 py-1">{{ org.inn }}</div>
            <div class="px-4 py-1">{{ org.kpp }}</div>
          </div>
        </div>
      </template>
    </card-default>
    <router-view />
  </div>
</template>

<script setup lang="ts">

import router from '@/router';
import { useOrganizationStore } from '@/stores/OrganizationStore';
import { storeToRefs } from 'pinia';

const { orgs } = storeToRefs(useOrganizationStore());

const { fetchOrganizations } = useOrganizationStore();

fetchOrganizations();

const gotoOrg = (id:Number)=>{
  router.push({path:`/admin/organizations/${id}`})
}

</script>