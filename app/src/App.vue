<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '@/store'

const PROFILE_STORE = useProfileStore()

onMounted(() => {
  PROFILE_STORE.getKeys()
})
</script>
