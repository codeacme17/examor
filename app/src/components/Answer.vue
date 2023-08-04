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
      <!-- Answer block -->
      <v-textarea
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
            v-html="toMarkdown(currentData.examine)"
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
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import { defaultBgColor, fontColor } from '@/utils'
import { useFetch, useListState } from '@/hooks'
import { QUESTION_API } from '@/apis'

const { locale } = useI18n()
const props = defineProps(['id'])
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
const isShowExamine = ref(false)
const isExaming = ref(false)
const isFinishExaming = ref(false)
const handleSubmit = async () => {
  if (!currentData.value.answer.trim()) return
  isShowExamine.value = true
  isExaming.value = true
  await submitAnswer()
  isFinishExaming.value = true
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

// Make raw-content render as markdown formatting content
const toMarkdown = (text: string) => {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang))
        return hljs.highlight(str, { language: lang }).value
      return ''
    },
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })
  return md.render(text)
}

// Watching if current question id is changed
watch(
  () => props.id,
  async () => {
    await handleGetLastAnswer()
    await handleGetDocument()

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
