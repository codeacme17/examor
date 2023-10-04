<template>
  <!-- Empty Notice Block -->
  <section v-if="!files.length" class="d-flex align-center mt-1">
    <h4 class="text-disabled" style="user-select: none">
      {{ $t('hint.noneFile') }}
    </h4>
  </section>

  <v-table
    v-else
    fixed-header
    style="background-color: transparent"
    :bg-color="defaultBgColor"
    :loading="getFilesLoading"
  >
    <thead>
      <tr>
        <th class="text-left">{{ $t('title.filename') }}</th>
        <th class="text-left">{{ $t('title.questionCount') }}</th>
        <th class="text-left">{{ $t('title.uploadDate') }}</th>
        <th class="text-right"></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in files"
        :key="item.id"
        :class="item.isUploading ? 'text-disabled' : ''"
      >
        <!-- File name td -->
        <td>{{ item.file_name }}</td>

        <td style="width: 180px">
          {{ item.question_count }}
        </td>

        <!-- Update time td -->
        <td style="width: 170px">
          {{ handleDatetime(item.upload_date) }}
        </td>

        <!-- Action buttons td -->
        <td style="width: 0px">
          <div class="d-flex justify-end align-center">
            <!-- Dont delete! ------------- -->
            <!-- Update file button -->
            <!-- <v-btn
              class="ml-auto"
              variant="text"
              :flat="true"
              :disabled="isUploadingFile(item.id)"
              @click="handleUpdate(item)"
            >
              {{ $t('button.update') }}
            </v-btn> -->

            <!-- Delete button -->
            <!-- <v-btn
              v-if="!item.isShowConfirmDeleteBtn"
              icon="mdi-delete-empty"
              style="font-size: 16px"
              :flat="true"
              :disabled="isUploadingFile(item.id)"
              @click="item.isShowConfirmDeleteBtn = true"
            /> -->

            <!-- Confirm delete button -->
            <!-- <v-btn
              v-else
              icon="mdi-check-all"
              style="font-size: 16px"
              :flat="true"
              :loading="deleteFileLoading"
              @click="handleDeleteFile(item)"
            /> -->
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- Upload file dialog -->
  <upload-file-dialog
    v-if="isShowUploadDialog"
    v-model="isShowUploadDialog"
    :type="'update'"
    :noteId="props.id"
    :filename="currentFilename"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { defaultBgColor, handleDatetime } from '@/utils'
import { FILE_API, NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useFileStore, type UploadingFileItem } from '@/store'

type FileItem = {
  id: number
  file_name: string
  upload_date: string
  question_count: number
  isShowConfirmDeleteBtn?: boolean
  isUploading?: boolean
}

const props = defineProps(['id'])
const FILE_STORE = useFileStore()

// Get file files event
const files = ref<FileItem[]>([])
const [getFiles, getFilesLoading] = useFetch(NOTE_API.getFiles)
const [_getQuestionCount] = useFetch(FILE_API.getQuestionCount)
const getQuestionCount = async (count: number, fileId: number) => {
  if (count !== 0) return count
  const res = await _getQuestionCount(fileId)
  return res.data.question_count
}
const getFileList = async () => {
  const res = await getFiles(props.id)
  files.value = res.data.map((item: FileItem) => ({
    ...item,
    isShowConfirmDeleteBtn: false,
    isUploading: true,
  }))
  files.value.forEach(async (item: FileItem) => {
    item.question_count = await getQuestionCount(item.question_count, item.id)
  })
}
await getFileList()

// @TODO: Handle update file event
const currentFilename = ref('')
const isShowUploadDialog = ref(false)
const handleUpdate = (item: FileItem) => {
  currentFilename.value = item.file_name
  isShowUploadDialog.value = true
}

// @TODO: Handle delete file event
const [deleteFile, deleteFileLoading] = useFetch(FILE_API.deleteFile)
const handleDeleteFile = async (item: FileItem) => {
  await deleteFile({
    id: props.id,
    file_name: item.file_name,
  })
  await getFileList()
}

watchEffect(() => {
  const fileIdsSet = new Set(
    FILE_STORE.uploadingFiles.map((item: UploadingFileItem) => item.id)
  )
  files.value.forEach((file: FileItem) => {
    file.isUploading = fileIdsSet.has(file.id)
  })
})
</script>
