<template>
  <div class="entity">
    <div class="entity-row">
      <span style="min-width: 80px;">Фамилия:</span>
      <input-field v-model="user.lastName" v-focus placeHolder="lastName" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span style="min-width: 80px;">Имя:</span>
      <input-field v-model="user.firstName" placeHolder="firstName" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span style="min-width: 80px;">Отчетсов:</span>
      <input-field v-model="user.middleName" placeHolder="middleName" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span style="min-width: 80px;">Username:</span>
      <input-field v-model="user.username" placeHolder="username" :disabled="!editable || update" />
    </div>
    <div v-if="!update" class="entity-row">
      <span style="min-width: 80px;">Password:</span>
      <input-field type="password" v-model="user.password" placeHolder="password" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span style="min-width: 80px;">Email:</span>
      <input-field v-model="user.email" placeHolder="email" :disabled="!editable" />
    </div>
  </div>
</template>
<script lang="ts">
import { User } from '@/model/User';
import { computed } from 'vue';
import type { PropType } from 'vue';
export default {
  name: 'UserEntity',
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: () => false
    },
    modelValue: {
      type: Object as PropType<User>,
      required: false,
      default: () => new User()
    },
    update: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  setup(props) {
    const user = computed(() => props.modelValue);
    return {
      user
    }
  }
}
</script>