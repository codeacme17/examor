<template>
  <v-table
    fixed-header
    style="background-color: transparent"
    :bg-color="defaultBgColor"
  >
    <thead>
      <tr>
        <th class="text-left">{{ $t('title.fileName') }}</th>
        <th class="text-left">{{ $t('title.uploadDate') }}</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in fileList" :key="item.id">
        <td>{{ item.fileName }}</td>
        <td style="width: 170px">
          {{ item.uploadDate }}
        </td>
        <td style="width: 170px">
          <div class="d-flex justify-end align-center">
            <v-btn
              class="ml-auto"
              variant="text"
              :flat="true"
              @click="isShowUploadDialog = true"
            >
              {{ $t('button.update') }}
            </v-btn>
            <v-btn
              v-if="!item.isShowConfirmDeleteBtn"
              icon="mdi-delete-empty"
              style="font-size: 16px"
              :flat="true"
              @click="item.isShowConfirmDeleteBtn = true"
            />
            <v-btn
              v-else
              icon="mdi-check-all"
              style="font-size: 16px"
              :flat="true"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- Upload file dialog -->
  <v-dialog
    v-model="isShowUploadDialog"
    theme="light"
    width="60%"
    style="margin-bottom: 240px"
  >
    <v-card class="pt-5 pb-5 px-5" :theme="reverseTheme">
      <t-config-provider :global-config="locale === 'en' ? enConfig : cnConfig">
        <t-upload
          class="mt-1 mb-5"
          placeholder=""
          theme="file-flow"
          multiple
          :autoUpload="false"
        />
      </t-config-provider>

      <v-btn @click="isShowUploadDialog = false">
        {{ $t('button.upload') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { useI18n } from 'vue-i18n'

import { ref, reactive } from 'vue'
import { defaultBgColor, reverseTheme } from '@/utils'

const { locale } = useI18n()

const props = defineProps(['noteId'])

const isShowUploadDialog = ref(false)

type FileItem = {
  id: number
  fileName: string
  uploadDate: string
  isShowConfirmDeleteBtn: boolean
}

const list = [
  {
    id: 1,
    fileName: 'vue-learn.md',
    uploadDate: '2023-7-10',
  },
  {
    id: 2,
    fileName: 'vue-learn.md',
    uploadDate: '2023-7-10',
  },
]

const fileList = reactive<FileItem[]>(
  list.map((item) => {
    return {
      ...item,
      isShowConfirmDeleteBtn: false,
    }
  })
)
</script>
