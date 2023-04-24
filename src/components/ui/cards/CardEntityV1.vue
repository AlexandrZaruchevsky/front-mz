<template>
  <!-- <div class="bg-secondary-50 p-4 shadow-sm rounded shadow-secondary-800"> -->
  <div class="bg-secondary-50 p-4 rounded">
    <div>
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
    <div class="tool-buttons mt-6" v-if="!editable">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-row gap-2">
          <button-z-v1 @click="saveEntity" title="Save" class="btn bg-primary-600" />
          <button-z-v1 v-if="cardFunc.id > 0" @click="deleteEntity(cardFunc.id)" title="Delete"
            class="btn bg-danger-500" />
        </div>
        <div class="flex flex-row gap-2">
          <button-z-v1 @click="cancel" title="Cancel" class="btn bg-secondary-600" />
        </div>
      </div>
    </div>
    <!-- <div class="card-tool-buttons">
      <slot name="tool-buttons" />
    </div> -->
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts">
import { CardFunction } from '@/model/Page';

export default {
  name: 'CardEntityV1',
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
    const cancel = () => props.cardFunc.cancel();

    return {
      saveEntity,
      deleteEntity,
      cancel
    }

  }
}
</script>