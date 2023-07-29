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
        <th class="text-left">{{ $t('title.filename') }}</th>
        <th class="text-left">{{ $t('title.uploadDate') }}</th>
        <th class="text-right"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.file_name }}</td>
        <td style="width: 170px">
          {{ handleDatetime(item.upload_date) }}
        </td>
        <td style="width: 170px">
          <div class="d-flex justify-end align-center">
            <v-btn
              class="ml-auto"
              variant="text"
              :flat="true"
              @click="handleUpdate(item)"
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
  <upload-file-dialog
    v-if="isShowUploadDialog"
    v-model="isShowUploadDialog"
    :type="'update'"
    :noteId="props.id"
    :filename="currentFilename"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { defaultBgColor, handleDatetime } from '@/utils'
import { FILE_API } from '@/apis'
import { useFetch } from '@/hooks'

type FileItem = {
  id: number
  file_name: string
  upload_date: string
  isShowConfirmDeleteBtn?: boolean
}

const props = defineProps(['id'])

onMounted(async () => {
  await gitFileList()
})

const [getFiles, getFilesLoading] = useFetch(FILE_API.getFiles)
const list = ref<FileItem[]>([])
const gitFileList = async () => {
  const res = await getFiles(props.id)
  list.value = reactive<FileItem[]>(
    res.data.map((item: any) => ({
      ...item,
      isShowConfirmDeleteBtn: false,
    }))
  )
}

const currentFilename = ref('')
const isShowUploadDialog = ref(false)
const handleUpdate = (item: FileItem) => {
  currentFilename.value = item.file_name
  isShowUploadDialog.value = true
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
