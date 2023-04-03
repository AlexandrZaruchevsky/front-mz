<template>
  <div class="rounded-full p-1 hover:cursor-pointer hover:shadow-2xl" :class="!hover ? 'bg-opacity-50' : 'bg-opacity-90'"
    @mouseenter="hover = true" @mouseleave="hover = false">
    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" :width="iconSize" :height="iconSize"
      class="">
      <path fill="white"
        d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';

export default {
  name: "IconPlus",
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