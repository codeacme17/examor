<template>
  <spline-viewer
    url="https://prod.spline.design/DPERWwhvUp3zeOP8/scene.splinecode"
    style="
      position: absolute;
      width: 100%;
      height: calc(100vh + 30px);
      left: 0;
      top: -30px;
    "
  ></spline-viewer>
</template>

<script setup lang="ts">
localStorage.setItem('isWelcome', JSON.stringify(true))
</script>

<style scoped lang="scss">
:deep(#logo) {
  display: none !important;
}
</style>
