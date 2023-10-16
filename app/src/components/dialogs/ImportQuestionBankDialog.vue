<template>
  <v-dialog
    v-model="_isShowDialog"
    theme="light"
    width="580px"
    style="margin-bottom: 240px; min-width: 300px"
    @update:model-value="handleVisible"
  >
    <v-card class="pa-5" :theme="reverseTheme"> dasd </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { reverseTheme } from '@/utils'

const props = defineProps(['isShowDialog'])
const emits = defineEmits(['update:isShowDialog', 'submitted'])

// Handle switch dialog visible
const _isShowDialog = toRef(props, 'isShowDialog')
const handleVisible = (isVisible: boolean) => {
  _isShowDialog.value = isVisible
  emits('update:isShowDialog', isVisible)
}
</script>
