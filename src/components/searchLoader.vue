<template>
  <div class="h-screen w-screen grid pt-20 justify-items-center lg:w-full lg:h-full">
    <span class="search-loader" />
  </div>
</template>
<style>
.search-loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  border: 3px solid orange;
  border-radius: 50%;
  animation: search-loader 2s linear infinite;
}
.search-loader::after {
  content: "";
  width: 6px;
  height: 24px;
  background: orangered;
  transform: rotate(-45deg);
  position: absolute;
  bottom: -20px;
  left: 46px;
}
@keyframes search-loader {
  0% {
    transform: translate(-10px, -10px);
  }
  25% {
    transform: translate(-10px, 10px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  75% {
    transform: translate(10px, -10px);
  }
  100% {
    transform: translate(-10px, -10px);
  }
}
</style>
