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

      <v-menu offset="10">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-translate"
            size="small"
            elevation="0"
            variant="text"
            v-bind="props"
          />
        </template>

        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in languageList"
            :key="index"
            :value="index"
            :active="storageLang === item.value"
            @click="handleLangSwitch(item.value)"
            min-height="30px"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
import { useI18n } from 'vue-i18n'

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

// lang trigger
const preferLang = navigator.language === 'zh-CN' ? 'cn' : navigator.language
const storageLang = useStorage('local-lang', preferLang)
const { locale } = useI18n()
const languageList = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'cn',
    label: '简写中文',
  },
]
const handleLangSwitch = (lang: string) => {
  storageLang.value = lang
  locale.value = lang
  console.log(locale)
}
</script>

<style lang="scss" scoped>
:deep(.v-list-item-title) {
  font-size: 14px !important;
  padding: 3px 10px;
}
</style>
