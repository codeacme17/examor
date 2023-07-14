<template>
  <v-navigation-drawer :rail="rail" permanent>
    <!-- logo & title -->
    <v-list-item
      class="pl-2"
      style="user-select: none; transition: padding 0.15s ease-in-out"
      :class="{
        'py-9': !rail,
        'py-2': rail,
      }"
    >
      <template #prepend>
        <img
          :src="
            isDark
              ? '/src/assets/images/logo-dark.svg'
              : '/src/assets/images/logo.svg'
          "
          :width="rail ? 38 : 50"
          class="mr-5"
          style="transition: width 0.15s ease-in-out"
        />
      </template>

      <template #title>
        <h3>examor</h3>
      </template>

      <template #subtitle>
        <p style="font-size: 12px">{{ $t('slogan') }}</p>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <!-- default nav list -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in defualtNavList"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.value"
        :active="route.path === item.value"
      />
    </v-list>

    <v-divider></v-divider>

    <!-- notes list -->
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-plus"
        style="padding-left: 7px"
        :title="$t('menus.addNote')"
        :border="true"
        :to="'/addNote'"
        :active="route.path === '/addNote'"
      />

      <v-list-item
        v-for="item in notesList"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.value"
        :active="route.path === item.value"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  name: 'side-bar',
}
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useDark, useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const isDark = useDark()
const route = useRoute()

// handle side-bar rail state
const rail = useStorage('side-bar-rail', true)
const { width } = useWindowSize()
watch(width, () => {
  if (width.value <= 1030) rail.value = true
  else rail.value = false
})

// default nav list
const { t } = useI18n()
const defualtNavList = computed(() => [
  {
    icon: 'mdi-view-dashboard',
    title: t('menus.dashboard'),
    value: '/dashboard',
  },
  {
    icon: 'mdi-notebook-multiple',
    title: t('menus.notes'),
    value: '/notes',
  },
])

// note list that users uploaded
const notesList = [
  {
    icon: 'mdi-docker',
    title: 'docker',
    value: '/note/2',
  },
  {
    icon: 'mdi-vuejs',
    title: 'vue',
    value: '/note/2',
  },
]
</script>
