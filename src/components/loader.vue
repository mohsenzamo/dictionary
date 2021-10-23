<script lang="ts" setup>

</script>
<template>
  <section class="w-screen h-screen">
    <span class="loader" />
  </section>
</template>

<style>

*:after,
*:before {
  box-sizing: border-box;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  cursor: pointer;
  transition: 0.3s linear;
}
section:nth-child(2n+1) {
  @apply bg-gray-400
}

@media (max-width: 768px) {
  section {
    width: 50%;
  }
}
@media (max-width: 480px) {
  section {
    width: 100%;
  }
}

.loader {
  width: 13px;
  height: 13px;
  box-shadow: 0 30px, 0 -30px;
  border-radius: 4px;
  background: currentColor;
  display: inline-block;
  position: relative;
  color: #fff;
  left: -30px;
          animation: animloader60 2s ease infinite;
}
.loader::after, .loader::before {
  content: "";
  width: 13px;
  height: 13px;
  box-shadow: 0 30px, 0 -30px;
  border-radius: 4px;
  background: currentColor;
  color: #fff;
  position: absolute;
  left: 30px;
  top: 0;
          animation: animloader60 2s 0.2s ease infinite;
}
.loader::before {
          animation-delay: 0.4s;
  left: 60px;
}

@keyframes animloader60 {
  0% {
    top: 0;
    color: white;
  }
  50% {
    top: 30px;
    color: rgba(255, 255, 255, 0.2);
  }
  100% {
    top: 0;
    color: white;
  }
}

</style>
