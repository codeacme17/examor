<template>
  <!-- Empty Notice Block -->
  <section v-if="!list.length" />

  <v-table
    v-else
    fixed-header
    style="background-color: transparent"
    :bg-color="defaultBgColor"
    :loading="getFilesLoading"
  >
    <thead>
      <tr>
        <th class="text-left">{{ $t('title.fileName') }}</th>
        <th class="text-left">{{ $t('title.uploadDate') }}</th>
        <th class="text-right"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.file_name }}</td>
        <td style="width: 170px">
          {{ item.upload_date }}
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
              :loading="deleteFileLoading"
              @click="handleDeleteFile(item)"
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

import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { defaultBgColor, reverseTheme } from '@/utils'
import { FILE_API } from '@/apis'
import { useFetch } from '@/hooks'

const { locale } = useI18n()

const props = defineProps(['id'])

const isShowUploadDialog = ref(false)

type FileItem = {
  id: number
  file_name: string
  upload_date: string
  isShowConfirmDeleteBtn?: boolean
}

onMounted(async () => {
  await gitFileList()
})

const list = ref<FileItem[]>([])
const [getFiles, getFilesLoading] = useFetch(FILE_API.getFiles)
const gitFileList = async () => {
  const res = await getFiles(props.id)

  list.value = reactive<FileItem[]>(
    res.data.map((item: any) => {
      return {
        ...item,
        isShowConfirmDeleteBtn: false,
      }
    })
  )
}

const [deleteFile, deleteFileLoading] = useFetch(FILE_API.deleteFile)
const handleDeleteFile = async (item: FileItem) => {
  await deleteFile({
    id: props.id,
    file_name: item.file_name,
  })
  await gitFileList()
}
</script>
