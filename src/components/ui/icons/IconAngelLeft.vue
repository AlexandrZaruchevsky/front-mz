<template>
  <div :class="!disabled ? 'cursor-pointer' : ''">
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path :fill="disabled ? '#c0c0c0' : '#808080'"
        d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" />
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