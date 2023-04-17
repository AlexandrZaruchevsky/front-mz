<template>
  <div :class="!disabled ? 'cursor-pointer' : ''" @mouseenter="hover = true" @mouseleave="hover = false">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <g id="_01_align_center" data-name="01 align center">
        <path :fill="currentColor"
          d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
        <rect :fill="currentColor" x="9" y="10" width="2" height="8" />
        <rect :fill="currentColor" x="13" y="10" width="2" height="8" />
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconTrash",
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

    const hover = ref(false)

    const currentColor = computed(() => hover.value ? 'red' : 'gray')

    return {
      iconSize,
      hover,
      currentColor
    }
  }
}
</script>