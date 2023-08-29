<template>
  <v-dialog
    v-model="_isShowUploadDialog"
    theme="light"
    width="750px"
    style="margin-bottom: 240px; min-width: 500px"
    @update:model-value="handleVisible"
  >
    <v-card
      class="pt-5 pb-5 px-5"
      style="min-width: 300px"
      :theme="reverseTheme"
    >
      <h3 class="mb-3">{{ $t('title.uploadFile') }}</h3>

      <upload-form
        :APIFun="NOTE_API.addFile"
        :noteName="props.noteName"
        :noteId="props.noteId"
        @success="emits('submitted')"
      />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { NOTE_API } from '@/apis'
import { reverseTheme } from '@/utils'

const props = defineProps(['isShowUploadDialog', 'noteId', 'noteName'])
const emits = defineEmits(['update:isShowUploadDialog', 'submitted'])

// Handle switch dialog visible
const _isShowUploadDialog = toRef(props, 'isShowUploadDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowUploadDialog.value = isVisible
  emits('update:isShowUploadDialog', isVisible)
}
</script>
