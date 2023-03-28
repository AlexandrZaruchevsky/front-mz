<template>
  <overlay-z>
    <card-default header="Organization page" class="w-1/2 border">
      <template v-slot:body>
        <form @submit.prevent="saveOrganization">
          <div class="flex flex-col gap-2">
            <input-with-label label="Наименование (Краткое):" :inP="org.shortName" v-model="org.shortName" />
            <input-with-label label="Наименование (Полное):" :inP="org.fullName" v-model="org.fullName" />
            <input-with-label label="ИНН:" :inP="org.inn" v-model="org.inn" />
            <input-with-label label="КПП:" :inP="org.kpp" v-model="org.kpp" />
          </div>
          <div class="buttons mt-4 flex justify-between">
            <button-z title="Save" />
            <button-link to="/admin/organizations" title="Cancel" />
          </div>
        </form>
      </template>
    </card-default>
  </overlay-z>
</template>

<script setup lang="ts">
import { useOrganizationStore } from '@/stores/old/OrganizationStore'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();

const { org } = storeToRefs(useOrganizationStore());
const { fetchOrganization, setAdd, saveOrganization } = useOrganizationStore()

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
  fetchOrganization(parseInt(paramId));
}

</script>