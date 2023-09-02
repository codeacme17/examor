<template>
  <form>
    <!-- Choose question type radio -->
    <t-radio-group
      v-model="formData.questionType"
      variant="default-filled"
      class="mb-5"
    >
      <t-radio-button value="short">📝 {{ $t('button.short') }}</t-radio-button>
      <t-radio-button value="choice">
        🔠 {{ $t('button.choice') }}
      </t-radio-button>
      <!-- TODO -->
      <t-radio-button value="blank" disabled="true">
        ⬜ {{ $t('button.blank') }}
      </t-radio-button>
    </t-radio-group>

    <!-- TODO -->
    <!-- <v-select
      v-model="formData.uploadType"
      class="mt-4"
      variant="outlined"
      density="compact"
      item-title="label"
      item-value="value"
      :label="$t('label.selectNoteType')"
      :items="noteTypeOptions"
    /> -->

    <!-- File upload component -->
    <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
      <t-upload
        v-show="formData.uploadType === 'files'"
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
      v-show="formData.uploadType === 'notion'"
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
import { detectLegalFile } from '@/utils'

import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

type FormData = {
  uploadType: 'files' | 'notion' | null
  questionType: 'short' | 'choice' | 'blank'
  files: any[]
  notion: string
}

const { t, locale } = useI18n()
const PROFILE_STORE = useProfileStore()

const props = defineProps(['APIFun', 'noteName', 'noteId'])
const emits = defineEmits(['success'])

const formData = reactive<FormData>({
  uploadType: 'files',
  questionType: 'short',
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
  if (!formData.uploadType) return true
  if (!formData.files.length && formData.uploadType === 'files') return true
  if (!formData.notion && formData.uploadType === 'notion') return true

  return false
})

// Handle add note event
const [submit] = useFetch(props.APIFun)
const [checkKeyCorrect, checkKeyLoading] = useFetch(PROFILE_API.checkKeyCorrect)
const NOTE_STORE = useNoteStore()
const handleConfirm = async () => {
  const _formData = new FormData()
  const validFiles = []
  _formData.append('language', locale.value)
  _formData.append('uploadType', formData.uploadType!)
  _formData.append('questionType', formData.questionType)
  _formData.append('noteName', props.noteName)
  _formData.append('notionId', formData.notion)
  formData.files.forEach((item) => {
    if (!detectLegalFile(item)) return
    _formData.append('files', item.raw)
    validFiles.push(item)
  })

  if (!validFiles.length) return
  if (!PROFILE_STORE.checkHasSettedModel()) return
  if ((await checkKeyCorrect()).code !== 0) return

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
  formData.uploadType = 'files'
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
