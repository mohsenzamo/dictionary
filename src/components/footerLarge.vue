<template>
  <div
    class="font-Yekan w-full h-14 grid grid-cols-3 justify-items-center items-center border-t-4 border-yellow-500 text-gray-300"
    style="background: rgb(17, 117, 139);"
  >
    <div class="flex items-center">
      <p class="mx-4">
        تمامی حقوق برای گروه آموزشی محفوظ است
      </p><fa icon="copyright" />
    </div>
    <div class="flex">
      <div class="mx-4">
        <fa :icon="['fab','instagram']" />
      </div>
      <div class="mx-4">
        <fa :icon="['fab','telegram']" />
      </div>
      <div class="mx-4">
        <fa :icon="['fab','twitter']" />
      </div>
    </div>
    <div><p>طراحی و اجرا:<span class="text-semibold text-yellow-500 mx-2 font-mono">Armin_BM & Mohsen_Zamo</span></p></div>
  </div>
</template>
