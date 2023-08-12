<template>
  <!-- Upload file dialog -->
  <v-dialog
    v-model="_isShowUploadDialog"
    theme="light"
    width="60%"
    style="margin-bottom: 240px; min-width: 300px"
    @update:model-value="handleVisible"
  >
    <v-card
      class="pt-5 pb-5 px-5"
      style="min-width: 300px"
      :theme="reverseTheme"
    >
      <h3 class="mb-3">{{ $t('title.uploadFile') }}</h3>

      <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
        <t-upload
          v-model="formData.files"
          class="mt-1 mb-7"
          placeholder=""
          theme="file-flow"
          multiple
          max="3"
          :accept="['.md']"
          :autoUpload="false"
        />
      </t-config-provider>

      <v-btn
        @click="handleSubmit"
        :border="true"
        :elevation="0"
        :disabled="disabled"
      >
        {{ $t('button.upload') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

import { toRef, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { reverseTheme, detectLegalFileName } from '@/utils'
import { useProfileStore } from '@/store'

export type FormData = {
  noteType: 'files' | 'notion' | null
  files: any[]
  notion: string
}
const PROFILE_STORE = useProfileStore()

const { locale } = useI18n()
const props = defineProps(['isShowUploadDialog', 'noteId', 'noteName'])
const emits = defineEmits(['update:isShowUploadDialog', 'submitted'])

// Handle switch dialog visible
const _isShowUploadDialog = toRef(props, 'isShowUploadDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowUploadDialog.value = isVisible
  emits('update:isShowUploadDialog', isVisible)
}

// Form data handler
const formData = reactive<FormData>({
  noteType: 'files',
  files: [],
  notion: '',
})
const [addFile] = useFetch(NOTE_API.addFile)
const handleSubmit = async () => {
  if (!PROFILE_STORE.checkHasSettedModel()) return

  const _formData = new FormData()
  _formData.append('language', locale.value)
  _formData.append('noteName', props.noteName)
  _formData.append('notionId', formData.notion)

  formData.files.forEach((item) => {
    if (detectLegalFileName(item)) _formData.append('files', item.raw)
  })

  addFile({
    id: props.noteId,
    formData: _formData,
  })

  initFormData()
  emits('submitted')
}

const initFormData = () => {
  formData.noteType = 'files'
  formData.files = []
  formData.notion = ''
}

// Form item disable computed
const disabled = computed(() => {
  if (!formData.noteType) return true
  if (!formData.files.length && formData.noteType === 'files') return true
  if (!formData.notion && formData.noteType === 'notion') return true

  return false
})
</script>
