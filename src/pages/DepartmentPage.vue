<template>
  <overlay-z>
    <card-default :header="header" class="border w-1/2">
      <template v-slot:body>
        <form @submit.prevent="saveDepartment">
          <div class="flex flex-col gap-2">
            <div class="p-2 flex justify-between">
              <select class="py-1 px-2 bg-white rounded w-full border-b-2" v-model="dep.orgId">
                <option value="-1"></option>
                <option v-for="org in orgList" :value="org.id">{{ org.shortName }}</option>
              </select>
            </div>
            <input-with-label class="p-2" label="Наименование:" :inP="dep.name" v-model="dep.name" />
            <div class="p-2 flex gap-2 py-0.5">
              <label class="w-1/4">Top Level</label>
              <input type="checkbox" v-model="dep.topLevel" />
            </div>
            <div class="p-2 flex justify-between" v-if="!dep.topLevel">
              <select class="py-1 px-2 border-b-2 w-full bg-white rounded" v-model="dep.parentId">
                <option value="-1"></option>
                <option v-for="dep in depList" :value="dep.id">{{ dep.name }}</option>
              </select>
            </div>
          </div>
          <div class="buttons flex justify-between mt-4">
            <button-z-v1 class="bg-blue-700" title="Save" />
            <button-link to="/admin/departments" title="Cancel" />
          </div>
        </form>
      </template>
    </card-default>
  </overlay-z>
</template>

<script setup lang="ts">
import router from '@/router';
import { useDepartmentStore } from '@/stores/DepartmentStore'
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Department | Add" : "Department | Update"
})

const route = useRoute();

const { orgList, dep, depList, serviceRequest } = storeToRefs(useDepartmentStore())
const { fetchAllOrgs, setAdd, fetchDepartment, saveDepartment } = useDepartmentStore();

fetchAllOrgs();

const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    setAdd(false);
    router.push({ name: "Users" })
  }
}
else {
  setAdd(false);
  fetchDepartment(parseInt(paramId));
}

</script>