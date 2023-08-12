<template>
  <v-container class="main_width">
    <h2>{{ $t('title.addNote') }}</h2>
    <h5 class="text-medium-emphasis">{{ $t('subTitle.addNote') }}</h5>

    <v-divider class="mt-8"></v-divider>

    <form class="py-6">
      <!-- Note's name input field -->
      <v-text-field
        v-model="formData.noteName"
        class="mt-3"
        variant="outlined"
        density="compact"
        :label="$t('label.noteName')"
      />

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
          @click="handleConfirmAdd"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </div>
    </form>

    <!-- Hint message when there is not set NOTION_KEY in profile -->
    <v-snackbar v-model="isShowSnackbar">
      {{ $t('message.notionKeyStart') }}
      <v-btn size="small" variant="text" @click="$router.push('/profile')">
        NOTION_KEY
      </v-btn>
      {{ $t('message.notionKeyEnd') }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          icon="mdi-close"
          size="small"
          @click="isShowSnackbar = false"
        />
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'AddNote',
}
</script>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useNoteStore, useProfileStore } from '@/store'
import { detectLegalFileName } from '@/utils'

import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

type FormData = {
  noteName: string
  noteType: 'files' | 'notion' | null
  files: any[]
  notion: string
}

const { t, locale } = useI18n()

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

const formData = reactive<FormData>({
  noteName: '',
  noteType: 'files',
  files: [],
  notion: '',
})

// Form item disable computed
const disabled = computed(() => {
  if (!formData.noteName) return true
  if (!formData.noteType) return true
  if (!formData.files.length && formData.noteType === 'files') return true
  if (!formData.notion && formData.noteType === 'notion') return true

  return false
})

const PROFILE_STORE = useProfileStore()
const isShowSnackbar = ref(false)
// ------ Dont Delete -----------
const handleSelectChange = () => {
  formData.files = []
  formData.notion = ''

  if (
    formData.noteType === 'notion' &&
    !PROFILE_STORE.profile.notionKey.value
  ) {
    isShowSnackbar.value = true
    PROFILE_STORE.profile.notionKey.error = true
    return
  }
}

// Handle add note event
const [addNote] = useFetch(NOTE_API.addNote)
const NOTE_STORE = useNoteStore()
const handleConfirmAdd = async () => {
  if (!PROFILE_STORE.checkHasSettedModel()) return

  const _formData = new FormData()
  _formData.append('language', locale.value)
  _formData.append('noteName', formData.noteName)
  _formData.append('notionId', formData.notion)

  formData.files.forEach((item) => {
    if (detectLegalFileName(item)) _formData.append('files', item.raw)
  })

  addNote(_formData)
  initFormData()
  setTimeout(() => {
    NOTE_STORE.getNotes()
  }, 300)
}

const initFormData = () => {
  formData.noteName = ''
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
