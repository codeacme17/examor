<template>
  <v-layout>
    <v-app>
      <SideBar />
      <default-view />
    </v-app>
  </v-layout>
</template>

<script lang="ts" setup>
import SideBar from "./SideBar.vue";
import DefaultView from "./View.vue";
</script>
