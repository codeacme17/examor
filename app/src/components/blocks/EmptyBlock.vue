<template>
  <section
    class="d-flex flex-column align-center py-10 mt-10"
    style="user-select: none"
  >
    <!-- Empty image to `/note` page -->
    <div v-show="props.type === 'note'" style="width: 200px; height: 200px">
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

    <!-- Empty image to `/random` page -->
    <div v-show="props.type === 'question'" style="width: 200px; height: 200px">
      <v-img
        v-show="isDark"
        src="/src/assets/images/empty-question-dark.svg"
        :lazy-src="'/src/assets/images/empty-question-dark.svg'"
      />
      <v-img
        v-show="!isDark"
        src="/src/assets/images/empty-question-light.svg"
        :lazy-src="'/src/assets/images/empty-question-light.svg'"
      />
    </div>

    <div class="mt-8 text-disabled text-center">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const props = defineProps(['type'])

const isDark = useDark()
</script>
