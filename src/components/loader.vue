<script lang="ts" setup>

</script>
<template>
  <section class="sectionLo w-screen h-screen bg-gray-300">
    <span class="loader" />
  </section>
</template>

<style>

.sectionLo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  cursor: pointer;
  transition: 0.3s linear;
}
.loader {
  width: 13px;
  height: 13px;
  box-shadow: 0 30px, 0 -30px;
  border-radius: 4px;
  background: currentColor;
  display: inline-block;
  position: relative;
  color: rgb(255, 153, 0);
  left: -30px;
          animation: loader 2s ease infinite;
}
.loader::after, .loader::before {
  content: "";
  width: 13px;
  height: 13px;
  box-shadow: 0 30px, 0 -30px;
  border-radius: 4px;
  background: currentColor;
  color: rgb(255, 153, 0);
  position: absolute;
  left: 30px;
  top: 0;
          animation: loader 2s 0.2s ease infinite;
}
.loader::before {
          animation-delay: 0.4s;
  left: 60px;
}

@keyframes loader {
  0% {
    top: 0;
    color: rgb(255, 153, 0);
  }
  50% {
    top: 30px;
    color: rgb(0, 68, 255);
  }
  100% {
    top: 0;
    color: rgb(255, 153, 0);
  }
}
</style>
