<template>
  <v-container style="max-width: 1080px">
    <!-- note name & icon -->
    <h2 class="mb-3 d-flex align-center">
      <v-menu :close-on-content-click="false" offset="6">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            class="mr-2"
            :icon="currentNoteIcon"
            style="font-size: 27px; border-radius: 0px; border-radius: 3px"
          />
        </template>

        <v-card min-width="420" class="px-5 py-3">
          <div class="mb-3 text-body-1">
            {{ $t('hint.getIcon') }}
            <a
              href="https://pictogrammers.com/library/mdi/"
              target="_blank"
              style="text-decoration: none; font-weight: 600"
            >
              Material Design Icons
            </a>
          </div>

          <v-text-field
            v-model.trim="inputNoteIcon"
            class="mb-1"
            variant="outlined"
            density="compact"
            :append-inner-icon="updateIconLoading ? '' : 'mdi-location-enter'"
            :placeholder="currentNoteIcon"
            :hide-details="true"
            @click:append-inner="handleChangeIcon"
            @keydown.prevent.enter="handleChangeIcon"
          />
        </v-card>
      </v-menu>

      <div>{{ currentNoteName }}</div>
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
import { useNoteStore } from '@/store'
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

const NOTE_STORE = useNoteStore()
const [getNote] = useFetch(NOTE_API.getNote)
const [updateNoteIcon, updateIconLoading] = useFetch(NOTE_API.updateNoteIcon)

const getNoteInfo = async () => {
  const { data } = await getNote(currentNoteId)
  currentNoteIcon.value = data.icon
  currentNoteName.value = data.name
}

const inputNoteIcon = ref('')
const handleChangeIcon = async () => {
  if (!inputNoteIcon.value) return
  await updateNoteIcon({
    id: currentNoteId,
    icon: inputNoteIcon.value,
  })
  await NOTE_STORE.getNotes()
  currentNoteIcon.value = inputNoteIcon.value
  inputNoteIcon.value = ''
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
