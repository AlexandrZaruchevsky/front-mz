<template>
  <div class="cursor-pointer" :class="!hover && animate ? 'opacity-60' : 'opacity-80'" @mouseenter="hover = true"
    @mouseleave="hover = false">
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" :width="iconSize"
      :height="iconSize">
      <path fill="black"
        d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z" />
      <path fill="black"
        d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconLogout",
  props: {
    size: {
      type: String,
      default: "normal",
      required: false
    },
    animate:{
      type:Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const iconSize = computed<string>(() => {
      switch (props.size) {
        case 'xs': return '18';
        case 'sm': return '24';
        case 'md': return '36';
        case 'lg': return '48';
        case 'xl': return '60';
        default: return '48';
      }
    })

    const hover = ref<boolean>(false);

    return {
      iconSize,
      hover
    }

  }
}
</script>