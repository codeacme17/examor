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
            <!-- note name & icon -->
            <NoteHeader
              :id="currentNote.id"
              :name="currentNote.name"
              :icon="currentNote.icon"
            />

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

            <!-- Files Table -->
            <FilesTable :id="currentNote.id" />
          </v-card>
        </Transition>

        <!-- Side bar: Tabs & Note Info & Delete Note -->
        <section class="ml-5">
          <!-- Tabs -->
          <v-card
            class="align-self-start"
            :color="defaultBgColor"
            :elevation="0"
            width="240px"
          >
            <v-tabs direction="vertical">
              <v-tab
                v-for="(item, index) in NOTE_STORE.notes"
                v-model="currentIndex"
                :key="index"
                @click="handleClickTab(item, index)"
              >
                <v-icon start> {{ item.icon }} </v-icon>
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </v-card>

          <!-- Note Info -->
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

          <!-- Delete Note -->
          <!-- Delete Button -->
          <v-btn
            v-if="!isShowConfirmDeleteBtn"
            block
            class="mt-3"
            id="delete_btn"
            type="icon"
            variant="tonal"
            :color="orangeBgColor"
            @click="isShowConfirmDeleteBtn = true"
          >
            <v-icon
              icon="mdi-delete-empty"
              style="font-size: 20px; margin-right: 8px"
            />
            {{ $t('button.deleteNote') }}
          </v-btn>
          <!-- Confirm Delete Button -->
          <v-btn
            v-else
            block
            class="mt-3"
            id="delete_btn"
            type="icon"
            variant="tonal"
            :color="greenBgColor"
            :loading="deleteNodeLoading"
            @click="handleDeleteNote"
          >
            <v-icon
              icon="mdi-check-all"
              style="font-size: 20px; margin-right: 8px"
            />
            {{ $t('button.confirmDelete') }}
          </v-btn>
        </section>
      </section>
    </section>

    <!-- Upload file dialog -->
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
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import cnConfig from 'tdesign-vue-next/es/locale/zh_CN'

import { ref, nextTick } from 'vue'
import {
  defaultBgColor,
  reverseTheme,
  orangeBgColor,
  greenBgColor,
} from '@/utils'
import { useI18n } from 'vue-i18n'
import { useNoteStore, NoteItem } from '@/store'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'

const { locale } = useI18n()
const NOTE_STORE = useNoteStore()

const isShowUploadDialog = ref(false)

// Handle click tab event
let currentNote = NOTE_STORE.notes[0]
const currentIndex = ref(0)
const isChangeNote = ref(false)
const handleClickTab = (item: NoteItem, index: number) => {
  if (item.id === currentNote.id) return
  isChangeNote.value = true
  currentNote = NOTE_STORE.notes[index]
  currentIndex.value = index
  isShowConfirmDeleteBtn.value = false

  nextTick(() => {
    isChangeNote.value = false
  })
}

// Handle delete note event
const isShowConfirmDeleteBtn = ref(false)
const [deleteNote, deleteNodeLoading] = useFetch(
  NOTE_API.deleteNote,
  `delete note ${currentNote && currentNote.name} successfully`
)
const handleDeleteNote = async () => {
  await deleteNote(currentNote.id)

  const length = NOTE_STORE.notes.length
  if (currentIndex.value === length - 1) currentIndex.value -= 1
  else currentIndex.value += 1

  currentNote = NOTE_STORE.notes[currentIndex.value]
  isShowConfirmDeleteBtn.value = false
  await NOTE_STORE.getNotes()
}
</script>
