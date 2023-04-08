<template>
  <div class="flex justify-center">
    <card-z header="Upload page" class="h-full w-1/2">
      <template #body>
        <div class="p-2">
          <div>
            <div>Upload users</div>
            <div class="flex flex-row gap-2 items-center">
              <input type="file" class=" p-2 border rounded-lg" ref="fileUsers" @change="selectFileUsers">
              <button-z title="UpLoad" @click="uploadUsers" />
            </div>
          </div>
          <div>
            <div>Upload equips</div>
            <div class="flex flex-row gap-2 items-center">
              <input type="file" class=" p-2 border rounded-lg" ref="fileEquips" @change="selectFileEquips">
              <button-z title="UpLoad" @click="uploadEquips" />
            </div>
          </div>
        </div>
      </template>
    </card-z>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UploadService from "@/services/UploadService"

const fileUsers = ref<HTMLInputElement | undefined>(undefined)
const selectedFile = ref<File | undefined | null>(undefined)
const selectFileUsers = () => {
  selectedFile.value = fileUsers.value?.files?.item(0)
  console.log(selectedFile.value?.name);
}

const uploadUsers = () => {
  if (selectedFile.value) {
    UploadService.uploadUsers(selectedFile.value, (event: { loaded: number; total: number; }) => {
      console.log(Math.round((100 * event.loaded) / event.total));
    })
  }
}

const fileEquips = ref<HTMLInputElement | undefined>(undefined)
const selectFileEquips = () => {
  selectedFile.value = fileEquips.value?.files?.item(0)
  console.log(selectedFile.value?.name);
  
}

const uploadEquips = () => {
  console.log("uploadEquips");
  
  if (selectedFile.value) {
    UploadService.uploadFile("/upload/equips", selectedFile.value, (event: { loaded: number; total: number; }) => {
      console.log(Math.round((100 * event.loaded) / event.total));
    })
  }
}

</script>