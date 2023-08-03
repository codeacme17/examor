<template>
  <section>
    <!-- DarkMood switch btn -->
    <button
      class="border-[1px] bg-gray-100 shadow-inner dark:bg-gray-800 rounded-full w-12 relative h-6"
      @click="toggleDark()"
    >
      <div
        class="p-0.5 border-color rounded-full bg-light-main dark:bg-dark-main w-[20px] h-[20px] flex justify-center items-center"
        :class="isDark ? 'translate-x-6' : 'translate-x-0'"
        style="transition: transform 0.2s ease-in"
      >
        <SunIcon v-show="!isDark" class="stroke-dark-second" />
        <MoonIcon
          v-show="isDark"
          class="stroke-light-second w-[14px] ml-[1px]"
        />
      </div>
    </button>
  </section>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
