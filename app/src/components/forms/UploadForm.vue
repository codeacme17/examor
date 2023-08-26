<template>
  <form>
    <!-- <v-select
        v-model="formData.noteType"
        class="mt-4"
        variant="outlined"
        density="compact"
        item-title="label"
        item-value="value"
        :label="$t('label.selectNoteType')"
        :items="noteTypeOptions"
        @update:model-value="handleSelectChange"
      /> -->

    <!-- File upload component -->
    <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
      <t-upload
        v-show="formData.noteType === 'files'"
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

    <!-- NotionDB input field -->
    <v-text-field
      v-show="formData.noteType === 'notion'"
      v-model="formData.notion"
      class="mt-4"
      variant="outlined"
      density="compact"
      :label="$t('label.notionDataBaseID')"
      :disabled="!PROFILE_STORE.profile.notionKey.value"
    />

    <!-- Submit button -->
    <div class="mt-4 d-flex justify-end">
      <v-btn
        color="primary"
        elevation="0"
        :block="true"
        :disabled="disabled"
        :loading="checkKeyLoading"
        @click="handleConfirm"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useNoteStore, useProfileStore } from '@/store'
import { detectLegalFileName } from '@/utils'

import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

type FormData = {
  noteType: 'files' | 'notion' | null
  files: any[]
  notion: string
}

const { t, locale } = useI18n()
const PROFILE_STORE = useProfileStore()

const props = defineProps(['APIFun', 'noteName', 'noteId'])
const emits = defineEmits(['success'])

const formData = reactive<FormData>({
  noteType: 'files',
  files: [],
  notion: '',
})

// ------ Dont Delete -----------
const noteTypeOptions = computed(() => [
  {
    label: t('option.localFiles'),
    value: 'files',
  },
  {
    label: t('option.notion'),
    value: 'notion',
  },
])

// Form item disable computed
const disabled = computed(() => {
  if (!props.noteName) return true
  if (!formData.noteType) return true
  if (!formData.files.length && formData.noteType === 'files') return true
  if (!formData.notion && formData.noteType === 'notion') return true

  return false
})

// Handle add note event
const [submit] = useFetch(props.APIFun)
const [checkKeyCorrect, checkKeyLoading] = useFetch(PROFILE_API.checkKeyCorrect)
const NOTE_STORE = useNoteStore()
const handleConfirm = async () => {
  if (!PROFILE_STORE.checkHasSettedModel()) return
  const res = await checkKeyCorrect()
  if (res.code !== 0) return

  const _formData = new FormData()
  _formData.append('language', locale.value)
  _formData.append('noteName', props.noteName)
  _formData.append('notionId', formData.notion)
  formData.files.forEach((item) => {
    if (detectLegalFileName(item)) _formData.append('files', item.raw)
  })

  submit({
    id: props.noteId,
    formData: _formData,
  })

  initFormData()
  emits('success')

  setTimeout(() => {
    NOTE_STORE.getNotes()
  }, 300)
}

const initFormData = () => {
  formData.noteType = 'files'
  formData.files = []
  formData.notion = ''
}
</script>

<style scoped lang="scss">
:deep(.v-field__field) {
  height: 38px;
  font-size: 14px;

  .v-field__input {
    padding-top: 5px !important;
  }
}

:deep(.t-upload__flow-bottom) {
  display: none;
}

:deep(.t-upload__flow-card-area) {
  border-radius: 10px;
  border-width: 2px;

  .t-upload__flow-empty {
    user-select: none !important;
  }
}
</style>
