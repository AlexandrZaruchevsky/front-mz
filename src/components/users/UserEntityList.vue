<template>
  <div class="list-row">
    <div class="list-cell  w-1/12">
      {{ user.id }}
    </div>
    <div class="list-cell  w-2/12">
      {{ user.username }}
    </div>
    <div class="list-cell  w-2/12">
      {{ user.lastName }}
    </div>
    <div class="list-cell  w-2/12">
      {{ user.firstName }}
    </div>
    <div class="list-cell  w-2/12">
      {{ user.middleName }}
    </div>
    <div class="list-cell  w-3/12">
      {{ user.email }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from '@/model/User';
import type { PropType } from 'vue';
defineProps({
  user: {
    type: Object as PropType<User>,
    required: false,
    default: () => new User()
  }
})
</script>
