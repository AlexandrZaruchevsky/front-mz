<template>
  <overlay-z>
    <card-entity :cardFunc="cardFunction" class="w-1/2" editable :header="header">
      <template #body>
        <form @submit.prevent="saveEntity" class="p-2 flex flex-col gap-1">
          <div class="p-2 flex justify-between border-b-2 border-dotted">
            <select class="py-1 px-2 bg-white rounded w-full border-b-2" v-model="entity.orgId">
              <option value="-1"></option>
              <option v-for="org in orgList" :value="org.id" :key="org.id">{{ org.shortName }}</option>
            </select>
          </div>
          <div class="p-2 border-b-2 border-dotted">
            <input-default class="p-2" :inP="entity.name" v-model="entity.name" />
          </div>
        </form>
      </template>
    </card-entity>
    <!-- <card-default :header="header" class="border w-1/2">
      <template v-slot:body>
        <form @submit.prevent="savePosition">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Организация:</span>
                <select 
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="position.orgId"
                >
                  <option value="-1"></option>
                  <option 
                    v-for="org in orgs"
                    :key="org.id"
                    :value="org.id"
                  >
                    {{ org.shortName }}
                  </option>
                </select>
              </div>

            <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Наименование:</span>
                <input-default :inP="position.name" v-model="position.name" />
              </div>
            <div class="buttons flex justify-between mt-4">
              <div class="flex flex-row gap-2">
                <button-z title="Save" />
                <button-z title="Delete" @click.prevent="deletePosition(position.id)"/>
              </div>
              <button-link to="/admin/positions" title="Cancel" />
            </div>
          </div>
        </form>
      </template>
    </card-default> -->
  </overlay-z>
</template>

<script setup lang="ts">
import router from '@/router';
import { usePosStore } from '@/stores/PosStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { cardFunction, entity, orgList, serviceRequest } = storeToRefs(usePosStore());
const { fetchEntity, fetchAllOrgs, saveEntity, setAdd } = usePosStore();

// import router from '@/router';
// import { useRoute } from 'vue-router';
// import { computed } from 'vue';
// import { usePositionStore } from '@/stores/PostionStore';

// const { position, orgs, serviceRequest } = storeToRefs(usePositionStore());
// const { fetchOrgs, setAdd, fetchPosition, savePosition, deletePosition } = usePositionStore();

fetchAllOrgs();


const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Position | Add" : "Position | Update"
})

const route = useRoute();
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
  fetchEntity(parseInt(paramId));
}

// const deletePosition = ()=>{
//   console.log("delete");

// }
</script>
