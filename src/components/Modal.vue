<template>
  <transition name="modal">
        <div class="z-30 fixed top-0 left-0 w-full h-full bg-gray-900 table transition-opacity duration-300 ease-in-out bg-opacity-70">
          <div class="table-cell align-middle">
            <div class="w-2/4 left-1/4 absolute top-2/4 bg-red-800 transition duration-300 ease-in-out">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    <fa icon="times"/>
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
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



/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>