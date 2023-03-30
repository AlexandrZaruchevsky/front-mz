<template>
  <div class="w-full h-full flex flex-col justify-between">
    <div class="flex justify-center items-start h-full">
      <div class="bg-slate-200 rounded-lg shadow-lg mt-10">
        <div class="header bg-slate-500 text-slate-100 rounded-t-lg text-xl px-2 py-1">App information</div>
        <div class="body p-2 text-slate-600 flex flex-col gap-2">
          <div class="flex gap-2 border-b-2 px-1 border-slate-300 border-dotted">
            <span style="min-width: 122px;">app-name:</span>
            <strong>{{ appName }}</strong>
          </div>
          <div class="flex gap-2 border-b-2 px-1 border-slate-300 border-dotted">
            <span style="min-width: 122px;">rest-api-base-url:</span>
            <strong>{{ apiUrlBase }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="footer text-slate-100 whitespace-nowrap flex flex-row gap-2">
      <span>&copy; {{ appAuthorName }}</span>
      <span>&#10144;</span>
      <span>&#128231; <a :href="`mailto:${appAurhorEMail}`">{{ appAurhorEMail }}</a></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME;
const appAuthorName = import.meta.env.VITE_APP_AUTHOR_NAME;
const appAurhorEMail = import.meta.env.VITE_APP_AUTHOR_EMAIL;
const apiUrlBase =  import.meta.env.VITE_BASE_URL;
</script>