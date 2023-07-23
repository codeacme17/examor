<template>
  <v-card :color="defaultBgColor">
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
          v-for="item in desserts.slice(0, props.questionCounts)"
          :key="item.question"
        >
          <td style="width: 50px">
            <v-checkbox
              v-model="item.finished"
              :indeterminate="(isPending(item) as any)"
              :hide-details="true"
              :disabled="true"
            />
          </td>
          <td style="overflow: hidden">{{ item.question }}</td>
          <td style="width: 230px">
            <v-progress-linear :model-value="item.progress" max="1000" />
          </td>
          <td style="width: 145px">
            <v-btn
              v-if="isPending(item).value === true"
              :block="true"
              :color="orangeBgColor"
              @click="handlePickQuestion(item)"
            >
              {{ $t('button.continue') }}
            </v-btn>

            <v-btn
              v-else
              :disabled="item.finished"
              :block="true"
              @click="handlePickQuestion(item)"
            >
              go
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { defaultBgColor, orangeBgColor } from '@/utils'

export type TableItem = {
  id: string
  question: string
  progress: number
  finished: boolean
}

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  questionCounts: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['questionPickEmit'])

const isPending = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    return !!localStorage.getItem(`pending-answer-value-${item.id}`)
  })
}

const handlePickQuestion = (item: TableItem) => {
  emits('questionPickEmit', item)
}

const desserts: TableItem[] = [
  {
    id: 'docker-1',
    question: 'Vue3 与 Vue2 相比，哪些方面进行了优化？',
    progress: 159,
    finished: false,
  },
  {
    id: 'docker-2',
    question: 'Vue3 如何通过编译时优化提高渲染速度？',
    progress: 237,
    finished: false,
  },
  {
    id: 'docker-3',
    question: '在 Vue3 中，如何实现虚拟 DOM 的优化？',
    progress: 262,
    finished: true,
  },
  {
    id: 'docker-4',
    question: 'Vue3 的响应式系统相比于 Vue2 有哪些优化？',
    progress: 305,
    finished: false,
  },
  {
    id: 'docker-5',
    question: 'Vue3 如何改进 Tree-Shaking 的支持？',
    progress: 356,
    finished: true,
  },
  {
    id: 'docker-6',
    question: 'Vue3 中如何实现更好的代码分割和懒加载？',
    progress: 375,
    finished: false,
  },
  {
    id: 'docker-7',
    question:
      'Composition API 和 Options API 有哪些比较？它们各自的优势是什么？',
    progress: 392,
    finished: false,
  },
  {
    id: 'docker-8',
    question:
      'Composition API 中提供了哪些功能？ 在 Vue2 和 Vue3 中，Tree-Shaking 的实现有何区别？',
    progress: 408,
    finished: false,
  },
  {
    id: 'docker-9',
    question: ' Vue3 中使用的快速 Diff 算法和双端 Diff 算法有何不同？',
    progress: 452,
    finished: false,
  },
]
</script>
