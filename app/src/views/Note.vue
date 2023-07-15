<template>
  <v-container class="main_width">
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
            v-model.trim="noteIcon"
            class="mb-1"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-location-enter"
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
        <v-card :color="normalCardBgColor">
          <v-table fixed-header style="background-color: transparent">
            <thead>
              <tr>
                <th class="text-right"></th>
                <th class="text-left">{{ $t('title.question') }}</th>
                <th class="text-left">
                  {{ $t('hint.memory') }}
                </th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in desserts.slice(0, questionCounts)"
                :key="item.question"
              >
                <td style="width: 50px">
                  <v-checkbox
                    :indeterminate="(isPending(item) as any)"
                    :hide-details="true"
                    :disabled="true"
                  />
                </td>
                <td style="overflow: hidden">{{ item.question }}</td>
                <td style="width: 180px">
                  <v-progress-linear :model-value="item.progress" max="1000" />
                </td>
                <td style="width: 50px">
                  <v-btn @click="handlePickQuestion(item)"> go </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </section>

      <section v-else>
        <v-card class="pa-3" :color="greenCardBgColor">
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
            <p class="mb-6 text-body-2">
              {{ currentQuesiton }}
            </p>

            <v-tooltip
              location="top right"
              :text="$t('hint.memory')"
              :open-delay="3"
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

        <Answer :id="currentId" />
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { normalCardBgColor, greenCardBgColor } from '@/utils'
import { computed } from 'vue'
import { ComputedRef } from 'vue'

type TableItem = {
  id: string
  question: string
  progress: number
}

const isPending = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    return !!localStorage.getItem(`pending-answer-value-${item.id}`)
  })
}

const route = useRoute()
const currentNoteName = route.params.noteName
const questionCounts = useLocalStorage(`questionCounts-${currentNoteName}`, 3)

const noteIcon = ref('')
const currentNoteIcon = ref('mdi-docker')
const handleChangeIcon = () => {
  currentNoteIcon.value = noteIcon.value
}

const isShowAnswer = ref(false)
const currentQuesiton = ref('')
const currentId = ref('')
const handlePickQuestion = (item: TableItem) => {
  isShowAnswer.value = true
  currentId.value = item.id
  currentQuesiton.value = item.question
}

const desserts: TableItem[] = [
  {
    id: 'docker-1',
    question: 'Vue3 与 Vue2 相比，哪些方面进行了优化？',
    progress: 159,
  },
  {
    id: 'docker-2',
    question: 'Vue3 如何通过编译时优化提高渲染速度？',
    progress: 237,
  },
  {
    id: 'docker-3',
    question: '在 Vue3 中，如何实现虚拟 DOM 的优化？',
    progress: 262,
  },
  {
    id: 'docker-4',
    question: 'Vue3 的响应式系统相比于 Vue2 有哪些优化？',
    progress: 305,
  },
  {
    id: 'docker-5',
    question: 'Vue3 如何改进 Tree-Shaking 的支持？',
    progress: 356,
  },
  {
    id: 'docker-6',
    question: 'Vue3 中如何实现更好的代码分割和懒加载？',
    progress: 375,
  },
  {
    id: 'docker-7',
    question:
      'Composition API 和 Options API 有哪些比较？它们各自的优势是什么？',
    progress: 392,
  },
  {
    id: 'docker-8',
    question:
      'Composition API 中提供了哪些功能？ 在 Vue2 和 Vue3 中，Tree-Shaking 的实现有何区别？',
    progress: 408,
  },
  {
    id: 'docker-9',
    question: ' Vue3 中使用的快速 Diff 算法和双端 Diff 算法有何不同？',
    progress: 452,
  },
]
</script>
