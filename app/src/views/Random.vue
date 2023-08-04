<template>
  <v-container style="max-width: 1080px">
    <!-- Empty block -->
    <empty-block v-if="questionInfo === 'empty'" type="question">
      <h3 class="mb-2">{{ $t('title.emptyQuestion') }}</h3>
    </empty-block>

    <section v-else>
      <v-card class="pa-3" :color="greenBgColor" :loading="getRQLoading">
        <section class="mb-5 d-flex justify-center align-center">
          <!-- Refresh buttom -->
          <v-btn
            icon="mdi-refresh"
            size="small"
            elevation="0"
            variant="text"
            class="mr-2"
            style="font-size: 16px"
            @click="hanleClickRefresh"
          />

          <!-- Note name tag -->
          <div>
            {{ $t('title.random') }}
            <v-chip size="small" class="ml-1">
              {{ questionInfo.note_name }}
            </v-chip>
          </div>
        </section>

        <section class="px-4">
          <h3 class="mb-2">{{ $t('title.question') }}</h3>
          <p class="mb-6 text-body-1">
            {{ questionInfo.content }}
          </p>

          <!-- Memory progress -->
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
                :model-value="questionInfo.progress"
              />
            </template>
          </v-tooltip>
        </section>
      </v-card>

      <!-- Answer block -->
      <Answer :id="questionInfo.id" v-if="trigger" />
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
import { greenBgColor } from '@/utils'
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
