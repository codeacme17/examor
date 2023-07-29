<template>
  <v-card :color="defaultBgColor" :loading="props.loading">
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
          v-for="item in props.quesitonList.slice(0, props.questionCounts)"
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
          <td style="overflow: hidden">{{ item.content }}</td>
          <td style="width: 230px">
            <v-progress-linear :model-value="item.progress" max="100" />
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
  content: string
  is_answered_today: string
  progress: number
}

const props = defineProps(['quesitonList', 'questionCounts', 'loading'])
const emits = defineEmits(['questionPickEmit'])

const isPending = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    return !!localStorage.getItem(`pending-answer-value-${item.id}`)
  })
}

const handlePickQuestion = (item: TableItem) => {
  emits('questionPickEmit', item)
}
</script>
