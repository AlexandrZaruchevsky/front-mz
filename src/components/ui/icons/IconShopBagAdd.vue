<template>
  <div :class="!disabled ? 'cursor-pointer' : ''" @mouseenter="hover = true" @mouseleave="hover = false">
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path :fill="currentColor"
        d="M22.5,18H21V16.5a1.5,1.5,0,0,0-3,0V18H16.5a1.5,1.5,0,0,0,0,3H18v1.5a1.5,1.5,0,0,0,3,0V21h1.5a1.5,1.5,0,0,0,0-3Z" />
      <path :fill="currentColor"
        d="M20.5,6H18A6,6,0,0,0,6,6H3.5A3.543,3.543,0,0,0,0,9.5v9A5.549,5.549,0,0,0,5.5,24h6a1.5,1.5,0,0,0,0-3h-6A2.476,2.476,0,0,1,3,18.5v-9A.472.472,0,0,1,3.5,9H6v1.5A1.538,1.538,0,0,0,7.5,12,1.538,1.538,0,0,0,9,10.5V9h6v1.5a1.5,1.5,0,0,0,3,0V9h2.5a.472.472,0,0,1,.5.5v2a1.5,1.5,0,0,0,3,0v-2A3.543,3.543,0,0,0,20.5,6ZM9,6H9a3,3,0,0,1,6,0H9Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconShopBagAdd",
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

    const currentColor = computed(() => hover.value ? 'teal' : 'gray')

    return {
      iconSize,
      hover,
      currentColor
    }
  }
}
</script>