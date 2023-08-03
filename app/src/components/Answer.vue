<template>
  <section class="mt-8">
    <v-tabs v-model="currentTab" density="compact">
      <v-tab value="answer"> {{ $t('label.answer') }}</v-tab>

      <v-tab
        value="lastAnswer"
        :loading="getLALoading"
        :disabled="!isFinishExamining"
      >
        <v-icon icon="mdi-clipboard-text-clock" class="mr-2" />
        {{ $t('label.lastRecord') }}
      </v-tab>

      <v-tab
        value="document"
        :loading="getDocumentLoading"
        :disabled="!isFinishExamining"
      >
        <v-icon icon="mdi-notebook-heart" class="mr-2" />
        {{ $t('label.document') }}
      </v-tab>
    </v-tabs>

    <section v-show="currentTab === 'answer'">
      <!-- answer block -->
      <v-textarea
        v-model="answerValue"
        variant="solo"
        auto-grow
        :bg-color="defaultBgColor"
        :flat="true"
        :rows="7"
        :disabled="isShowExamine"
        :placeholder="$t('placeholder.answer')"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />

      <!-- examine block -->
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
            v-html="toMarkdown(examineContent)"
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
        :disabled="!answerValue"
        @click="handleSubmit"
      >
        {{ $t('button.submit') }}
      </v-btn>
    </section>

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
        <h4 class="mt-10 ml-6">No record yet</h4>
      </div>
    </section>

    <section v-show="currentTab === 'document'">
      <v-card :elevation="0" :color="defaultBgColor">
        <div v-html="toMarkdown(document_content)" class="show-markdown-box" />
      </v-card>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { defaultBgColor, fontColor } from '@/utils'
import { useFetch } from '@/hooks'
import { QUESTION_API } from '@/apis'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const { locale } = useI18n()
const props = defineProps(['id'])
const currentTab = ref<'answer' | 'lastAnswer' | 'document'>('answer')

const answerValue = useLocalStorage(`pending-answer-value-${props.id}`, '')
const toMarkdown = (text: string) => {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, { language: lang }).value
      }
      return ''
    },
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })
  const res = md.render(text)
  return res
}

const ctrlTrigger = ref(false)
const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'ControlLeft') ctrlTrigger.value = true
  if (ctrlTrigger.value && e.code === 'Enter') handleSubmit()
}
const handleKeyup = () => {
  if (ctrlTrigger.value) ctrlTrigger.value = false
}

const examineContent = ref('')
const isShowExamine = ref(false)
const isFinishExamining = ref(false)
const isExaming = ref(false)
const handleSubmit = async () => {
  if (!answerValue.value.trim()) return
  const temp = answerValue.value
  localStorage.removeItem(`pending-answer-value-${props.id}`)
  answerValue.value = temp
  isShowExamine.value = !isShowExamine.value
  await submitAnswer()
}
const submitAnswer = async () => {
  isExaming.value = true
  const response = await QUESTION_API.examingAnswer({
    id: props.id,
    language: locale.value,
    answer: answerValue.value,
  })

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      isFinishExamining.value = true
      isExaming.value = false
      break
    }
    examineContent.value += decoder.decode(value)
  }
}

// Get last answer data
const lastAnswer = ref('')
const lastExamine = ref('')
const [getLastAnswer, getLALoading] = useFetch(QUESTION_API.getLastAnswer)
const handleGetLastAnswer = async () => {
  const { data } = await getLastAnswer(props.id)
  if (!data) return
  const chunks = data.split('|||')
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

await handleGetLastAnswer()
await handleGetDocument()

watch(
  () => props.id,
  async () => {
    currentTab.value = 'answer'
    answerValue.value = ''
    isShowExamine.value = false
    examineContent.value = ''
    isFinishExamining.value = false
    await handleGetLastAnswer()
    await handleGetDocument()
  }
)

onUnmounted(() => {
  const id = `pending-answer-value-${props.id}`
  if (localStorage.getItem(id) === '') localStorage.removeItem(id)
})
</script>
