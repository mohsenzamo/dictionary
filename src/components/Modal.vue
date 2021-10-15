
<script lang="ts" setup>

</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70"
      @click="$emit('close')"
    />
    <div class="w-2/4 bg-gray-300 rounded-xl shadow-2xl relative">
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
          <button
            class="absolute top-0 left-1"
            @click="$emit('close')"
          >
            <fa icon="times" />
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
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
