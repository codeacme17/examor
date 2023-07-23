<template>
  <section
    class="d-flex flex-column align-center py-10 mt-10"
    style="user-select: none"
  >
    <div style="width: 200px; height: 200px">
      <v-img
        v-show="isDark"
        src="/src/assets/images/empty-dark.svg"
        :lazy-src="'/src/assets/images/empty-dark.svg'"
      />
      <v-img
        v-show="!isDark"
        src="/src/assets/images/empty-light.svg"
        :lazy-src="'/src/assets/images/empty-light.svg'"
      />
    </div>

    <div class="mt-8 text-disabled text-center">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
