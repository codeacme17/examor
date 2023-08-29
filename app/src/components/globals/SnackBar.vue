<template>
  <v-snackbar v-model="MESSAGE_STORE.isShow" :timeout="MESSAGE_STORE.duration">
    {{ $t(MESSAGE_STORE.message) }}

    <v-btn
      v-if="MESSAGE_STORE.type === 'button'"
      size="small"
      icon="mdi-open-in-new"
      variant="plain"
      @click="handleClick"
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
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/store'

const router = useRouter()
const MESSAGE_STORE = useMessageStore()

const handleClick = () => {
  if (MESSAGE_STORE.path) router.push(`${MESSAGE_STORE.path}`)
  else window.open(MESSAGE_STORE.url, '_blank')
}
</script>
