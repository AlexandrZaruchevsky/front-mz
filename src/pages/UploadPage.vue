<template>
  <div class="flex justify-center">
    <card-z header="Upload page" class="h-full w-1/2">
      <template #body>
        <div class="p-2">
          <div class="flex flex-row gap-2 items-center">
            <input type="file" class=" p-2 border rounded-lg" ref="file" @change="selectFile">
            <button-z title="UpLoad" @click="uploadFile" />
          </div>
        </div>
      </template>
    </card-z>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UploadService from "@/services/UploadService"

const file = ref<HTMLInputElement | undefined>(undefined)
const selectedFile = ref<File | undefined | null>(undefined)
const selectFile = () => {
  selectedFile.value = file.value?.files?.item(0)
  console.log(selectedFile.value);
  
}

const uploadFile = () => {
  if (selectedFile.value) {
    UploadService.upload(selectedFile.value, (event: { loaded: number; total: number; }) => {
      console.log(Math.round((100 * event.loaded) / event.total));
    })
  }
}

</script>