<template>
  <v-card class="pa-3" :color="greenBgColor" :loading="props.loading">
    <!-- header - only for Random View -->
    <section
      v-if="props.type === 'random'"
      class="d-flex justify-center align-center"
    >
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
          {{ props.note_name }}
        </v-chip>
      </div>
    </section>

    <section class="px-4 pt-3">
      <!-- Question content -->
      <div class="mb-2 d-flex align-center">
        <v-btn
          v-if="props.type === 'common'"
          icon="mdi-arrow-left"
          size="x-small"
          class="mr-3 mb-1"
          theme="dark"
          style="color: azure"
          @click="emits('back')"
        />
        <h3>
          {{ $t('title.question') }}
        </h3>
        <div class="ml-2">{{ switchRoleEmoji }}</div>
      </div>
      <p
        class="mb-6 text-body-1"
        v-html="toMarkdown(props.content.split('\n')[0])"
      />

      <!-- Memory progress -->
      <v-tooltip
        location="top right"
        open-delay="200"
        :text="$t('hint.memory')"
        :open-on-hover="true"
      >
        <template v-slot:activator="{ props: _props }">
          <v-progress-linear
            v-bind="_props"
            class="mt-1 mb-2"
            max="100"
            :model-value="props.progress"
          />
        </template>
      </v-tooltip>
    </section>
  </v-card>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { greenBgColor, toMarkdown } from '@/utils'
import { computed } from 'vue'

const props = defineProps<{
  type: 'random' | 'common'
  note_name: string
  content: string
  designated_role: 'examiner' | 'teacher' | 'interviewer'
  progress: number
  loading?: boolean
}>()
const emits = defineEmits(['refresh', 'back'])

// Debounce click refresh button to pick a new question
const hanleClickRefresh = useDebounceFn(async () => {
  emits('refresh')
}, 500)

const switchRoleEmoji = computed(() => {
  switch (props.designated_role) {
    case 'examiner':
      return '🥷'
    case 'teacher':
      return '👩‍🏫'
    case 'interviewer':
      return '👨‍💻'
    default:
      return ''
  }
})
</script>
