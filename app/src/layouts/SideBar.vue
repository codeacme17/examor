<template>
  <v-navigation-drawer :rail="rail" permanent>
    <!-- logo & title -->
    <v-list-item
      class="pl-2"
      style="user-select: none; transition: padding 0.15s ease-in-out"
      :class="{
        'py-9': !rail,
        'py-3': rail,
      }"
    >
      <template #prepend>
        <div>
          <v-img
            :src="
              isDark
                ? '/src/assets/images/logo-dark.svg'
                : '/src/assets/images/logo.svg'
            "
            :lazy-src="
              isDark
                ? '/src/assets/images/logo-dark.svg'
                : '/src/assets/images/logo.svg'
            "
            :width="rail ? 38 : 50"
            class="mr-5"
            style="transition: width 0.15s ease-in-out"
          />
        </div>
      </template>

      <template #title>
        <Transition :name="rail ? '' : 'footer'" mode="out-in">
          <h3 v-show="!rail">examor</h3>
        </Transition>
      </template>

      <template #subtitle>
        <Transition :name="rail ? '' : 'footer'" mode="out-in">
          <p style="font-size: 12px" v-show="!rail">{{ $t('slogan') }}</p>
        </Transition>
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

    <template v-slot:append>
      <v-divider></v-divider>

      <section class="pa-2 d-flex align-center position-relative">
        <v-btn
          class="ext-medium-emphasis mr-1"
          style="font-size: 15px"
          icon="mdi-github"
          size="small"
          elevation="0"
          variant="text"
        />

        <Transition :name="rail ? '' : 'footer'" mode="out-in">
          <div
            v-if="!rail"
            class="text-medium-emphasis mt-1"
            style="
              height: 20px;
              max-width: 170px;
              overflow: hidden;
              font-size: 13px;
              position: absolute;
              right: 30px;
            "
          >
            © 2023-Present leyoonafr
          </div>
        </Transition>
      </section>
    </template>
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

const route = useRoute()
const isDark = useDark()
const { t } = useI18n()

// handle side-bar rail state
const rail = useStorage('side-bar-rail', false)
const { width } = useWindowSize()
watch(width, () => {
  if (width.value <= 1030) rail.value = true
  else rail.value = false
})

// default nav list
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
  {
    icon: 'mdi-head-question',
    title: t('menus.random'),
    value: '/random',
  },
])

// note list that users uploaded
const notesList = [
  {
    icon: 'mdi-docker',
    title: 'docker',
    value: '/note/docker',
  },
  {
    icon: 'mdi-vuejs',
    title: 'vue',
    value: '/note/vue',
  },
]
</script>
