<template>
  <v-dialog
    v-model="_isShowDialog"
    theme="light"
    width="580px"
    style="margin-bottom: 240px; min-width: 300px"
    @update:model-value="handleVisible"
  >
    <v-card class="pa-5" :theme="reverseTheme">
      <h3>{{ $t('title.import') }}</h3>
      <v-alert
        class="mb-1 mt-2"
        :theme="reverseTheme"
        border="start"
        :border-color="orangeBgColor"
      >
        <h5 class="text-medium-emphasis">
          {{ $t('subTitle.import') }}
        </h5>
      </v-alert>

      <v-file-input
        v-model="files"
        chips
        class="mt-5 mb-1"
        variant="outlined"
        density="compact"
        prepend-icon=""
        prepend-inner-icon="mdi-file-delimited"
        :accept="['.xlsx']"
        :label="$t('placeholder.inputFile')"
      />

      <v-btn
        :loading="importLoading"
        :disabled="!files.length"
        @click="handleSubmit"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, ref } from 'vue'
import { reverseTheme, orangeBgColor } from '@/utils'
import { useFetch } from '@/hooks'
import { PROFILE_API } from '@/apis'
import { useProfileStore, useNoteStore } from '@/store'

const PROFILE_STORE = useProfileStore()
const NOTE_STORE = useNoteStore()

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}

// Handle submit
const files = ref<any>([])
const [importData, importLoading] = useFetch(
  PROFILE_API.importData,
  'Import file successed'
)
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('file', files.value[0])

  const res = await importData(formData)

  if (res.code !== 0) return

  PROFILE_STORE.getProfile()
  NOTE_STORE.getNotes()

  emits('update:isShowDialog', false)
}
</script>
