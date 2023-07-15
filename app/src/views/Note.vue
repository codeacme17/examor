<template>
  <section>{{ currentNoteName }}</section>
</template>

<script lang="ts">
export default {
  name: 'Note',
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentNoteName = route.params.id
</script>
