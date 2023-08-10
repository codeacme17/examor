<template>
  <section
    class="d-flex justify-center"
    style="padding-top: 100px; padding-right: 200px"
  >
    <div style="width: 200px; height: 200px" class="mr-10">
      <v-img
        v-show="isDark"
        src="/src/assets/images/welcome-dark.svg"
        :lazy-src="'/src/assets/images/welcome-dark.svg'"
      />
      <v-img
        v-show="!isDark"
        src="/src/assets/images/welcome-light.svg"
        :lazy-src="'/src/assets/images/welcome-light.svg'"
      />
    </div>

    <div>
      <h2 class="mb-4">WELCOME</h2>
      <h4 class="mb-2">Hi I'm leyoo,</h4>
      <h4 class="mb-2">hope you enjoy this app</h4>
      <h4>If you like this app, I hope you can give me a ⭐</h4>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
localStorage.setItem('isWelcome', JSON.stringify(true))
const isDark = useDark()
</script>
