<template>
  <v-system-bar
    window
    style="justify-content: space-between; padding: 12px 15px"
  >
    <div>
      <div>examro</div>

      <v-icon icon="mdi-message" class="me-2"></v-icon>

      <span>10 unread messages</span>
    </div>

    <div>
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

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useDark, useToggle } from '@vueuse/core'

const theme = useTheme()
const isDark = useDark({
  onChanged(dark: boolean) {
    theme.global.name.value = dark ? 'dark' : 'light'
  },
})
const toggleDark = useToggle(isDark)
</script>
