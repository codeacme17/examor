<template>
  <form>
    <!-- Choose question type radio -->
    <t-radio-group
      v-model="formData.questionType"
      variant="default-filled"
      class="mb-5 mt-0"
    >
      <t-radio-button value="short">
        📝 {{ $t('button.short') }}
      </t-radio-button>
      <t-radio-button value="choice">
        🔠 {{ $t('button.choice') }}
      </t-radio-button>
      <t-radio-button value="blank">
        ⬜ {{ $t('button.blank') }}
      </t-radio-button>
    </t-radio-group>

    <v-divider class="mb-6 mt-1"></v-divider>

    <v-select
      v-model="formData.uploadType"
      class="mt-4"
      variant="outlined"
      density="compact"
      item-title="label"
      item-value="value"
      :label="$t('label.selectNoteType')"
      :items="noteTypeOptions"
    />

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
        :triggerButtonProps="{ block: 'true' }"
        :accept="['.md']"
        :showThumbnail="true"
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
import { MessagePlugin } from 'tdesign-vue-next'
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
const NOTE_STORE = useNoteStore()

const props = defineProps(['APIFun', 'noteName', 'noteId'])
const emits = defineEmits(['success'])

const formData = reactive<FormData>({
  uploadType: 'files',
  questionType: 'short',
  files: [],
  notion: '',
})

const noteTypeOptions = computed(() => [
  {
    label: t('option.localFiles'),
    value: 'files',
  },
  // TODO: notion db
  // {
  //   label: t('option.notion'),
  //   value: 'notion',
  // },
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
const [checkLlmApiState, checkKeyLoading] = useFetch(
  PROFILE_API.checkLlmApiState
)
const handleConfirm = async () => {
  if (!PROFILE_STORE.checkHasSettedModel()) return

  const { _formData, validFiles } = generateFormdata()
  if (!validFiles.length) return

  const res = await checkLlmApiState()
  if (res.code !== 0) return
  if (res.data === 'free') MessagePlugin.warning(t('message.rateLimit'), 5000)

  submit({ id: props.noteId, formData: _formData })
  initFormData()
  emits('success')
  setTimeout(() => {
    NOTE_STORE.getNotes()
  }, 300)
}

const generateFormdata = () => {
  const _formData = new FormData()
  const validFiles: any[] = []
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
  return {
    _formData,
    validFiles,
  }
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
