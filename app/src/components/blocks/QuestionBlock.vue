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
      <h3 class="mb-2">
        <v-btn
          v-if="props.type === 'common'"
          icon="mdi-arrow-left"
          size="x-small"
          class="mr-3 mb-1"
          theme="dark"
          style="color: azure"
          @click="emits('back')"
        />
        {{ $t('title.question') }}
      </h3>
      <p class="mb-6 text-body-1" v-html="toMarkdown(props.content)" />

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

const props = defineProps<{
  type: 'random' | 'common'
  note_name: string
  content: string
  progress: number
  loading?: boolean
}>()
const emits = defineEmits(['refresh', 'back'])

// Debounce click refresh button to pick a new question
const hanleClickRefresh = useDebounceFn(async () => {
  emits('refresh')
}, 500)
</script>
