<template>
  <h3>
    {{ switchTitle }}
  </h3>

  <v-card class="my-3" :loading="props.loading" :border="true" :elevation="0">
    <v-table fixed-header style="background-color: transparent">
      <tbody>
        <tr v-for="item in props.quesitonList" :key="item.question">
          <td style="width: 50px">
            <v-checkbox
              v-model="item.is_answered_today"
              true-value="1"
              false-value="0"
              :indeterminate="(isPending(item) as any)"
              :hide-details="true"
              :disabled="true"
            />
          </td>
          <td style="overflow: hidden">{{ item.content }}</td>

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
              v-else-if="item.is_answered_today === '0'"
              :block="true"
              @click="handlePickQuestion(item)"
            >
              go
            </v-btn>

            <v-btn v-else :color="greenBgColor" :block="true" :disabled="true">
              {{ $t('button.finished') }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { greenBgColor, orangeBgColor } from '@/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

export type TableItem = {
  id: number
  content: string
  document_id: number
  is_pushed?: string
  is_answered_today?: string
  progress?: number
  last_answer?: string
  upload_date?: string
}

const props = defineProps(['quesitonList', 'loading', 'type'])
const emits = defineEmits(['questionPickEmit'])

const isPending = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    return !!localStorage.getItem(`pending-answer-value-${item.id}`)
  })
}

const handlePickQuestion = (item: TableItem) => {
  emits('questionPickEmit', item)
}

const switchTitle = computed(() => {
  switch (props.type) {
    case 'today':
      return t('title.today')

    case 'expired':
      return t('title.expired')

    case 'supplement':
      return t('title.supplement')

    default:
      return ''
  }
})
</script>
