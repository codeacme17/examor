<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore, useNoteStore } from '@/store'

const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()

onMounted(() => {
  PROFILE_STORE.getProfile()
  NOTE_STORE.getNotes()
})
</script>
