<template>
  <v-container style="max-width: 1080px">
    <v-card class="pa-3" :color="greenCardBgColor">
      <section class="mb-5 d-flex justify-space-between align-center">
        <v-btn
          icon="mdi-arrow-left"
          size="small"
          elevation="0"
          variant="text"
        />

        <div>{{ $t('title.random') }} <v-chip size="small">Docker</v-chip></div>

        <v-btn
          icon="mdi-arrow-right"
          size="small"
          elevation="0"
          variant="text"
        />
      </section>

      <section class="px-4">
        <h3 class="mb-2">{{ $t('title.question') }}</h3>
        <p class="mb-6 text-body-2">
          Composition API 和 Options API 有哪些比较？它们各自的优势是什么？
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
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Random',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { greenCardBgColor } from '@/utils'

const currentId = ref('docker-1')
</script>
