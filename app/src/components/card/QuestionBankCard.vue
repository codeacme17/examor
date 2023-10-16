<template>
  <v-sheet
    rounded
    class="pa-5 d-flex flex-column justify-space-between"
    :min-width="200"
    :elevation="0"
    :color="defaultBgColor"
  >
    <v-icon
      :icon="props.icon || 'mdi-folder-table'"
      class="mx-auto text-h2"
      color="gray"
    />

    <div class="text-center mt-3">
      <h5 class="text-h5">{{ props.name }}</h5>
      <div>
        <v-chip size="small" class="mt-2">{{ props.category }}</v-chip>
      </div>

      <v-btn
        class="mt-3"
        :elevation="0"
        @click="emits('clickImportButton', true)"
      >
        {{ $t('button.importBank') }}
      </v-btn>

      <div class="d-flex mt-n10">
        <v-btn
          variant="text"
          class="text-caption ml-auto"
          size="small"
          icon="mdi-link"
          target="_blank"
          :href="props.link"
        />
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { defaultBgColor } from '@/utils'

export type QuesitonBankType = {
  name: string
  category: string
  icon?: string
  link?: string
}

const props = defineProps<QuesitonBankType>()
const emits = defineEmits(['clickImportButton'])
</script>
