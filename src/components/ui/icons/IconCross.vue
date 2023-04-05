<template>
  <div class="hover:cursor-pointer" :class="!hover ? 'opacity-30' : 'opacity-60'" @mouseenter="hover = true"
    @mouseleave="hover = false">
    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" :width="iconSize" :height="iconSize">
      <path fill="black"
        d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconCross",
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

    const hover = ref<boolean>(false);

    // const colorBG = 

    return {
      iconSize,
      hover
    }
  }
}
</script>