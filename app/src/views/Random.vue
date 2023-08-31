<template>
  <v-container style="max-width: 1080px">
    <!-- Empty block -->
    <empty-block v-if="questionInfo === 'empty'" type="question">
      <h3 class="mb-2">{{ $t('title.emptyQuestion') }}</h3>
    </empty-block>

    <section v-else>
      <!-- Quesiton block -->
      <question-block
        v-bind="questionInfo"
        :type="'random'"
        :loading="getRQLoading"
        @refresh="hanleClickRefresh"
      />

      <!-- Enswer block -->
      <examine-block
        v-if="trigger"
        :id="questionInfo.id"
        :questionType="questionInfo.question_type"
        :questionContent="questionInfo.content"
      />
    </section>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Random',
}
</script>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useFetch } from '@/hooks'
import { QUESTION_API } from '@/apis'

// Handle get random question
const questionInfo = ref<any>(null)
const trigger = ref(true)
const [_getRandomQuestion, getRQLoading] = useFetch(
  QUESTION_API.getRandomQuestion
)
const getRandomQuestion = async () => {
  const { data } = await _getRandomQuestion()
  questionInfo.value = data
  console.log(questionInfo.value)
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

// Debounce click refresh button to pick a new question
const hanleClickRefresh = useDebounceFn(async () => {
  await getRandomQuestion()
}, 500)

await getRandomQuestion()
</script>
