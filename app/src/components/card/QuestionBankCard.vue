<template>
  <v-sheet
    rounded
    class="pa-5 d-flex flex-column"
    height="100%"
    :min-width="200"
    :elevation="0"
    :color="defaultBgColor"
  >
    <v-btn
      variant="text"
      class="text-caption ml-auto mt-n3"
      size="small"
      icon="mdi-link"
      target="_blank"
      :disabled="!link"
      :href="props.link"
    />

    <v-icon
      class="mx-auto text-h2 mt-n6"
      color="gray"
      :icon="props.icon || 'mdi-folder-table'"
    />

    <section
      class="text-center mt-3 d-flex flex-column justify-space-between flex-fill"
    >
      <div>
        <h5 class="text-h5" style="font-weight: 800">{{ props.name }}</h5>
        <v-chip size="small" class="mr-1 px-3">
          <v-icon icon="mdi-beaker-question-outline" class="mr-1" />
          <span style="margin-top: 2px">{{ props.totalQuestionCount }}</span>
        </v-chip>
        <v-chip size="small" class="my-2 px-3">
          <v-icon icon="mdi-tag-outline" class="mr-1" />
          {{ props.category }}
        </v-chip>
        <p class="text-medium-emphasis px-3 mt-3" style="font-size: 14px">
          {{ props.description || '' }}
        </p>
      </div>

      <v-btn
        class="mt-3"
        :elevation="0"
        @click="emits('clickImportButton', props)"
      >
        {{ $t('button.importBank') }}
      </v-btn>
    </section>
  </v-sheet>
</template>

<script setup lang="ts">
import { defaultBgColor } from '@/utils'

export type QuesitonBankType = {
  name: string
  category: string
  totalQuestionCount: number
  description?: string
  icon?: string
  link?: string
}

const props = defineProps<QuesitonBankType>()
const emits = defineEmits(['clickImportButton'])
</script>
