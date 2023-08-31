<template>
  <v-container style="max-width: 1080px">
    <h2 class="mb-5 d-flex align-center">
      <v-icon class="mr-3" :icon="currentNote.icon" />
      <div>{{ currentNote.name }}</div>
    </h2>

    <Transition
      :name="
        isShowAnswer ? 'scroll-x-reverse-transition' : 'scroll-x-transition'
      "
      mode="out-in"
    >
      <!-- Question tables -->
      <section v-if="!isShowAnswer">
        <!-- Today -->
        <QuestionTable
          v-if="!!todayList.length"
          class="mb-5"
          type="today"
          :loading="listLoading"
          :quesitonList="todayList"
          @questionPickEmit="handlePickQuestion"
        />
        <!-- Expired -->
        <QuestionTable
          v-if="!!expiredList.length"
          class="mb-5"
          type="expired"
          :loading="listLoading"
          :quesitonList="expiredList"
          @questionPickEmit="handlePickQuestion"
        />
        <!-- Supplement -->
        <QuestionTable
          v-if="!!supplementList.length"
          type="supplement"
          :loading="listLoading"
          :quesitonList="supplementList"
          @questionPickEmit="handlePickQuestion"
        />
      </section>

      <!-- Exmine section -->
      <section v-else>
        <!-- Question block -->
        <question-block
          v-bind="pickedQuestion"
          :type="'common'"
          @back="isShowAnswer = false"
        />

        <!-- Examine block -->
        <examine-block
          :id="pickedQuestion.id"
          :questionContent="pickedQuestion.content"
          :questionType="pickedQuestion.question_type"
        />
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
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch, useTodayListCache } from '@/hooks'
import { NOTE_API } from '@/apis'
import type { TableItem } from '@/components/tables/QuestionTable.vue'

const route = useRoute()

type Note = {
  id: string
  name: string
  icon: string
}

const currentNote = reactive<Note>({
  id: route.params.id as string,
  name: '',
  icon: 'mdi-text-box-outline',
})
const [getNote] = useFetch(NOTE_API.getNote)
const noteRes = await getNote(currentNote.id)
currentNote.name = noteRes.data.name
currentNote.icon = noteRes.data.icon

// Get question list
const [listData, listLoading] = await useTodayListCache(
  currentNote.id,
  NOTE_API.getQuestions
)
const todayList = ref<TableItem[]>(listData.value.today)
const expiredList = ref<TableItem[]>(listData.value.expired)
const supplementList = ref<TableItem[]>(listData.value.supplement)

// Handle question
const pickedQuestion = reactive<TableItem>({
  id: 0,
  content: '',
  designated_role: '',
  progress: 0,
  question_type: '',
})
const isShowAnswer = ref(false)
const handlePickQuestion = (item: TableItem) => {
  isShowAnswer.value = true
  pickedQuestion.id = item.id
  pickedQuestion.content = item.content
  pickedQuestion.designated_role = item.designated_role
  pickedQuestion.progress = item.progress
  pickedQuestion.question_type = item.question_type
}
</script>
