<template>
  <router-view />

  <!-- Uploading file float box -->
  <uploading-float-frame />

  <!-- Global message snack bar -->
  <snack-bar />
</template>

<script setup lang="ts">
import { onMounted, watchEffect, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MessagePlugin } from 'tdesign-vue-next'
import { useWebSocket } from '@vueuse/core'
import { useProfileStore, useNoteStore, useFileStore } from '@/store'
import { clearExipredStorageData } from '@/utils'
import { useVersion } from '@/hooks'
import { FILE_API } from '@/apis'

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

// Watch uploading files to show message
watch(
  () => FILE_STORE.uploadingFiles,
  async (list, preList) => {
    const diff = preList.filter(
      (preItem) => !list.map((item) => item.id).includes(preItem.id)
    )
    await Promise.all(
      diff.map(async (item) => {
        const res = await FILE_API.getQuestionCount(item.id)
        MessagePlugin.success(
          `File ${item.file_name} was uploaded successfully and ${res.data} questions were generated.`,
          6000
        )
      })
    )
  }
)
</script>
