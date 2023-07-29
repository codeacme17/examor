<template>
  <v-main>
    <TopBar />

    <v-container class="mt-3">
      <Transition name="fade-transition" mode="out-in">
        <router-view :key="$route.fullPath" />
      </Transition>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import TopBar from './TopBar.vue'
</script>
