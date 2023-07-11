<template>
  <v-main>
    <TopBar />

    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import TopBar from "./TopBar.vue";
</script>
