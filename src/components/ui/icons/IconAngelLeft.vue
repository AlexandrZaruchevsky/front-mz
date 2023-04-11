<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path fill="gray"
        d="M10.957,12.354a.5.5,0,0,1,0-.708l4.586-4.585a1.5,1.5,0,0,0-2.121-2.122L8.836,9.525a3.505,3.505,0,0,0,0,4.95l4.586,4.586a1.5,1.5,0,0,0,2.121-2.122Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue';

export default {
  name: "IconAngelLeft",
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