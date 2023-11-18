<template>
  <v-navigation-drawer :rail="rail" permanent>
    <!-- logo & title -->
    <v-list-item
      class="pl-2"
      style="user-select: none; transition: padding 0.2s ease-in-out"
      :class="{
        'py-9': !rail,
        'py-3': rail,
      }"
    >
      <template #prepend>
        <div
          :style="{
            width: rail ? '38px' : '50px',
            height: rail ? '38px' : '50px',
          }"
          class="mr-5"
        >
          <v-img
            v-show="isDark"
            src="/src/assets/images/logo-dark.svg"
            lazy-src="/src/assets/images/logo-dark.svg"
            alt="logo-dark"
            width="100%"
          />

          <v-img
            v-show="!isDark"
            src="/src/assets/images/logo.svg"
            lazy-src="/src/assets/images/logo.svg"
            alt="logo-light"
            width="100%"
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
        v-show="item.isDisplay"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.value"
        :active="route.path === item.value"
      />
    </v-list>

    <v-divider></v-divider>

    <!-- notes list -->
    <v-list density="compact" nav :loading="NOTE_STORE.getNotesLoading">
      <v-list-item
        prepend-icon="mdi-plus"
        style="padding-left: 7px"
        :title="$t('menus.addNote')"
        :border="true"
        :to="'/addNote'"
        :active="route.path === '/addNote'"
      />

      <v-list-item
        v-for="item in NOTE_STORE.notes"
        :key="item.id"
        :prepend-icon="item.icon"
        :title="item.name"
        :to="'/note/' + item.id"
        :active="route.path === '/note/' + item.id"
        :disabled="item.isUploading"
        :append-icon="item.isUploading ? 'mdi-upload' : ''"
      />
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>

      <section class="pa-2 d-flex align-center position-relative">
        <v-btn
          class="ext-medium-emphasis mr-1"
          style="font-size: 15px; transition: all 0.2s ease-in-out"
          icon="mdi-github"
          size="small"
          elevation="0"
          variant="text"
          :class="rail ? '' : 'ml-6'"
          @click="handleClickGithub"
        />

        <Transition :name="rail ? '' : 'footer'" mode="out-in">
          <div
            v-if="!rail"
            class="text-medium-emphasis mt-1"
            style="
              height: 20px;
              overflow: hidden;
              font-size: 13px;
              position: absolute;
              right: 60px;
              user-select: none;
            "
          >
            © 2023 <strong>leyoonafr</strong>
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
import { useNoteStore } from '@/store'

const { t } = useI18n()
const route = useRoute()
const isDark = useDark()
const NOTE_STORE = useNoteStore()

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
    isDisplay: false,
  },
  {
    icon: 'mdi-notebook-multiple',
    title: t('menus.notes'),
    value: '/notes',
    isDisplay: true,
  },
  {
    icon: 'mdi-head-question',
    title: t('menus.random'),
    value: '/random',
    isDisplay: true,
  },
  {
    icon: 'mdi-folder-question',
    title: t('menus.questionBank'),
    value: '/question-bank',
    isDisplay: true,
  },
])

const handleClickGithub = () => {
  window.open('https://github.com/codeacme17/examor')
}
</script>
