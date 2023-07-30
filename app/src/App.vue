<template>
  <router-view />
  <uploading-files />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { useProfileStore, useNoteStore, useFileStore } from '@/store'

const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()
const FILE_STORE = useFileStore()

onMounted(async () => {
  await NOTE_STORE.getNotes()
  await PROFILE_STORE.getProfile()
})

const { data } = useWebSocket('ws://localhost:51717/ws/file/uploading', {
  autoReconnect: {
    retries: 3,
  },
  heartbeat: {
    message: 'ping',
    interval: 1000,
    pongTimeout: 1000,
  },
})

watchEffect(() => {
  if (!data.value) return
  FILE_STORE.uploadingFiles = JSON.parse(data.value).data
})
</script>
