<template>
  <v-container style="max-width: 1080px">
    <empty-block v-if="questionInfo === 'empty'">
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
    </empty-block>

    <section v-else>
      <v-card class="pa-3" :color="greenBgColor" :loading="getRQLoading">
        <section class="mb-5 d-flex justify-center align-center">
          <v-btn
            icon="mdi-refresh"
            size="small"
            elevation="0"
            variant="text"
            class="mr-2"
            style="font-size: 16px"
            @click="getRandomQuestion"
          />

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

      <Suspense>
        <Answer :id="questionInfo.id" />
      </Suspense>
    </section>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Random',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { greenBgColor } from '@/utils'
import { useFetch } from '@/hooks'
import { QUESTION_API } from '@/apis'

const questionInfo = ref<any>(null)
const [_getRandomQuestion, getRQLoading] = useFetch(
  QUESTION_API.getRandomQuestion
)
const getRandomQuestion = async () => {
  const { data } = await _getRandomQuestion()
  questionInfo.value = data
}

await getRandomQuestion()
</script>
