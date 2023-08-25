<template>
  <v-snackbar v-model="MESSAGE_STORE.isShow" :timeout="MESSAGE_STORE.duration">
    {{ $t(MESSAGE_STORE.message) }}

    <v-btn
      v-if="MESSAGE_STORE.type === 'button'"
      size="small"
      icon="mdi-open-in-new"
      variant="plain"
      @click="$router.push(`${MESSAGE_STORE.path}`)"
    >
    </v-btn>

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        icon="mdi-close"
        size="small"
        @click="MESSAGE_STORE.isShow = false"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/store'

const MESSAGE_STORE = useMessageStore()
</script>
