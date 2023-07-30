<template>
  <v-container style="max-width: 1080px">
    <!-- note name & icon -->
    <h2 class="mb-3 d-flex align-center">
      <v-icon class="mr-3" :icon="currentNote.icon" />
      <div>{{ currentNote.name }}</div>
    </h2>

    <Transition
      :name="
        isShowAnswer ? 'scroll-x-reverse-transition' : 'scroll-x-transition'
      "
      mode="out-in"
    >
      <section v-if="!isShowAnswer">
        <!-- question counts pick -->
        <div>{{ $t('hint.questionCounts') }}</div>
        <v-slider
          v-model:model-value="questionCounts"
          show-ticks
          density="compact"
          :min="3"
          :max="10"
          :step="1"
        />

        <!-- question table -->
        <QuestionTable
          :loading="listLoading"
          :quesitonList="quesitonList"
          :questionCounts="questionCounts"
          @questionPickEmit="handlePickQuestion"
        />
      </section>

      <section v-else>
        <!-- question block -->
        <v-card class="pa-3" :color="greenBgColor">
          <section class="px-4">
            <h3 class="mt-1 mb-3 d-flex align-center">
              <v-btn
                icon="mdi-arrow-left"
                size="x-small"
                class="mr-3"
                theme="dark"
                @click="isShowAnswer = false"
              />
              {{ $t('title.question') }}
            </h3>
            <p class="mb-6 text-body-1">
              {{ pickedQuestion.content }}
            </p>

            <v-tooltip
              location="top right"
              open-delay="200"
              :text="$t('hint.memory')"
              :open-on-hover="true"
            >
              <template v-slot:activator="{ props }">
                <v-progress-linear
                  v-bind="props"
                  class="mt-1 mb-2"
                  :model-value="pickedQuestion.progress"
                />
              </template>
            </v-tooltip>
          </section>
        </v-card>

        <!-- answer block -->
        <Suspense>
          <Answer :id="pickedQuestion.id" />
        </Suspense>
      </section>
    </Transition>
  </v-container>
</template>

<script lang="ts">
export default {
  question: 'Note',
}
</script>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { useFetch } from '@/hooks'
import { greenBgColor } from '@/utils'
import { NOTE_API, QUESTION_API } from '@/apis'
import type { TableItem } from '@/components/QuestionTable.vue'
import { watchEffect } from 'vue'

const route = useRoute()

onMounted(async () => {
  await getNoteInfo()
})

const currentNote = reactive({
  id: route.params.id,
  name: '',
  icon: 'mdi-text-box-outline',
})
const [getNote] = useFetch(NOTE_API.getNote)
const getNoteInfo = async () => {
  const { data } = await getNote(currentNote.id)
  currentNote.name = data.name
  currentNote.icon = data.icon
}

// Get question list
const [getQuestions, listLoading] = useFetch(QUESTION_API.getQuestionsByNoteId)
const quesitonList = ref<TableItem[]>([])
const getQuestionList = async () => {
  const { data } = await getQuestions(currentNote.id)
  quesitonList.value = data
}

// Handle question
const pickedQuestion = reactive<TableItem>({
  id: 0,
  content: '',
  document_id: 0,
  is_answered_today: '0',
  progress: 0,
})
const isShowAnswer = ref(false)
const questionCounts = useLocalStorage(`questionCounts-${currentNote.id}`, 3)
const handlePickQuestion = (item: TableItem) => {
  isShowAnswer.value = true
  pickedQuestion.id = item.id
  pickedQuestion.document_id = item.document_id
  pickedQuestion.content = item.content
  pickedQuestion.progress = item.progress
}

watchEffect(async () => {
  if (!isShowAnswer.value) await getQuestionList()
})
</script>
