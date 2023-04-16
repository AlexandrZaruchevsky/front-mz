<template>
  <div class="relative flex items-center justify-end" style="min-height: 50px; min-width: 150px;">
    <template v-if="isAuth">
      <div class="" @mouseenter="hover = true" @mouseleave="hover = false">
        <div class="absolute w-full h-full gap-2 flex items-center left-0 top-0 justify-end">
          <div class="w-full h-full flex items-start justify-end pt-1">
            <div v-if="!hover" class="cursor-pointer gap-2 flex items-center py-2 px-4">
              <div class="whitespace-nowrap">
                {{ shortFIO }}
              </div>
            </div>
          </div>
        </div>
        <div class="absolute w-full h-full flex items-center left-0 top-0  justify-end">
          <div class="w-full h-full flex items-start justify-end pt-1">
            <div v-if="hover" class="flex flex-col items-start bg-white rounded-lg shadow shadow-secondary-500">
              <div class="flex gap-2 items-center py-2 px-4 border-b">
                <div class="whitespace-nowrap">
                  {{ shortFIO }}
                </div>
              </div>
              <div class="w-full">
                <div v-if="isAdmin" class="p-2 flex flex-col gap-1">
                  <div v-if="isAdmin" class="px-2 py-1 flex items-center cursor-pointer gap-4 hover:bg-opacity-70 rounded hover:bg-secondary-200">
                    <IconSetting size="xs"/>
                    <div>Setting</div>
                  </div>
                </div>
                <div class="p-2 border-t border-secondary-400">
                  <div class="px-2 py-1 flex items-center cursor-pointer gap-4 hover:bg-opacity-70 rounded hover:bg-secondary-200" @click="logout">
                    <IconLogout size="xs" />
                    <div>Logout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center right-0">
        <LoginButton title="Log in" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: "ProfileAppbarV1",
  setup() {

    const { isAuth, shortFIO, isAdmin } = storeToRefs(useAuthStore());
    const { logout } = useAuthStore();

    const hover = ref<boolean>(false);

    return {
      shortFIO,
      isAuth,
      isAdmin,
      logout,
      hover
    }

  }
}
</script>