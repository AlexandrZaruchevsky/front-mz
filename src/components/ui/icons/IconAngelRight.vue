<template>
  <div :class="!disabled ? 'cursor-pointer' : ''">
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path :fill="disabled ? '#c0c0c0' : '#808080'"
        d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue';

export default {
  name: "IconAngelRight",
  props: {
    size: {
      type: String,
      default: "normal",
      required: false
    },
    color: {
      type: String,
      required: false,
      default: () => 'gray'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
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