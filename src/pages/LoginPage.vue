<template>
  <card-auth header="Authentication">
    <template v-slot:body>
      <div>
        <div class="flex flex-col gap-2">
          <input-with-label :inP="loginPassword.username" v-model="loginPassword.username" type="text" label="Login:" />
          <input-with-label :inP="loginPassword.password" v-model="loginPassword.password" type="password" @enter="loginIn"
            label="Password:" />
        </div>
        <div class="flex justify-between my-4">
          <button-z title="Log In" @clickb="loginIn" />
        </div>
        <div v-if="isLoaded
        ">Loading</div>
        <div v-if="isAuthError">
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

const {isLoaded, isAuthError, errorMessage} = storeToRefs(authStore);

const { login } = authStore;

const loginPassword: LoginPassword = reactive(new LoginPassword("", ""));

const loginIn = () => {
  login(loginPassword);
}

</script>