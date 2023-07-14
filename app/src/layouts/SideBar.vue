<template>
  <v-navigation-drawer v-model="isDrawer" :rail="rail" permanent>
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
        <p style="font-size: 12px">test yourself</p>
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
        title="add note"
        style="padding-left: 7px"
        :border="true"
        :to="'/add'"
        :active="route.path === '/add'"
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const isDark = useDark()
const route = useRoute()
const { t } = useI18n()

const isDrawer = ref(true)
const rail = useStorage('side-bar-rail', true)

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

watchEffect(() => {
  console.log(defualtNavList.value[0].title)
})

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
