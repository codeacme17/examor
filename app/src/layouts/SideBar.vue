<template>
  <v-navigation-drawer v-model="isDrawer" :rail="rail" permanent>
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="examor"
      nav
    />

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
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  name: 'side-bar',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'

const route = useRoute()

const isDrawer = ref(true)
const rail = useStorage('side-bar-rail', true)

const defualtNavList = [
  {
    icon: 'mdi-home-lightbulb',
    title: 'Home',
    value: '/home',
  },
]
</script>
