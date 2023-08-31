<template>
  <section class="mt-8">
    <v-tabs v-model="currentTab" density="compact">
      <v-tab value="answer"> {{ $t('label.answer') }}</v-tab>
      <v-tab
        value="lastAnswer"
        :loading="getLALoading"
        :disabled="!isFinishExaming"
      >
        <v-icon icon="mdi-clipboard-text-clock" class="mr-2" />
        {{ $t('label.lastRecord') }}
      </v-tab>
      <v-tab
        value="document"
        :loading="getDocumentLoading"
        :disabled="!isFinishExaming"
      >
        <v-icon icon="mdi-notebook-heart" class="mr-2" />
        {{ $t('label.document') }}
      </v-tab>
    </v-tabs>

    <!-- Answer tab connent -->
    <section v-show="currentTab === 'answer'">
      <!-- Short answer input -->
      <v-textarea
        v-if="props.questionType === 'short' || props.questionType === ''"
        v-model="currentData.answer"
        variant="solo"
        auto-grow
        :autofocus="true"
        :bg-color="defaultBgColor"
        :flat="true"
        :rows="4"
        :disabled="isShowExamine"
        :placeholder="$t('placeholder.answer')"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />

      <!-- Single choice -->
      <v-card
        v-if="props.questionType === 'choice'"
        class="pt-5 pb-0 px-4 mb-5"
        :elevation="0"
        :color="defaultBgColor"
      >
        <v-radio-group v-model="currentData.answer" :disabled="isShowExamine">
          <v-radio
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          />
        </v-radio-group>
      </v-card>

      <!-- Examine block -->
      <Transition name="scroll-x-reverse-transition">
        <v-card
          v-if="isShowExamine"
          variant="tonal"
          class="mb-3"
          :border="true"
          :elevation="0"
          :color="'primary'"
          :loading="isExaming"
        >
          <h3 class="mx-6 my-3" :style="fontColor">
            {{ $t('label.examine') }}
          </h3>
          <v-divider></v-divider>
          <div
            v-html="toMarkdown(errorMessage || currentData.examine)"
            class="show-markdown-box"
            :style="fontColor"
          />
        </v-card>
      </Transition>

      <v-btn
        v-if="!isShowExamine"
        :elevation="0"
        :block="true"
        :border="true"
        :loading="checkKeyLoading"
        :disabled="!currentData.answer"
        @click="handleSubmit"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </section>

    <!-- Last answer tab connent -->
    <section v-show="currentTab === 'lastAnswer'">
      <v-card
        v-if="lastAnswer && lastExamine"
        class="pa-5"
        :elevation="0"
        :color="defaultBgColor"
      >
        <h4>{{ $t('title.lastAnswer') }}</h4>
        <div v-html="toMarkdown(lastAnswer)" class="show-markdown-box" />
        <v-divider class="mb-5"></v-divider>
        <h4>{{ $t('title.lastExamine') }}</h4>
        <div v-html="toMarkdown(lastExamine)" class="show-markdown-box" />
      </v-card>

      <div v-else class="text-disabled" style="user-select: none">
        <h4 class="mt-10 ml-6">{{ $t('hint.lastRecord') }}</h4>
      </div>
    </section>

    <!-- Document refrence tab connent -->
    <section v-show="currentTab === 'document'">
      <v-card :elevation="0" :color="defaultBgColor">
        <div v-html="toMarkdown(document_content)" class="show-markdown-box" />
      </v-card>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import { useLocalStorage, useNow, useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { defaultBgColor, fontColor, toMarkdown } from '@/utils'
import { useFetch, useListState } from '@/hooks'
import { QUESTION_API, PROFILE_API } from '@/apis'
import { useProfileStore } from '@/store'
import { ErrorResponse } from '@/constant'

const { locale, t } = useI18n()
const PROFILE_STORE = useProfileStore()
const props = defineProps<{
  id: string
  questionContent: string
  questionType: 'short' | 'choice' | 'blank' | ''
}>()
const currentTab = ref<'answer' | 'lastAnswer' | 'document'>('answer')

// Get data cache
const today = useDateFormat(useNow(), 'YYYY-MM-DD')
const currentData = useLocalStorage(`${today.value}:${props.id}:answer-data`, {
  answer: '',
  examine: '',
  lastRecord: '',
})
const [pendingList, finishedList] = useListState()
const clearEmptyCache = () => {
  if (!currentData.value.answer && !currentData.value.examine)
    localStorage.removeItem(`${today.value}:${props.id}:answer-data`)
}

// Handle key press events, does press `Crtl + Enter`
const ctrlTrigger = ref(false)
const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'ControlLeft') ctrlTrigger.value = true
  if (ctrlTrigger.value && e.code === 'Enter') handleSubmit()
}
const handleKeyup = () => {
  if (ctrlTrigger.value) ctrlTrigger.value = false
}

// Handle submit answer event
// submitAnswer() is a SSE connect to fetch streaming response
const isShowExamine = ref(false) // flag to show examing block
const isExaming = ref(false) // flag to gpt examing state
const isFinishExaming = ref(false) // flag to is gpt finish examine
const errorMessage = ref('')
const [checkKeyCorrect, checkKeyLoading] = useFetch(PROFILE_API.checkKeyCorrect)
const handleSubmit = async () => {
  if (!PROFILE_STORE.checkHasSettedModel()) return

  const res = await checkKeyCorrect()
  if (res.code !== 0) return
  if (!currentData.value.answer.trim()) return
  isShowExamine.value = true
  isExaming.value = true

  await submitAnswer()
  isFinishExaming.value = true
  if (!isThereNoErrorReported()) return
  finishedList.value.add(props.id)
  pendingList.value.delete(props.id)
}
const submitAnswer = async () => {
  const response = await QUESTION_API.examingAnswer({
    id: props.id,
    language: locale.value,
    answer: currentData.value.answer,
  })
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      isExaming.value = false
      break
    }
    currentData.value.examine += decoder.decode(value)
  }
}
const isThereNoErrorReported = () => {
  if (currentData.value.examine === ErrorResponse.TIMEOUT) {
    errorMessage.value = `<div style='color: orange'> ${t(
      'message.timeout'
    )} </div>`
    currentData.value.examine = ''
    return false
  }
  return true
}

// Get last answer data
const lastAnswer = ref('')
const lastExamine = ref('')
const [getLastAnswer, getLALoading] = useFetch(QUESTION_API.getLastAnswer)
const handleGetLastAnswer = async () => {
  if (!currentData.value.lastRecord && !currentData.value.examine) {
    const res = await getLastAnswer(props.id)
    currentData.value.lastRecord = res.data
  }
  if (!currentData.value.lastRecord) return
  const chunks = currentData.value.lastRecord.split('|||')
  lastAnswer.value = chunks[0]
  lastExamine.value = chunks[1]
}

// Get document content
const document_content = ref('')
const [getDocument, getDocumentLoading] = useFetch(QUESTION_API.getDocument)
const handleGetDocument = async () => {
  const { data } = await getDocument(props.id)
  document_content.value = data
}

const options = ref<string[]>([])
const splitQuestionToOptions = () => {
  if (props.questionType !== 'choice') return
  const questionLines = props.questionContent.trim().split('\n')

  for (let i = 1; i < questionLines.length; i++) {
    const optionLine = questionLines[i].trim()
    if (
      optionLine.startsWith('A.') ||
      optionLine.startsWith('B.') ||
      optionLine.startsWith('C.') ||
      optionLine.startsWith('D.')
    ) {
      options.value.push(optionLine)
    }
  }
  console.log(options.value)
}

// Watching if current question id is changed
watch(
  () => props.id,
  async () => {
    await handleGetLastAnswer()
    await handleGetDocument()

    if (props.questionType === 'choice') splitQuestionToOptions()

    if (currentData.value.examine) {
      isShowExamine.value = true
      isFinishExaming.value = true
    }
  },
  {
    immediate: true,
  }
)

// Watching if there is answer value changing the pending list
watch(
  () => currentData.value.answer,
  () => {
    if (currentData.value.answer) pendingList.value.add(props.id)
    else pendingList.value.delete(props.id)
  }
)

onUnmounted(() => {
  clearEmptyCache()
})
</script>
