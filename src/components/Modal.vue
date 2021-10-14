<template>
        <div class="z-30 fixed top-0 left-0 w-full h-full bg-gray-900 table bg-opacity-70">
          <div class="table-cell align-middle">
            <div class="w-2/4 left-1/4 absolute top-1/3 bg-gray-300 rounded-xl shadow-2xl">
              <div>
                <slot name="header">
                  default header
                </slot>
              </div>
              <div>
                <slot name="body">
                  default body
                </slot>
              </div>
              <div>
                <slot name="footer">
                  default footer
                  <button @click="$emit('close')" class="absolute top-0 left-1">
                    <fa icon="times"/>
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
export default defineComponent({
  name: "Modal",
  setup() {
      const modalValue = ref(true)
    return {modalValue};
  },
});
</script>
<style>
.modal-enter-from {
  transform: scale(0);
  opacity: 0;
}
.modal-enter-to {
  transform: scale(1);
  opacity: 1;
}
.modal-enter-to {
  transition: all .5s ease;
}

.modal-leave-from {
  opacity: 1;
}
.modal-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.modal-leave-active {
  transition: all .5s ease;
}

</style>