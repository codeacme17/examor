<template>
  <h3>
    {{ switchTitle }}
  </h3>

  <v-card
    class="mt-3 mb-6"
    :loading="props.loading"
    :border="true"
    :elevation="0"
  >
    <v-table fixed-header style="background-color: transparent">
      <tbody>
        <tr v-for="item in props.quesitonList" :key="item.question">
          <!-- Question status td -->
          <td style="width: 50px">
            <v-checkbox
              :model-value="isFinished(item)"
              :indeterminate="(isPending(item) as any)"
              :hide-details="true"
              :disabled="true"
            />
          </td>

          <!-- Question content td -->
          <td style="overflow: hidden">{{ item.content }}</td>

          <!-- Action buttons td -->
          <td style="width: 145px">
            <!-- Answer button -->
            <v-btn
              v-if="!isFinished(item).value && !isPending(item).value"
              :block="true"
              @click="handlePickQuestion(item)"
            >
              go
            </v-btn>

            <!-- Continue answer button -->
            <v-btn
              v-if="isPending(item).value"
              :color="orangeBgColor"
              :block="true"
              @click="handlePickQuestion(item)"
            >
              {{ $t('button.continue') }}
            </v-btn>

            <!-- Finished button -->
            <v-btn
              v-if="isFinished(item).value"
              :color="greenBgColor"
              :block="true"
              @click="handlePickQuestion(item)"
            >
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
import { useI18n } from 'vue-i18n'
import { greenBgColor, orangeBgColor } from '@/utils'
import { useListState } from '@/hooks'

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

const [pendingList, finishedList] = useListState()
// Whether the current question is in pending status
const isPending = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    if (pendingList.value.has(item.id)) return true
    else return false
  })
}
const isFinished = (item: TableItem): ComputedRef<boolean> => {
  return computed(() => {
    if (finishedList.value.has(item.id)) return true
    else return false
  })
}

// Emit event while click a question button
const handlePickQuestion = (item: TableItem) => {
  emits('questionPickEmit', item)
}

// Switch different title content by `porps.type`
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
