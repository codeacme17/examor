<template>
  <v-container style="max-width: 1080px">
    <!-- note name & icon -->
    <NoteHeader
      :id="currentNoteId"
      :name="currentNoteName"
      :icon="currentNoteIcon"
    />

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
          :id="currentQuestionId"
          :name="currentNoteId"
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
              {{ currentQuesiton }}
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
                  model-value="20"
                  class="mt-1 mb-2"
                />
              </template>
            </v-tooltip>
          </section>
        </v-card>

        <!-- answer block -->
        <Answer :id="currentQuestionId" />
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { useFetch } from '@/hooks'
import { greenBgColor } from '@/utils'
import { NOTE_API } from '@/apis'
import type { TableItem } from '@/components/QuestionTable.vue'

const route = useRoute()

onMounted(() => {
  getNoteInfo()
})

const currentNoteId = route.params.id
const currentNoteName = ref('')
const currentNoteIcon = ref('mdi-text-box-outline')

const [getNote] = useFetch(NOTE_API.getNote)
const getNoteInfo = async () => {
  const { data } = await getNote(currentNoteId)
  currentNoteIcon.value = data.icon
  currentNoteName.value = data.name
}

// Handle question
const isShowAnswer = ref(false)
const currentQuestionId = ref('')
const currentQuesiton = ref('')
const questionCounts = useLocalStorage(`questionCounts-${currentNoteId}`, 3)
const handlePickQuestion = (item: TableItem) => {
  isShowAnswer.value = true
  currentQuestionId.value = item.id
  currentQuesiton.value = item.question
}
</script>
