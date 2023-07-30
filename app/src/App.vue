<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { useProfileStore, useNoteStore } from '@/store'
import { watch } from 'vue'

const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()

onMounted(async () => {
  await NOTE_STORE.getNotes()
  await PROFILE_STORE.getProfile()
})

const { data } = useWebSocket('ws://localhost:51717/ws/file/uploading', {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      console.log('Failed to connect WebSocket after 3 retries')
    },
  },
  heartbeat: {
    message: 'ping',
    interval: 3000,
    pongTimeout: 1000,
  },
})

watch(
  () => data,
  () => {
    console.log(JSON.parse(data.value))
  }
)
</script>
