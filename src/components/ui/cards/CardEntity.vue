<template>
  <div class="card" @click.stop>
    <div class="card-header">
      <div>
        {{ header }}
      </div>
      <div class="text-base hover:underline hover:cursor-pointer" @click="$router.go(-1)">
        <x-icon class="" />
      </div>
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
    <div class="card-body" v-if="slave">
      <slot name="body-slave" />
    </div>
    <div class="tool-buttons border-t" v-if="editable">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-row gap-2">
          <button-z-v1 @click="saveEntity" title="Save" class="btn bg-teal-600" />
          <button-z-v1 v-if="cardFunc.id > 0" @click="deleteEntity(cardFunc.id)" title="Delete" class="btn bg-red-500" />
        </div>
        <div class="flex flex-row gap-2">
          <button-z-v1 @click="$router.go(-1)" title="Cancel" class="btn bg-slate-600" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { CardFunction } from "@/model/Page";
export default {
  name: "CardEntity",
  props: {
    cardFunc: {
      type: CardFunction,
      required: false,
      default: new CardFunction()
    },
    header: {
      type: String,
      required: false,
      default: "Header"
    },
    editable: {
      type: [Boolean, String],
      default: false
    },
    slave: {
      type: [Boolean, String],
      default: false
    },
  },
  setup(props) {

    const saveEntity = () => props.cardFunc.saveEntity();
    const deleteEntity = (id: number = -1) => props.cardFunc.deleteEntity(id);
    // const cancel = () => props.cardFunc.cancel();

    return {
      saveEntity,
      deleteEntity,
      // cancel
    }

  }
}
</script>
  
<style scoped lang="scss">
.btn {
  min-width: 80px;
}

.card {
  @apply bg-white rounded-lg shadow-xl flex flex-col text-slate-800;

  .card-header {
    @apply flex flex-row items-center justify-between p-2 border-b text-xl font-semibold bg-gray-600 rounded-t-lg bg-opacity-80 text-slate-100;
  }

  .card-body {
    @apply h-full overflow-auto;
  }

  .tool-buttons {
    @apply flex items-end px-2 py-1 gap-2 shadow-lg;
  }

  .tool-buttons {
    @apply flex items-center justify-between p-2;
  }

  .card-footer {
    @apply p-2 border-t text-sm;
  }
}
</style>
    