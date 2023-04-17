<template>
  <div class="row">
    <div class="cell w-1/12">
      {{ user.id }}
    </div>
    <div class="cell w-2/12">
      {{ user.username }}
    </div>
    <div class="cell w-2/12">
      {{ user.lastName }}
    </div>
    <div class="cell w-2/12">
      {{ user.firstName }}
    </div>
    <div class="cell w-2/12">
      {{ user.middleName }}
    </div>
    <div class="cell w-3/12">
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
<style lang="scss">
.row{
  @apply flex flex-row w-full border-b-2 border-dotted border-secondary-300 cursor-pointer;
}
.row:hover{
  @apply bg-primary-800 bg-opacity-20;
}
.cell{
  @apply px-1 py-0.5 overflow-hidden;
}
</style>