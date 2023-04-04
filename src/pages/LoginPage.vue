<template>
  <card-auth header="Authentication" class="text-primary-900">
    <template #body>
      <div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center gap-1 py-1 border-b-2 border-secondary-300 border-dotted">
            <label>Login:</label>
            <input-field v-model="loginPassword.username" v-focus />
          </div>
          <div class="flex flex-row items-center gap-1 py-1 border-b-2 border-secondary-300 border-dotted">
            <label>Password:</label>
            <input-field type="password" v-model="loginPassword.password" @enter="loginIn" />
          </div>
        </div>
        <div class="flex justify-between border-t mt-2 pt-1">
          <button-z title="Log In" @clickb="loginIn" />
        </div>
        <div class="py-1" v-if="isLoaded">Loading</div>
        <div class="py-1" v-if="isAuthError">
          <span class="text-orange-700">{{ errorMessage }}</span>
        </div>
      </div>
    </template>>
  </card-auth>
</template>

<script setup lang="ts">
import { LoginPassword } from '@/model/User';
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

const { isLoaded, isAuthError, errorMessage } = storeToRefs(authStore);

const { login } = authStore;

const loginPassword: LoginPassword = reactive(new LoginPassword("", ""));

const loginIn = () => {
  login(loginPassword);
}

</script>

<style lang="scss">
label {
  min-width: 80px;
}
</style>