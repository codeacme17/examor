<template>
  <v-dialog
    v-model="_isShowDialog"
    theme="light"
    width="580px"
    style="margin-bottom: 240px; min-width: 300px"
    @update:model-value="handleVisible"
  >
    <v-card class="pa-5" :theme="reverseTheme">
      <h3>{{ $t('title.export') }}</h3>
      <v-alert class="mb-1 mt-2">
        <h5 class="text-medium-emphasis">
          {{ $t('subTitle.export') }}
        </h5>
      </v-alert>

      <v-form>
        <v-checkbox
          v-model="formData.isProfile"
          density="compact"
          hide-details
          :label="$t('label.isProfile')"
        />

        <v-checkbox
          v-model="formData.isNotes"
          density="compact"
          hide-details
          :label="$t('label.isNotes')"
        />

        <v-btn
          block
          class="mt-3"
          density="compact"
          style="height: 32px"
          :color="defaultBgColor"
          :elevation="0"
          :loading="exportLoading"
          :disabled="!formData.isNotes && !formData.isProfile"
          @click="handleExport"
        >
          {{ $t('button.submit') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, reactive } from 'vue'
import { reverseTheme, defaultBgColor, dowmloadBinaryFile } from '@/utils'
import { useFetch } from '@/hooks'
import { PROFILE_API } from '@/apis'

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}

const formData = reactive({
  isProfile: true,
  isNotes: true,
})

// Handle submit
const [exportData, exportLoading] = useFetch(PROFILE_API.exportData)
const handleExport = async () => {
  const res = await exportData(formData)
  dowmloadBinaryFile(
    res,
    'examor-data.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  emits('update:isShowDialog', false)
}
</script>
