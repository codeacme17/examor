<template>
  <v-container style="max-width: 1080px">
    <!-- Empty Notice Block -->
    <EmptyBlock v-if="!NOTE_STORE.notes.length">
      <h2 class="mb-2">{{ $t('title.emptyNote') }}</h2>
      <h4 class="d-flex align-center">
        {{ $t('subTitle.emptyNoteStart') }}
        <v-btn
          variant="text"
          color="primary"
          class=""
          @click="$router.push('/addNote')"
        >
          {{ $t('menus.addNote') }}
        </v-btn>
        {{ $t('subTitle.emptyNoteEnd') }}
      </h4>
    </EmptyBlock>

    <!-- Note List -->
    <section v-else>
      <h2>
        {{ $t('title.notes') }}
      </h2>
      <h5 class="text-medium-emphasis">{{ $t('subTitle.notes') }}</h5>

      <v-divider class="mt-8"></v-divider>

      <section class="d-flex flex-row pt-5">
        <Transition name="scroll-x-reverse-transition">
          <v-card
            v-if="!isChangeNote"
            class="flex-1-1 px-3"
            color="transparent"
            :elevation="0"
          >
            <h2 class="d-flex align-center mt-2 mb-4" id="note_title">
              <v-icon class="mr-3" :icon="currentNote.icon" />
              {{ currentNote.name }}
            </h2>

            <v-progress-linear model-value="20" class="mt-1 mb-2" />

            <v-btn
              :block="true"
              variant="outlined"
              class="mt-7 mb-3"
              prepend-icon="mdi-text-box-plus-outline"
              style="height: 40px"
              @click="isShowUploadDialog = true"
            >
              {{ $t('button.addFile') }}
            </v-btn>

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
                  <td style="width: 170px">{{ item.uploadDate }}</td>
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
                        icon="mdi-delete-empty"
                        size="small"
                        style="font-size: 16px"
                        :flat="true"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </Transition>

        <section class="ml-5">
          <v-card
            class="align-self-start"
            :color="defaultBgColor"
            :elevation="0"
            width="240px"
          >
            <v-tabs direction="vertical">
              <v-tab
                v-for="item in NOTE_STORE.notes"
                :value="item.id"
                :key="item.id"
                @click="handleClickTab(item)"
              >
                <v-icon start> {{ item.icon }} </v-icon>
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </v-card>

          <v-card
            class="align-self-start mt-3"
            :color="defaultBgColor"
            :elevation="0"
          >
            <Transition name="fade-transition">
              <v-list
                v-if="!isChangeNote"
                lines="two"
                :bg-color="defaultBgColor"
              >
                <v-list-item
                  :title="$t('title.uploadDate')"
                  subtitle="2023-10-2"
                />
                <v-list-item :title="$t('hint.memory')" subtitle="50%" />
              </v-list>
            </Transition>
          </v-card>

          <v-btn
            block
            class="mt-6"
            id="delete_btn"
            type="icon"
            variant="tonal"
            :color="orangeBgColor"
            :loading="deleteNodeLoading"
            @click="handleDeleteNote"
          >
            <v-icon
              icon="mdi-delete-empty"
              style="font-size: 20px; margin-right: 6px"
            />
            {{ $t('button.deleteNote') }}
          </v-btn>
        </section>
      </section>
    </section>

    <v-dialog
      v-model="isShowUploadDialog"
      theme="light"
      width="60%"
      style="margin-bottom: 240px"
    >
      <v-card class="pt-5 pb-5 px-5" :theme="reverseTheme">
        <t-config-provider
          :global-config="locale === 'en' ? enConfig : cnConfig"
        >
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
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Notes',
}
</script>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { defaultBgColor, reverseTheme, orangeBgColor } from '@/utils'
import { useI18n } from 'vue-i18n'
import { useNoteStore, NoteItem } from '@/store'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'

import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

const { locale } = useI18n()
const NOTE_STORE = useNoteStore()

type FileItem = {
  id: number
  fileName: string
  uploadDate: string
}

const fileList: FileItem[] = [
  {
    id: 1,
    fileName: 'vue-learn.md',
    uploadDate: '2023-7-10',
  },
  {
    id: 1,
    fileName: 'vue-learn.md',
    uploadDate: '2023-7-10',
  },
]

const isShowUploadDialog = ref(false)

// Handle click tab event
const currentNote = reactive({ ...NOTE_STORE.notes[0] })
const isChangeNote = ref(false)
const handleClickTab = (item: NoteItem) => {
  if (item.id === currentNote.id) return
  isChangeNote.value = true
  currentNote.id = item.id
  currentNote.name = item.name
  currentNote.icon = item.icon

  nextTick(() => {
    isChangeNote.value = false
  })
}

// Handle delete note event
const [deleteNote, deleteNodeLoading] = useFetch(
  NOTE_API.deleteNote,
  `delete note ${currentNote.name} successfully`
)
const handleDeleteNote = async () => {
  await deleteNote(currentNote.id)
  await NOTE_STORE.getNotes()
}
</script>
