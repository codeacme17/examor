<template>
  <router-view />

  <!-- Uploading file float box -->
  <uploading-float-frame />

  <!-- Global message snack bar -->
  <snack-bar />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWebSocket } from '@vueuse/core'
import { useProfileStore, useNoteStore, useFileStore } from '@/store'
import { clearExipredStorageData } from '@/utils'
import { useVersion } from '@/hooks'

const { t } = useI18n()
const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()
const FILE_STORE = useFileStore()

onMounted(async () => {
  await NOTE_STORE.getNotes()
  await PROFILE_STORE.getProfile()
  await useVersion(t('message.needUpdate'))

  clearExipredStorageData()
})

// Connect ws to backend to watch loading files
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
  FILE_STORE.uploadingFiles = data.value ? JSON.parse(data.value).data : []
  NOTE_STORE.setIsUploadingNotes()
})
</script>
