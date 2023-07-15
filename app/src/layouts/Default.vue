<template>
  <v-layout>
    <v-app>
      <SideBar style="position: fixed" />
      <default-view />
    </v-app>
  </v-layout>
</template>

<script lang="ts" setup>
import SideBar from './SideBar.vue'
import DefaultView from './View.vue'
</script>
