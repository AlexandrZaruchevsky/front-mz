<template>
  <div :class="!disabled ? 'cursor-pointer' : ''" @mouseenter="hover = true" @mouseleave="hover = false">
    <svg viewBox="0 0 24 24" :width="iconSize" :height="iconSize"  fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M13 6C13 5.44771 12.5523 5 12 5C11.4477 5 11 5.44771 11 6V11H6C5.44771 11 5 11.4477 5 12C5 12.5523 5.44771 13 6 13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6Z"
        :fill="currentColor" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconAdd",
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