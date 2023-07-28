<template>
  <!-- Upload file dialog -->
  <v-dialog
    v-model="_isShowUploadDialog"
    theme="light"
    width="60%"
    style="margin-bottom: 240px"
    @update:model-value="handleVisible"
  >
    <v-card class="pt-5 pb-5 px-5" :theme="reverseTheme">
      <h3 class="mb-3">{{ $t('title.updateFile') }}</h3>

      <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
        <t-upload
          class="mt-1 mb-5"
          placeholder=""
          theme="file-flow"
          multiple
          :autoUpload="false"
        />
      </t-config-provider>

      <v-btn @click="_isShowUploadDialog = false">
        {{ $t('button.upload') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { reverseTheme } from '@/utils'

const { locale } = useI18n()

const props = defineProps(['isShowUploadDialog', 'noteId', 'filename', 'type'])
const emits = defineEmits(['update:isShowUploadDialog'])

const _isShowUploadDialog = toRef(props, 'isShowUploadDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowUploadDialog.value = isVisible
  emits('update:isShowUploadDialog', isVisible)
}
</script>
