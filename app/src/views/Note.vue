<template>
  <v-container class="main_width">
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

    <div>{{ $t('hint.questionCounts') }}</div>
    <v-slider
      v-model:model-value="questionCounts"
      show-ticks
      density="compact"
      :min="3"
      :max="10"
      :step="1"
    />

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
            :key="item.name"
          >
            <td style="width: 50px">
              <v-checkbox :hide-details="true" :disabled="true" />
            </td>
            <td style="overflow: hidden">{{ item.name }}</td>
            <td style="width: 180px">
              <v-progress-linear :model-value="item.calories" max="1000" />
            </td>
            <td style="width: 50px">
              <v-btn>go</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script lang="tsx">
export default {
  name: 'Note',
}
</script>

<script setup lang="tsx">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { normalCardBgColor } from '@/utils'

const route = useRoute()
const currentNoteName = route.params.id
const questionCounts = useLocalStorage('questionCounts', 3)

const currentNoteIcon = ref('mdi-docker')
const noteIcon = ref('')
const handleChangeIcon = () => {
  currentNoteIcon.value = noteIcon.value
}

const desserts = [
  {
    name: 'Vue3 与 Vue2 相比，哪些方面进行了优化？',
    calories: 159,
  },
  {
    name: 'Vue3 如何通过编译时优化提高渲染速度？',
    calories: 237,
  },
  {
    name: '在 Vue3 中，如何实现虚拟 DOM 的优化？',
    calories: 262,
  },
  {
    name: 'Vue3 的响应式系统相比于 Vue2 有哪些优化？',
    calories: 305,
  },
  {
    name: 'Vue3 如何改进 Tree-Shaking 的支持？',
    calories: 356,
  },
  {
    name: 'Vue3 中如何实现更好的代码分割和懒加载？',
    calories: 375,
  },
  {
    name: 'Composition API 和 Options API 有哪些比较？它们各自的优势是什么？',
    calories: 392,
  },
  {
    name: 'Composition API 中提供了哪些功能？ 在 Vue2 和 Vue3 中，Tree-Shaking 的实现有何区别？',
    calories: 408,
  },
  {
    name: ' Vue3 中使用的快速 Diff 算法和双端 Diff 算法有何不同？',
    calories: 452,
  },
]
</script>
