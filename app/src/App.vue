<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore, useNoteStore } from '@/store'

const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()

onMounted(async () => {
  await NOTE_STORE.getNotes()
  await PROFILE_STORE.getProfile()
})
</script>
