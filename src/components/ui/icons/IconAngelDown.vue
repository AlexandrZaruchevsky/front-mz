<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path fill="gray"
        d="M19.061,7.854a1.5,1.5,0,0,0-2.122,0l-4.586,4.585a.5.5,0,0,1-.707,0L7.061,7.854A1.5,1.5,0,0,0,4.939,9.975l4.586,4.586a3.5,3.5,0,0,0,4.95,0l4.586-4.586A1.5,1.5,0,0,0,19.061,7.854Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue';

export default {
  name: "IconAngelDown",
  props: {
    size: {
      type: String,
      default: "normal",
      required: false
    }
  },
  setup(props) {
    const iconSize = computed<string>(() => {
      switch (props.size) {
        case 'sm': return '24';
        case 'md': return '36';
        case 'lg': return '48';
        case 'xl': return '60';
        default: return '48';
      }
    })

    return {
      iconSize
    }
  }
}
</script>