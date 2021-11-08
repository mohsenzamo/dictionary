<script lang="ts" setup>
import { computed } from 'vue-demi'
import { useCategoriesDB } from '../datasource/database/categoriesDB'
import { useCreateRepo } from '../datasource/repository/repo'
useCategoriesDB().categoriesGet().then(r => {
  useCreateRepo().categroyTable = r
})
const categoryList = computed(() => useCreateRepo().categroyTable)
const loading = computed(() => !categoryList.value || categoryList.value.length === 0)

</script>
<template>
  <div v-if="loading">
    loading
  </div>
  <div v-else>
    <header class="w-screen h-28 bg-gray-300 header ">
      <div class="grid items-center justify-items-center font-IRANSans">
        <img
          src="../assets/logo.png"
          class="w-24 h-24 absolute left-10 -top-3"
          alt=""
        >
        <P class="font-semibold text-2xl typing-demo">
          دیکشنری عربی نبراس
        </P><p class="text-lg typing-demo__accent">
          لحجه <span class="text-yellow-500">عراقی</span> و <span class="text-yellow-500">خلیجی</span>
        </p>
        <div class="burst-8  absolute right-10 top-5">
        
        </div>
      </div>
      <div class="font-IRANSans flex w-screen justify-center mt-4 bg-yellow-500 h-10">
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span flex items-center justify-center"><p class="mx-3">جستجو</p><fa icon="search" /></span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span">صفحه نخست</span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span">حساب کاربری</span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span">خرید نسخه طلایی</span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span">راهنما</span>
        </button>
        <button class="btn-6 mx-4 w-36 nav-btn">
          <span class="nav-span">درباره ما</span>
        </button>
      </div>
    </header>
    <div
      class="body"
      style="--n-rows: 3; --n-cols: 6"
    >
      <div class="hex-cell">
        <div
          class="w-16 h-16"
          v-html="categoryList[0].Icon"
        />
        <p>{{ categoryList[0].Title }}</p>
      </div>
      <div class="hex-cell">
        <div
          class="w-16 h-16"
          v-html="categoryList[1].Icon"
        />
        <p>{{ categoryList[1].Title }}</p>
      </div>
      <div class="hex-cell">
        <div
          v-if="categoryList[2].Icon"
          class="w-16 h-16"
          v-html="categoryList[2].Icon"
        />
        <p>{{ categoryList[2].Title }}</p>
      </div>
      <div
        class="hex-cell"
      >
        <div
          class="w-16 h-16"
        >
          <svg
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 280.028 280.028"
            style="enable-background:new 0 0 280.028 280.028;"
            xml:space="preserve"
          >
            <g>
              <path
                style="fill:#E2574C;"
                d="M52.506,0h175.017c9.661,0,17.502,7.832,17.502,17.502v245.024c0,10.212-7.71,17.502-17.502,17.502
		c-8.191,0-70.269-38.81-78.758-43.754c-8.497-4.944-8.628-5.233-17.502,0c-8.873,5.259-70.409,43.754-78.758,43.754
		c-9.915,0-17.502-7.027-17.502-17.502V17.502C35.004,7.832,42.845,0,52.506,0z"
              />
              <path
                style="fill:#CB4E44;"
                d="M227.523,0h-87.509v232.466c2.258-0.018,4.419,1.278,8.751,3.807
		c8.453,4.927,70.086,43.448,78.618,43.728h0.411c9.661-0.14,17.23-7.359,17.23-17.475V17.502C245.025,7.832,237.184,0,227.523,0z"
              />
              <path
                style="fill:#EFC75E;"
                d="M210.048,105.395l-46.038-3.404l-23.995-49.486l-24.266,49.486l-45.758,3.404l30.628,38.197
		l-8.751,48.9l48.147-22.507l48.147,22.507l-8.908-48.9C179.253,143.593,210.048,105.395,210.048,105.395z"
              />
              <polygon
                style="fill:#D7B354;"
                points="188.162,192.501 179.253,143.602 210.048,105.395 164.009,101.991 140.015,52.505
		140.015,170.003 	"
              />
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </svg>
          <p>نشان شده ها</p>
        </div>
      </div>
      <div class="hex-cell">
        <div

          class="w-16 h-16"
          v-html="categoryList[3].Icon"
        />
        <p>{{ categoryList[3].Title }}</p>
      </div>
      <div class="hex-cell">
        <div
          class="w-16 h-16"
          v-html="categoryList[4].Icon"
        />
        <p>{{ categoryList[4].Title }}</p>
      </div>
      <div class="hex-cell">
        <div
          class="w-16 h-16"
          v-html="categoryList[5].Icon"
        />
        <p>{{ categoryList[5].Title }}</p>
      </div>
    </div>
    <div class="talkbubble-left fixed bottom-10 left-10 hover:left-20 transition-all grid items-center justify-items-center font-IRANSans w-28 h-28 bg-yellow-500 ">
      <p class="">
        آزمون مرحله ای
      </p>
    </div>
    <div class="talkbubble-right fixed bottom-10 right-10 hover:right-20 transition-all grid items-center justify-items-center font-IRANSans w-28 h-28 bg-yellow-500">
      <p class="">
        تمرین لغات
      </p>
    </div>
  </div>
</template>
<style>
.burst-8 {
      background: red;
      width: 65px;
      height: 60px;
      text-align: center;
      transform: rotate(20deg);
    }
    .burst-8:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 60px;
      width: 65px;
      background: red;
      transform: rotate(135deg);
    }
.typing-demo {
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  width: 210px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}
.typing-demo__accent {
  animation: typing 4s steps(30), blink .5s step-end infinite alternate;
  width: 210px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes typing {
  from {
    width: 0
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}

.nav-btn{
  display: inline-block;
  position: relative;
  border: none;
  padding-left: 5px;
  padding-right: 5px;
}
.nav-btn::before, .nav-btn::after{
  content:"";
  width: 0;
  height: 2px;
  position: absolute;
  transition: all 0.1s linear;
  background: rgb(17,117,139);
}

.nav-span::before, .nav-span::after{
  content:"";
  width:2px;
  height:0;
  position: absolute;
  transition: all 0.1s linear;
  background: rgb(17,117,139);
}
.nav-btn:hover::before, .nav-btn:hover::after{
  width: 100%;
}
.nav-btn:hover .nav-span::before, .nav-btn:hover .nav-span::after{
  height: 100%;
}
.btn-6::before{
  left: 50%;
  top: 0;
  transition-duration: 0.4s;
}
.btn-6::after{
  left: 50%;
  bottom: 0;
  transition-duration: 0.4s;
}
.btn-6 .nav-span::before{
  left: 0;
  top: 50%;
  transition-duration: 0.4s;
}
.btn-6 .nav-span::after{
  right: 0;
  top: 50%;
  transition-duration: 0.4s;
}
.btn-6:hover::before, .btn-6:hover::after{
  left: 0;
}
.btn-6:hover .nav-span::before, .btn-6:hover .nav-span::after{
  top: 0;
}
.hex-cell:nth-of-type(5n + 1) { grid-column-start: 2 }
.body {
  --l: calc(100vw/var(--n-cols));
  --hl: calc(.5*var(--l));
  --ri: calc(.5*1.73205*var(--l));
  box-sizing: border-box;
  display: grid;
  place-content: center;
  grid-template: repeat(var(--n-rows), var(--l))/repeat(var(--n-cols), var(--ri));
  grid-gap: var(--hl) 0;
  overflow: hidden;
  margin: 0;
  padding: var(--hl) 0;
  height: 100vh;
  filter: drop-shadow(2px 2px 5px rgb(17,117,139));

}
@media (orientation: landscape) {
  .body {
    --l: calc(100vh/(var(--n-rows) + 3));
  }
}

.hex-cell {
  overflow: hidden;
  grid-column-end: span 2;
  margin: calc(-1*var(--hl)) 0;
  transform: scale(0.95);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: IRANsans;
  background-color: rgb(17,117,139);

}
.hex-cell:hover{
    transform: scale(1.007);
}

img {
  --hl: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(calc(1 + .2*var(--hl)));
  filter: brightness(calc(.6*(1 + var(--hl))));
  transition: .7s;
}
img:hover {
  --hl: 1;
}
 .talkbubble-left {
      width: 120px;
      height: 80px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    .talkbubble-left:before {
      content: "";
      position: absolute;
      right: 100%;
      top: 26px;
      border-top: 13px solid transparent;
      border-right: 26px solid rgb(245,158,11);
      border-bottom: 13px solid transparent;
    }
 .talkbubble-right {
      width: 120px;
      height: 80px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    .talkbubble-right:before{
      content: "";
      position: absolute;
      left: 100%;
      top: 26px;
      border-top: 13px solid transparent;
      border-left: 26px solid rgb(245,158,11);
      border-bottom: 13px solid transparent;
    }
    .header{
        box-shadow: rgb(245,158,11, 0.4) 0px 5px, rgba(245,158,11, 0.3) 0px 10px, rgba(245,158,11, 0.2) 0px 15px, rgba(245,158,11, 0.1) 0px 20px, rgba(245,158,11, 0.05) 0px 30px;
    }

</style>
