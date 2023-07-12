<template>
  <v-system-bar
    window
    style="justify-content: space-between; padding: 12px 15px; height: 45px"
    color="transparent"
  >
    <!-- Left -->
    <div class="d-flex align-center">
      <v-btn
        variant="text"
        :icon="rail ? 'mdi-dock-right' : 'mdi-dock-left'"
        @click.stop="rail = !rail"
        size="small"
      />

      <v-btn
        icon="mdi-chevron-left"
        size="small"
        elevation="0"
        variant="text"
      />
    </div>

    <!-- Right Handlers -->
    <div class="d-flex align-center">
      <div class="mr-2">
        <v-icon icon="mdi-message" class="me-2"></v-icon>
        <span>10 unread messages</span>
      </div>

      <v-btn
        icon="mdi-cogs"
        size="small"
        elevation="0"
        variant="text"
        @click="router.push('/profile')"
      />

      <v-btn
        :icon="isDark ? 'mdi-emoticon-cool' : 'mdi-emoticon-wink'"
        size="small"
        @click="toggleDark()"
        elevation="0"
        variant="text"
      />
    </div>
  </v-system-bar>
</template>

<script lang="ts">
export default {
  name: 'top-bar',
}
</script>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useDark, useToggle, useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

// side bar trigger
const rail = useStorage('side-bar-rail', true)

// dark theme trigger
const theme = useTheme()
const isDark = useDark({
  onChanged(dark: boolean) {
    theme.global.name.value = dark ? 'dark' : 'light'
  },
})
const toggleDark = useToggle(isDark)
</script>
