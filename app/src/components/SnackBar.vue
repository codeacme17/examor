<template>
  <v-snackbar v-model="MESSAGE_STORE.isShow" :timeout="MESSAGE_STORE.duration">
    {{ MESSAGE_STORE.message }}

    <v-btn
      v-if="MESSAGE_STORE.type === 'button'"
      size="small"
      variant="text"
      @click="$router.push(`${MESSAGE_STORE.path}`)"
    >
      NOTION_KEY
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
