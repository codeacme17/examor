<template>
  <router-view />
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store'
import { onMounted } from 'vue'

const PROFILE_STORE = useProfileStore()

onMounted(() => {
  PROFILE_STORE.getKeys()
})
</script>
